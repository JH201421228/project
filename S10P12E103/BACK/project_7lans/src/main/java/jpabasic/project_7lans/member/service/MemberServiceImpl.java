package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.dinosaur.entity.Dinosaur;
import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import jpabasic.project_7lans.dinosaur.entity.DinosaurCollection;
import jpabasic.project_7lans.dinosaur.repository.DinosaurRepository;
import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import jpabasic.project_7lans.member.dto.member.MemberResponseDto;
import jpabasic.project_7lans.member.entity.*;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final DinosaurRepository dinosaurRepository;
    private final ChildCenterRepository childCenterRepository;

    //=========================================
    //회원가입
    @Override
    @Transactional
    public void childRegister(MemberRequestDto.sign memberDto) {
        log.info("childRegister Start...");

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(memberDto.getCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.childRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        // 가입 할 때 공룡도감의 기본 공룡 1번
        Dinosaur dinosaur = dinosaurRepository.findById(1L)
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.childRegister] no such dinosaur"));

        // 기본 공룡 1번으로 공룡 도감 컬렉션 하나 생성.
        DinosaurCollection dinosaurCollection = DinosaurCollection.builder()
                .dinosaur(dinosaur)
                .build();

        // 멤버에게 추가해 줄 공룡도감 생성 및 기본 공룡 1번으로 설정
        DinosaurBook dinosaurBook = DinosaurBook.builder()
                .myDinosaur(dinosaur)
                .build();

        // 나의 공룡도감 리스트에 공룡 추가
        dinosaurBook.addDinosaurCollection(dinosaurCollection);

        // 아동 생성
        Child child = Child.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(passwordEncoder.encode(memberDto.getMemberPassword()))
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .dinosaurBook(dinosaurBook)
                .memberType(MemberType.CHILD)
                .build();

        // 공룡도감의 주인을 아동으로 설정.
        dinosaurBook.setMember(child);

        // 아동센터의 아동 리스트에 방금 만든 아동 추가.
        childCenter.addChildList(child);

        // 아동을 DB에 저장
        memberRepository.save(child);

        log.info("childRegister success return: childId:{} childName:{} childType:{}"+child.getId()+child.getName()+child.getMemberType());
    }

    @Override
    @Transactional
    public void volunteerRegister(MemberRequestDto.sign memberDto) {
        log.info("volunteerRegister Start...");

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");

        // 가입 할 때 공룡도감의 기본 공룡 1번 생성
        Dinosaur dinosaur = dinosaurRepository.findById(1L)
                .orElseThrow(()->new IllegalArgumentException("[MemberServiceImpl.volunteerRegister] no such dinosaur"));

        // 기본 공룡 1번으로 공룡 도감 컬렉션 하나 생성.
        DinosaurCollection dinosaurCollection = DinosaurCollection.builder()
                .dinosaur(dinosaur)
                .build();

        // 멤버에게 추가해 줄 공룡도감 생성 및 기본 공룡 1번으로 설정
        DinosaurBook dinosaurBook = DinosaurBook.builder()
                .myDinosaur(dinosaur)
                .build();

        // 나의 공룡도감 리스트에 공룡 추가
        dinosaurBook.addDinosaurCollection(dinosaurCollection);

        // 예외가 발생 안하면 가입 처리
        // 봉사자 생성
        Volunteer volunteer = Volunteer.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(passwordEncoder.encode(memberDto.getMemberPassword()))
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .memberType(MemberType.VOLUNTEER)
                .dinosaurBook(dinosaurBook)
                .build();

        // 공룡도감의 주인을 봉사자로 설정.
        dinosaurBook.setMember(volunteer);

        memberRepository.save(volunteer);

        log.info("volunteerRegister success return: volunteerId:{} volunteerName:{} volunteerType:{}"+volunteer.getId()+volunteer.getName()+volunteer.getMemberType());
    }

    @Transactional
    @Override
    public void managerRegister(MemberRequestDto.sign memberDto) {

        // 가입되어 있으면 예외처리(나중에 예외 변경해줄 것)
        if(memberRepository.findByEmail(memberDto.getMemberEmail()).isPresent())
            throw new IllegalArgumentException("이미 가입된 계정입니다.");


        System.out.println(memberDto.getCenterId());
        // 예외가 발생 안하면 가입 처리
        ChildCenter childCenter = childCenterRepository.findById(memberDto.getCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.managerRegister] 해당 센터 ID와 일치하는 센터가 존재하지 않습니다."));

        Manager manager = Manager.builder()
                .email(memberDto.getMemberEmail())
                .name(memberDto.getMemberName())
                .password(passwordEncoder.encode(memberDto.getMemberPassword()))
                .phoneNumber(memberDto.getMemberPhoneNumber())
                .birth(memberDto.getMemberBirth())
                .childCenter(childCenter)
                .memberType(MemberType.MANAGER)
                .build();

        memberRepository.save(manager);

    }

    //================================================================================
    //로그인
    @Override
    public ResponseEntity<?> login(MemberRequestDto.login loginReqDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReqDto.getMemberEmail(),
                        loginReqDto.getMemberPassword()
                )
        );

        var member = memberRepository.findByEmail(loginReqDto.getMemberEmail())
                .orElseThrow(() -> new IllegalArgumentException("[MemberServiceImpl.login] 존재하지 않는 멤버 Email입니다."));
        String jwtToken = jwtService.generateToken(member);


        if(member.getMemberType().equals(MemberType.CHILD)){
            MemberResponseDto.loginResChildDto childResDto = MemberResponseDto.loginResChildDto.builder()
                    .memberType(member.getMemberType())
                    .memberId(member.getId())
                    .centerId(((Child) member).getChildCenter().getId())
                    .dinosaurBookId(member.getDinosaurBook().getId())
                    .childName(member.getName())
                    .centerName(((Child) member).getChildCenter().getName())
                    .email(member.getEmail())
                    .phoneNumber(member.getPhoneNumber())
                    .profileImgPath(member.getProfileImgPath())
                    .birth(member.getBirth())
                    .enterDate(member.getEnterDate().toLocalDate())
                    .token(jwtToken)
                    .build();

            return new ResponseEntity(childResDto, HttpStatus.OK);

        }else if(member.getMemberType().equals(MemberType.VOLUNTEER)){
            MemberResponseDto.loginResVolunteerDto volunteerResDto = MemberResponseDto.loginResVolunteerDto.builder()
                    .memberType(member.getMemberType())
                    .memberId(member.getId())
                    .dinosaurBookId(member.getDinosaurBook().getId())
                    .volunteerName(member.getName())
                    .email(member.getEmail())
                    .phoneNumber(member.getPhoneNumber())
                    .profileImgPath(member.getProfileImgPath())
                    .birth(member.getBirth())
                    .enterDate(member.getEnterDate().toLocalDate())
                    .volunteerTime(((Volunteer)member).getVolunteerTime())
                    .token(jwtToken)
                    .build();

            return new ResponseEntity(volunteerResDto, HttpStatus.OK);

        }else if(member.getMemberType().equals(MemberType.MANAGER) && ((Manager) member).getApprovedStatus()){

            MemberResponseDto.loginResManagerDto managerResDto = MemberResponseDto.loginResManagerDto.builder()
                    .memberType(member.getMemberType())
                    .memberId(member.getId())
                    .centerId(((Manager) member).getChildCenter().getId())
                    .managerName(member.getName())
                    .centerName(((Manager) member).getChildCenter().getName())
                    .email(member.getEmail())
                    .phoneNumber(member.getPhoneNumber())
                    .profileImgPath(member.getProfileImgPath())
                    .birth(member.getBirth())
                    .enterDate(member.getEnterDate().toLocalDate())
                    .token(jwtToken)
                    .build();

            return new ResponseEntity(managerResDto, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 프로필 이미지 수정.
    @Transactional
    @Override
    public void changeProfileImg(MemberRequestDto.changeProfile profileReqDto) {
        Member member = memberRepository.findById(profileReqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.changeProfileImg] 해당 Id와 일치하는 Member 가 존재하지 않습니다."));

        member.changeProfileImage(profileReqDto.getProfileImgPath());
    }

    // 회원 비밀번호 변경
    @Transactional
    @Override
    public void changePassword(MemberRequestDto.changePassword passwordReqDto){
        log.info("[MemberServiceImpl.changePassword] change Password start... ");

        Member member = memberRepository.findById(passwordReqDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.changePassword] 해당 Id와 일치하는 Member 가 존재하지 않습니다."));

        // 현재 비밀번호가 일치 하지 않으면 그냥 return
        if(! passwordEncoder.matches(passwordReqDto.getNowPassword(), member.getPassword())) return;

        // 현재 비밀번호 일치하면 새 비밀번호로 변경.
        member.changePassword(passwordEncoder.encode(passwordReqDto.getNewPassword()));
        log.info("[MemberServiceImpl.changePassword] change Password finish!!! ");
    }

    @Transactional
    @Override
    public void deleteMember(MemberRequestDto.delete memberDto) {
        // 해당 사람의 비밀번호가 일치하는지 확인
        Member member = memberRepository.findById(memberDto.getMemberId())
                .orElseThrow(()-> new IllegalArgumentException("[MemberServiceImpl.deleteMember] 해당 Id와 일치하는 Member가 존재하지 않습니다."));

        // 현재 비밀번호가 일치 하지 않으면 그냥 return
        if(! passwordEncoder.matches(memberDto.getMemberPassword(), member.getPassword())) return;

        // 일치하면 탈퇴 처리
        memberRepository.delete(member);
    }


//    @Override
//    public MemberResponseDto.loginResDto authenticate(MemberRequestDto.login loginReqDto){
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginReqDto.getMemberEmail(),
//                        loginReqDto.getMemberPassword()
//                )
//        );
//        var member = memberRepository.findByEmail(loginReqDto.getMemberEmail())
//                .orElseThrow();
//        String jwtToken = jwtService.generateToken(member);
//
//        return MemberResponseDto.loginResDto.builder()
//                .token(jwtToken)
//                .build();
//    }

}

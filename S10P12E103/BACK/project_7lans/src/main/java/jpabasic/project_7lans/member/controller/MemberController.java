package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name="멤버 API", description = "멤버 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping(value = "/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final ChildCenterService childCenterService;

    // ================================================================================================================
    // ================================================================================================================
    // 회원가입
    @Operation(summary = "회원가입")
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid MemberRequestDto.sign memberDto){
        log.info("[MemberController.register] data input from FRONT email:{} name:{} password:{} type:{}", memberDto.getMemberEmail(),memberDto.getMemberName(),memberDto.getMemberPassword(),memberDto.getMemberType());
        // 회원가입
        try{
            if(memberDto.getMemberType().equals("V")){
                memberService.volunteerRegister(memberDto);
            }
            else if(memberDto.getMemberType().equals("C")){
                memberService.childRegister(memberDto);
            }
            else{
                memberService.managerRegister(memberDto);
            }

            log.info("[MemberController.register] finish register member");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 로그인
    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberRequestDto.login memberDto){
        try{
            // MemberService.login에서 멤버 유형에 따라 new ResponseEntity를 만들어 반환받는다.
            return memberService.login(memberDto);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 프로필 이미지 수정
    @Operation(summary = "프로필 이미지 수정")
    @PutMapping("/profile")
    public ResponseEntity changeProfileImg(@RequestBody @Valid MemberRequestDto.changeProfile profileReqDto){
        try{
            log.info("[MemberController.changeProfileImg] start change ProfileImg...");
            memberService.changeProfileImg(profileReqDto);
            log.info("[MemberController.changeProfileImg] change ProfileImg SUCCESS!!!");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            log.info("[MemberController.changeProfileImg] change ProfileImg FAIL!!!");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 비밀번호 변경
    @Operation(summary = "비밀번호 변경")
    @PutMapping("/password")
    public ResponseEntity changePassword(@RequestBody @Valid MemberRequestDto.changePassword passwordReqDto){
        try{
            log.info("[MemberController.changePassword] start change Member Password...");
            memberService.changePassword(passwordReqDto);
            log.info("[MemberController.changePassword] change Member Password SUCCESS!!!");
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            log.info("[MemberController.changePassword] change Member Password FAIL!!!");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

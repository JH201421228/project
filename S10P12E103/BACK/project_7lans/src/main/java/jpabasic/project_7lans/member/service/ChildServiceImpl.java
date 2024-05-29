package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.repository.VolunteerRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.member.repository.ChildRepository;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildServiceImpl implements ChildService {

    private final ChildCenterRepository childCenterRepository;
    private final RelationRepository relationRepository;
    private final VolunteerRepository volunteerRepository;
    private final ChildRepository childRepository;

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    // 아동 상세보기
    @Override
    public ChildResponseDto.detail childDetail(Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.childDetail] 해당 Id와 일치하는 Child 가 존재하지 않습니다."));

        return ChildResponseDto.detail.builder()
                .childId(child.getId())
                .childEmail(child.getEmail())
                .childName(child.getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childEnterDate(child.getEnterDate())
                .childCenterName(child.getChildCenter().getName())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

    // ================================================================================================================
    //해당 봉사자의 아이 리스트
    @Override
    public List<ChildResponseDto.listByVolunteer> listByVolunteer(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[ChildServiceImpl.childListByVolunteer] 해당 Id와 일치하는 Volunteer 가 존재하지 않습니다."));

        List<Relation> relations = relationRepository.findByVolunteer(volunteer);

        List<ChildResponseDto.listByVolunteer> children = new ArrayList<>();

        for(Relation relation : relations){
            Child child = relation.getChild();
            children.add(ChildResponseDto.toListByVolunteerDto(child, relation));
        }

        return children;
    }

    // ================================================================================================================
    // 해당 센터의 아동 리스트
    @Override
    public List<ChildResponseDto.listByCenter> listByCenter(Long centerId) {
        ChildCenter childCenter = childCenterRepository.findById(centerId)
                .orElseThrow(() -> new IllegalArgumentException("[ChildCenterServiceImpl.childList] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<Child> children = childCenter.getChildList();

        List<ChildResponseDto.listByCenter> childrenResponse = new ArrayList<>();
        for(Child child : children){
            childrenResponse.add(ChildResponseDto.toListByCenterDto(child));
        }

        return childrenResponse;
    }

    // ================================================================================================================
    // 관리자가 센터 관리화면에서 선택한 봉사자와 친구 추가가 되어 있지 않은 아동 리스트
    @Override
    public List<ChildResponseDto.childListByVolunteerAndCenter> childListByVolunteerAndCenter(ChildRequestDto.childListByVolunteerAndCenter childReqDto) {
        // 해당 센터의 아동 리스트 가져오기.
        ChildCenter childCenter = childCenterRepository.findById(childReqDto.getChildCenterId())
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.childListByVolunteerAndCenter] 해당 Id와 일치하는 center가 존재하지 않습니다."));

        List<Child> children = childCenter.getChildList();

        // 봉사자 정보 가져오기
        Volunteer volunteer = volunteerRepository.findById(childReqDto.getVolunteerId())
                .orElseThrow(()-> new IllegalArgumentException("[ChildServiceImpl.childListByVolunteerAndCenter] 해당 Id와 일치하는 volunteer가 존재하지 않습니다."));

        // 봉사자의 관계 정보 가져오기.
        List<Relation> relations = relationRepository.findByVolunteer(volunteer);

        // 해시맵에 보관
        Map<Long, Child> map = new HashMap<>();
        for(Relation relation: relations){
            map.put(relation.getChild().getId(), relation.getChild());
        }

        // 반환할 ResponseDto 리스트 생성
        List<ChildResponseDto.childListByVolunteerAndCenter> childrenResponse = new ArrayList<>();

        // 해시맵을 체크하며 관계 없는 아동 정보를 ResponseDto에 담는다.
        for(Child child : children){
            if(map.containsKey(child.getId())) continue; // 해시맵에 존재하면 관계가 있는 아동이므로 continue
            childrenResponse.add(ChildResponseDto.toChildListByVolunteerAndCenterDto(child));
        }

        return childrenResponse;
    }

    // ================================================================================================================
    // ================================================================================================================
    // 수정

    // 아동의 특이사항 작성하기
    @Override
    @Transactional
    public void modifyContent(ChildRequestDto.childWithContent childWithContent) {
        Child child = childRepository.findById(childWithContent.getId())
                .orElseThrow(() -> new IllegalArgumentException("[ChildServiceImpl.modifyContent] 해당 Id와 일치하는 child가 존재하지 않습니다."));

        child.changeSpecialContent(childWithContent.getSpecialContent());
        childRepository.save(child);
    }

}

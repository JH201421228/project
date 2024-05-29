package jpabasic.project_7lans.member.service;


import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Member;
import jpabasic.project_7lans.member.repository.ChildRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import jpabasic.project_7lans.member.repository.VolunteerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VolunteerServiceImpl implements VolunteerService{

    private final VolunteerRepository volunteerRepository;
    private final ChildCenterRepository childCenterRepository;
    private final RelationRepository relationRepository;
    private final MemberRepository memberRepository;
    private final ChildRepository childRepository;

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    //봉사자 상세 정보
    @Override
    public VolunteerResponseDto.detail volunteerDetail(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[VolunteerServiceImpl.volunteerDetail] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));
        return VolunteerResponseDto.toDetailDto(volunteer);
    }

    // ================================================================================================================
    // 봉사자 봉사 시간
    @Override
    public Integer getVolunteerTime(Long volunteerId) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(()-> new IllegalArgumentException("[VolunteerServiceImpl.getVolunteerTime] 해당 Id와 일치하는 Volunteer가 존재하지 않습니다."));

        return volunteer.getVolunteerTime();
    }

    // ================================================================================================================
    // 봉사자 리스트
    @Override
    public List<VolunteerResponseDto.list> volunteerList() {
        List<Volunteer> volunteerList = volunteerRepository.findAll();

        List<VolunteerResponseDto.list> volunteerDtoList = new ArrayList<>();

        for(Volunteer volunteer: volunteerList){
            volunteerDtoList.add(VolunteerResponseDto.toListDto(volunteer));
        }
        return volunteerDtoList;
    }


    // ================================================================================================================
    // 봉사자 이름으로 검색
    @Override
    public List<VolunteerResponseDto.volunteerSearchByName> volunteerSearchByName(VolunteerRequestDto.volunteerSearchByName reqDto) {
        List<Member> volunteerList = memberRepository.findByNameContaining(reqDto.getVolunteerName());
        List<VolunteerResponseDto.volunteerSearchByName> volunteers = new ArrayList<>();

        for(Member volunteer : volunteerList){
            volunteers.add(VolunteerResponseDto.toVolunteerSearchByNameDto((Volunteer) volunteer));
        }

        return volunteers;
    }

    // ================================================================================================================
    // 아동의 봉사자 리스트
    @Override
    public List<VolunteerResponseDto.listByChild> listByChild(Long childId) {
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new IllegalArgumentException("[VolunteerServiceImpl.listByChild] 해당 Id와 일치하는 child 가 존재하지 않습니다."));

        List<Relation> relationsList = relationRepository.findByChild(child);

        List<VolunteerResponseDto.listByChild> volunteers = new ArrayList<>();
        for (Relation relation : relationsList) {
            volunteers.add(VolunteerResponseDto.toListByChildDto(relation.getVolunteer(), relation));
        }

        return volunteers;
    }

    // ================================================================================================================
    // 센터의 봉사자 리스트
    @Override
    public List<VolunteerResponseDto.listByCenter> listByCenter(Long centerId) {
        ChildCenter childCenter = childCenterRepository.findById(centerId)
                .orElseThrow(() -> new IllegalArgumentException("[VolunteerServiceImpl.listByCenter] 해당 Id와 일치하는 Center 가 존재하지 않습니다."));

        List<Relation> relationList = relationRepository.findByChildCenter(childCenter);

        List<VolunteerResponseDto.listByCenter> volunteerList = new ArrayList<>();
        for(Relation relation : relationList){
            volunteerList.add(VolunteerResponseDto.toListByCenterDto(relation.getVolunteer(), relation));
        }

        return volunteerList;
    }

    // ================================================================================================================
    // ================================================================================================================
}

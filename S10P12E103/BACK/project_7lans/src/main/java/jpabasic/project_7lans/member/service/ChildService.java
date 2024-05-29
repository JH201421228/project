package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildService {

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    // 아동 상세보기
    public ChildResponseDto.detail childDetail(Long childId);

    // 봉사자의 아동 리스트 반환
    public List<ChildResponseDto.listByVolunteer> listByVolunteer(Long volunteerId);

    // 해당 센터의 아동 리스트
    public List<ChildResponseDto.listByCenter> listByCenter(Long centerId);

    // 관리자가 센터 관리화면에서 선택한 봉사자와 친구 추가가 되어 있지 않은 아동 리스트
    public List<ChildResponseDto.childListByVolunteerAndCenter> childListByVolunteerAndCenter(ChildRequestDto.childListByVolunteerAndCenter childReqDto);


    // ================================================================================================================
    // ================================================================================================================
    // 수정

    // 아동의 특이사항 작성하기
    public void modifyContent(ChildRequestDto.childWithContent childWithContent);
}

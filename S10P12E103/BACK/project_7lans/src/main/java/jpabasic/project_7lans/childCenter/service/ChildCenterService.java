package jpabasic.project_7lans.childCenter.service;

import jpabasic.project_7lans.childCenter.dto.ChildCenterRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.member.MemberRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface ChildCenterService {

    List<ChildCenterResponseDto.list> list();

    void centerRegister(ChildCenterRequestDto.centerDto centerDto);
}

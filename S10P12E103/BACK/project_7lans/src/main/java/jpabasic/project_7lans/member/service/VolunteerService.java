package jpabasic.project_7lans.member.service;

import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;

import java.util.List;

public interface VolunteerService {

    public VolunteerResponseDto.detail volunteerDetail(Long volunteerId);

    public Integer getVolunteerTime(Long volunteerId);

    public List<VolunteerResponseDto.list> volunteerList();

    public List<VolunteerResponseDto.volunteerSearchByName> volunteerSearchByName(VolunteerRequestDto.volunteerSearchByName reqDto);

    public List<VolunteerResponseDto.listByChild> listByChild(Long childId);

    public List<VolunteerResponseDto.listByCenter> listByCenter(Long centerId);

}

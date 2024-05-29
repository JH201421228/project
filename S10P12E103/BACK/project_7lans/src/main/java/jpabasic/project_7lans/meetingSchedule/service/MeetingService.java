package jpabasic.project_7lans.meetingSchedule.service;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface MeetingService {

    // =================================================================================================================
    // =================================================================================================================
    // 생성

    // 화상 미팅 생성
    public void create(MeetingScheduleRequestDto.create meeting);


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 해당 관계의 해당 년도, 해당 년월 화상 미팅 정보들 조회
    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(MeetingScheduleRequestDto.meetings meetingsDto);

    // =================================================================================================================
    // 미팅 스케줄 Id를 바탕으로 미팅 Detail 조회
    public MeetingScheduleResponseDto.meetingDetailById meetingDetailById(Long meetingId);

    // =================================================================================================================
    // 유저 Id를 바탕으로 현재 진행중인 미팅 조회
    public MeetingScheduleResponseDto.meetingOpenedByMember meetingOpenedByMember(Long childId);

    // =================================================================================================================
    //미팅 상태 조회(SCHEDULED)
    public boolean isScheduled(MeetingSchedule meetingSchedule);

    // =================================================================================================================
    //미팅 상태 조회(OPENED)
    public boolean isOpened(MeetingSchedule meetingSchedule);

    // =================================================================================================================
    //미팅 상태 조회(CLOSED)
    public boolean isClosed(MeetingSchedule meetingSchedule);


    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // 미팅 열기
    public void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto);

    // =================================================================================================================
    // 미팅 닫기
    public void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto);


    // =================================================================================================================
    // =================================================================================================================
    // 삭제

    public void deleteMeeting(Long meetingId);

}

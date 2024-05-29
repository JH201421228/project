package jpabasic.project_7lans.meetingSchedule.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.activityLog.dto.ActivityLogResponseDto;
import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import jpabasic.project_7lans.relation.entity.Relation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class MeetingScheduleResponseDto {

    /*
    위에서부터 아래로 내려가는 방향 순서대로
    생성, 조회, 수정, 삭제의 코드가 있다.
    가장 아래는 현재 사용되지 않으면서 주석처리된 코드들이 있다.
     */


    // =================================================================================================================
    // =================================================================================================================
    // 생성


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 일정 년도, 일정 월의 화상 미팅 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class monthList{
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] id 는 Null 일 수 없습니다.")
        Long meetingId;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] thumbnailImgPath 는 Null 일 수 없습니다.")
        String thumbnailImgPath;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] meetingUrl 는 Null 일 수 없습니다.")
        String meetingUrl;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] status 는 Null 일 수 없습니다.")
        ScheduleType status;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] day 는 Null 일 수 없습니다.")
        Integer day;
        @NotNull(message = "[MeetingScheduleRequestDto.monthList] time 는 Null 일 수 없습니다.")
        LocalTime time;

        // 바로 아래의 DTO를 사용할 것
        @Builder
        monthList(
                Long meetingId,
                String thumbnailImgPath,
                String meetingUrl,
                ScheduleType status,
                Integer day,
                LocalTime time
        ){
            this.meetingId = meetingId;
            this.thumbnailImgPath = thumbnailImgPath;
            this.meetingUrl = meetingUrl;
            this.status = status;
            this.day = day;
            this.time = time;
        }
    }

    // monthList 를 위한 DTO
    public static MeetingScheduleResponseDto.monthList toMonthListDto(MeetingSchedule meetingSchedule){
        return monthList.builder()
                .meetingId(meetingSchedule.getId())
                .thumbnailImgPath(meetingSchedule.getThumbnailImgPath())
                .meetingUrl(meetingSchedule.getMeetingUrl())
                .status(meetingSchedule.getStatus())
                .day(meetingSchedule.getScheduledStartTime().getDayOfMonth())
                .time(meetingSchedule.getScheduledStartTime().toLocalTime())
                .build();
    }

    // =================================================================================================================
    // 미팅 스케줄 Id를 바탕으로 미팅 Detail 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class meetingDetailById{
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] childId 는 Null 일 수 없습니다.")
        Long childId;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] volunteerId 는 Null 일 수 없습니다.")
        Long volunteerId;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] ScheduledStartTime 는 Null 일 수 없습니다.")
        LocalDateTime scheduledStartTime;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] ScheduledEndTime 는 Null 일 수 없습니다.")
        LocalDateTime scheduledEndTime;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] status 는 Null 일 수 없습니다.")
        String status;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetailById] thumbnailImgPath 는 Null 일 수 없습니다.")
        String thumbnailImgPath;

        // 바로 아래의 DTO를 사용할 것
        @Builder
        meetingDetailById(
                Long childId,
                Long volunteerId,
                LocalDateTime scheduledStartTime,
                LocalDateTime scheduledEndTime,
                String status,
                String thumbnailImgPath
        ){
            this.childId = childId;
            this.volunteerId = volunteerId;
            this.scheduledStartTime = scheduledStartTime;
            this.scheduledEndTime = scheduledEndTime;
            this.status = status;
            this.thumbnailImgPath = thumbnailImgPath;
        }
    }

    // meetingDetail 를 위한 DTO
    public static MeetingScheduleResponseDto.meetingDetailById toMeetingDetailByIdDto(MeetingSchedule meetingSchedule, Relation relation){
        return meetingDetailById.builder()
                .childId(relation.getChild().getId())
                .volunteerId(relation.getVolunteer().getId())
                .scheduledStartTime(meetingSchedule.getScheduledStartTime())
                .scheduledEndTime(meetingSchedule.getScheduledEndTime())
                .status(meetingSchedule.getStatus().name())
                .thumbnailImgPath(meetingSchedule.getThumbnailImgPath())
                .build();
    }

    // =================================================================================================================
    // 유저 Id를 바탕으로 현재 진행중인 미팅 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class meetingOpenedByMember{
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] childId 는 Null 일 수 없습니다.")
        Long childId;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] volunteerId 는 Null 일 수 없습니다.")
        Long volunteerId;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] ScheduledStartTime 는 Null 일 수 없습니다.")
        LocalDateTime scheduledStartTime;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] ScheduledEndTime 는 Null 일 수 없습니다.")
        LocalDateTime scheduledEndTime;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] status 는 Null 일 수 없습니다.")
        String status;
        @NotNull(message = "[MeetingScheduleRequestDto.meetingDetail] thumbnailImgPath 는 Null 일 수 없습니다.")
        String thumbnailImgPath;

        // 바로 아래의 DTO를 사용할 것
        @Builder
        meetingOpenedByMember(
                Long childId,
                Long volunteerId,
                LocalDateTime scheduledStartTime,
                LocalDateTime scheduledEndTime,
                String status,
                String thumbnailImgPath
        ){
            this.childId = childId;
            this.volunteerId = volunteerId;
            this.scheduledStartTime = scheduledStartTime;
            this.scheduledEndTime = scheduledEndTime;
            this.status = status;
            this.thumbnailImgPath = thumbnailImgPath;
        }
    }

    // meetingOpenedByMember 를 위한 DTO
    public static MeetingScheduleResponseDto.meetingOpenedByMember toMeetingOpenedByMemberDto(MeetingSchedule meetingSchedule, Relation relation){
        return meetingOpenedByMember.builder()
                .childId(relation.getChild().getId())
                .volunteerId(relation.getVolunteer().getId())
                .scheduledStartTime(meetingSchedule.getScheduledStartTime())
                .scheduledEndTime(meetingSchedule.getScheduledEndTime())
                .status(meetingSchedule.getStatus().name())
                .thumbnailImgPath(meetingSchedule.getThumbnailImgPath())
                .build();
    }


    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // =================================================================================================================
    // =================================================================================================================
    // 삭제

    // =================================================================================================================
    // =================================================================================================================
    // 일단 주석된 코드들

//    //이미지 조회
//    @Getter
//    @NoArgsConstructor(access = AccessLevel.PROTECTED)
//    public static class imgList{
//        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgId 는 Null 일 수 없습니다.")
//        Long imgId;
//        @NotNull(message = "[MeetingScheduleRequestDto.imgList] imgPath 는 Null 일 수 없습니다.")
//        String imgPath;
//
//
//        @Builder
//        imgList(
//                Long imgId,
//                String imgPath
//        ){
//            this.imgId = imgId;
//            this.imgPath = imgPath;
//        }
//    }
}

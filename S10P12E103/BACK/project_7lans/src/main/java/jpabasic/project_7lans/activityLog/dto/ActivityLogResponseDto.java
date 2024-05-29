package jpabasic.project_7lans.activityLog.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.relation.entity.Relation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class ActivityLogResponseDto {

    // ================================================================================================================
    // ================================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: Relation id, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailListByVolunteer {
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;
        @NotNull(message = "[ActivityLogResponseDto.detailListByVolunteer] writeDoneStatus 은 Null 일 수 없습니다.")
        private boolean writeDoneStatus;

        // 바로 아래의 DTO를 쓸 것.
        @Builder
        detailListByVolunteer(
                Long activityLogId,
                LocalDate dateInfo,
                boolean approveStatus,
                boolean writeDoneStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.approveStatus = approveStatus;
            this.writeDoneStatus = writeDoneStatus;
        }
    }

    // detailListByVolunteer 를 위한 DTO
    public static ActivityLogResponseDto.detailListByVolunteer toDetailListByVolunteerDto(ActivityLog activityLog){
        return detailListByVolunteer.builder()
                .activityLogId(activityLog.getId())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .approveStatus(activityLog.getApproveStatus())
                .writeDoneStatus(activityLog.getWriteStatus())
                .build();
    }

    // ================================================================================================================
    // 봉사자 활동 일지 상세 조회
    // Req: Relation id, activityLog id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByVolunteer {
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityStartTime 은 Null 일 수 없습니다.")
        private LocalDateTime activityStartTime;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityEndTime 은 Null 일 수 없습니다.")
        private LocalDateTime activityEndTime;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] activityTime 은 Null 일 수 없습니다.")
        private Long activityTime;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] centerName 은 Null 일 수 없습니다.")
        private String centerName;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] content 은 Null 일 수 없습니다.")
        private String content;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] writeDoneStatus 은 Null 일 수 없습니다.")
        private boolean writeDoneStatus;
        @NotNull(message = "[ActivityLogResponseDto.detailByVolunteer] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;

        // 바로 아래의 DTO를 쓸 것.
        @Builder
        detailByVolunteer(
                Long activityLogId,
                LocalDate dateInfo,
                LocalDateTime activityStartTime,
                LocalDateTime activityEndTime,
                Long activityTime,
                String centerName,
                String volunteerName,
                String content,
                boolean writeDoneStatus,
                boolean approveStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.activityStartTime = activityStartTime;
            this.activityEndTime = activityEndTime;
            this.activityTime = activityTime;
            this.centerName = centerName;
            this.volunteerName = volunteerName;
            this.content = content;
            this.writeDoneStatus = writeDoneStatus;
            this.approveStatus = approveStatus;

        }
    }

    // detailByVolunteer 를 위한 DTO
    public static ActivityLogResponseDto.detailByVolunteer toDetailByVolunteerDto(ActivityLog activityLog, Relation relation){
        return detailByVolunteer.builder()
                .activityLogId(activityLog.getId())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .activityStartTime(activityLog.getRealStartTime())
                .activityEndTime(activityLog.getRealEndTime())
                .activityTime(ChronoUnit.HOURS.between(activityLog.getRealStartTime(), activityLog.getRealEndTime()))
                .centerName(relation.getChildCenter().getName())
                .volunteerName(relation.getVolunteer().getName())
                .content(activityLog.getContent())
                .writeDoneStatus(activityLog.getWriteStatus())
                .approveStatus(activityLog.getApproveStatus())
                .build();
    }

    // ================================================================================================================
    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음

    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음


    // ================================================================================================================
    // ================================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listApprovedByManager {
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] activityId 은 Null 일 수 없습니다.")
        private Long activityId;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] relationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] title 은 Null 일 수 없습니다.")
        private String title;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ActivityLogResponseDto.listApprovedByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;

        // 바로 아래의 DTO를 쓸 것.
        @Builder
        listApprovedByManager(
                Long activityId,
                Long relationId,
                String title,
                String volunteerName,
                String childName,
                LocalDate dateInfo
        ){
            this.activityId = activityId;
            this.relationId = relationId;
            this.title = title;
            this.volunteerName = volunteerName;
            this.childName = childName;
            this.dateInfo = dateInfo;
        }
    }

    // listApprovedByManager 를 위한 DTO
    public static ActivityLogResponseDto.listApprovedByManager toListApprovedByManagerDto(ActivityLog activityLog, Relation relation){
        return listApprovedByManager.builder()
                .activityId(activityLog.getId())
                .relationId(relation.getId())
                .volunteerName(relation.getVolunteer().getName())
                .childName(relation.getChild().getName())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .build();
    }

    // ================================================================================================================
    // 관리자 활동 일지 리스트 조회(승인안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listDisapprovedByManager {
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] activityId 은 Null 일 수 없습니다.")
        private Long activityId;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] relationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] title 은 Null 일 수 없습니다.")
        private String title;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ActivityLogResponseDto.listDisapprovedByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;

        // 바로 아래의 DTO를 쓸 것.
        @Builder
        listDisapprovedByManager(
                Long activityId,
                Long relationId,
                String title,
                String volunteerName,
                String childName,
                LocalDate dateInfo
        ){
            this.activityId = activityId;
            this.relationId = relationId;
            this.title = title;
            this.volunteerName = volunteerName;
            this.childName = childName;
            this.dateInfo = dateInfo;
        }
    }

    // listDisapprovedByManager 를 위한 DTO
    public static ActivityLogResponseDto.listDisapprovedByManager toListDisapprovedByManagerDto(ActivityLog activityLog, Relation relation){
        return listDisapprovedByManager.builder()
                .activityId(activityLog.getId())
                .relationId(relation.getId())
                .volunteerName(relation.getVolunteer().getName())
                .childName(relation.getChild().getName())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .build();
    }

    // ================================================================================================================
    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByManager {
        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityStartTime 은 Null 일 수 없습니다.")
        private LocalDateTime activityStartTime;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityEndTime 은 Null 일 수 없습니다.")
        private LocalDateTime activityEndTime;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] activityTime 은 Null 일 수 없습니다.")
        private Long activityTime;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] centerName 은 Null 일 수 없습니다.")
        private String centerName;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] volunteerName 은 Null 일 수 없습니다.")
        private String volunteerName;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] content 은 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] writeDoneStatus 은 Null 일 수 없습니다.")
        private boolean writeDoneStatus;

        @NotNull(message = "[ActivityLogResponseDto.detailByManager] approveStatus 은 Null 일 수 없습니다.")
        private boolean approveStatus;

        // 바로 아래의 DTO를 쓸 것.
        @Builder
        detailByManager(
                Long activityLogId,
                LocalDate dateInfo,
                LocalDateTime activityStartTime,
                LocalDateTime activityEndTime,
                Long activityTime,
                String centerName,
                String volunteerName,
                String content,
                boolean writeDoneStatus,
                boolean approveStatus
        ){
            this.activityLogId = activityLogId;
            this.dateInfo = dateInfo;
            this.activityStartTime = activityStartTime;
            this.activityEndTime = activityEndTime;
            this.activityTime = activityTime;
            this.centerName = centerName;
            this.volunteerName = volunteerName;
            this.content = content;
            this.writeDoneStatus = writeDoneStatus;
            this.approveStatus = approveStatus;
        }
    }

    // detailByManager 를 위한 DTO
    public static ActivityLogResponseDto.detailByManager toDetailByManagerDto(ActivityLog activityLog, Relation relation){
        return detailByManager.builder()
                .activityLogId(activityLog.getId())
                .dateInfo(activityLog.getRealStartTime().toLocalDate())
                .activityStartTime(activityLog.getRealStartTime())
                .activityEndTime(activityLog.getRealEndTime())
                .activityTime(ChronoUnit.HOURS.between(activityLog.getRealStartTime(), activityLog.getRealEndTime()))
                .centerName(relation.getChildCenter().getName())
                .volunteerName(relation.getVolunteer().getName())
                .content(activityLog.getContent())
                .writeDoneStatus(activityLog.getWriteStatus())
                .approveStatus(activityLog.getApproveStatus())
                .build();
    }

    // ================================================================================================================
    // 관리자 활동 일지 승인
    // Req: 관계 Id, 활동 일지 Id
    // Res: 없음
}

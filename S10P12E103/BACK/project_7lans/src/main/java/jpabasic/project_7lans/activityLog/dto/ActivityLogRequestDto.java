package jpabasic.project_7lans.activityLog.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ActivityLogRequestDto {

    // ================================================================================================================
    // ================================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: Relation id, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailListByVolunteer {
        @NotNull(message = "[ActivityLogRequestDto.detailListByVolunteer] RelationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogRequestDto.detailListByVolunteer] dateInfo 은 Null 일 수 없습니다.")
        private LocalDate dateInfo;

        @Builder
        detailListByVolunteer(
                Long relationId,
                LocalDate dateInfo
        ){
            this.relationId = relationId;
            this.dateInfo = dateInfo;
        }
    }

    // ================================================================================================================
    // 봉사자 활동 일지 상세 조회
    // Req: Relation id, activityLog id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByVolunteer {
        @NotNull(message = "[ActivityLogRequestDto.detailByVolunteer] RelationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogRequestDto.detailByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;

        @Builder
        detailByVolunteer(
                Long relationId,
                Long activityLogId
        ){
            this.relationId = relationId;
            this.activityLogId = activityLogId;
        }
    }

    // ================================================================================================================
    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class modifyByVolunteer {
        @NotNull(message = "[ActivityLogRequestDto.modifyByVolunteer] volunteerId 은 Null 일 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[ActivityLogRequestDto.modifyByVolunteer] RelationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogRequestDto.modifyByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogRequestDto.modifyByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private String content;

        @Builder
        modifyByVolunteer(
                Long volunteerId,
                Long relationId,
                Long activityLogId,
                String content
        ){
            this.volunteerId = volunteerId;
            this.relationId = relationId;
            this.activityLogId = activityLogId;
            this.content = content;
        }
    }

    // ================================================================================================================
    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class writeDoneByVolunteer {
        @NotNull(message = "[ActivityLogRequestDto.writeDoneByVolunteer] volunteerId 은 Null 일 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[ActivityLogRequestDto.writeDoneByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;
        @NotNull(message = "[ActivityLogRequestDto.writeDoneByVolunteer] activityLogId 은 Null 일 수 없습니다.")
        private String content;

        @Builder
        writeDoneByVolunteer(
                Long volunteerId,
                Long RelationId,
                Long activityLogId,
                String content
        ){
            this.volunteerId = volunteerId;
            this.activityLogId = activityLogId;
            this.content = content;
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listApprovedByManager {
        @NotNull(message = "[ActivityLogRequestDto.listApprovedByManager] centerId 은 Null 일 수 없습니다.")
        private Long centerId;

        @Builder
        listApprovedByManager(
                Long centerId
        ){
            this.centerId = centerId;
        }
    }

    // ================================================================================================================
    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listDisapprovedByManager {
        @NotNull(message = "[ActivityLogRequestDto.listDisapprovedByManager] centerId 은 Null 일 수 없습니다.")
        private Long centerId;

        @Builder
        listDisapprovedByManager(
                Long centerId
        ){
            this.centerId = centerId;
        }
    }

    // ================================================================================================================
    // 관리자 활동 일지 상세 조회
    // Req: CenterId, Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByManager {
        @NotNull(message = "[ActivityLogRequestDto.detailByManager] RelationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogRequestDto.detailByManager] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;

        @Builder
        detailByManager(
                Long relationId,
                Long activityLogId
        ){
            this.relationId = relationId;
            this.activityLogId = activityLogId;
        }
    }

    // ================================================================================================================
    // 관리자 활동 일지 승인
    // Req: CenterId, RelationId, activityLogId
    // Res: 없음
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class approveByManager {
        @NotNull(message = "[ActivityLogRequestDto.approveByManager] centerId 은 Null 일 수 없습니다.")
        private Long centerId;
        @NotNull(message = "[ActivityLogRequestDto.approveByManager] RelationId 은 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[ActivityLogRequestDto.approveByManager] activityLogId 은 Null 일 수 없습니다.")
        private Long activityLogId;

        @Builder
        approveByManager(
                Long centerId,
                Long relationId,
                Long activityLogId
        ){
            this.centerId = centerId;
            this.relationId = relationId;
            this.activityLogId = activityLogId;
        }
    }

    // ================================================================================================================
    // 화상채팅 시작시 활동 일지 시작 시간 입력(아이가 시작)
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class startTime {
        @NotNull(message = "[ActivityLogRequestDto.startTime] meetingId 은 Null 일 수 없습니다.")
        private Long meetingId;
        @NotNull(message = "[ActivityLogRequestDto.startTime] startTime 은 Null 일 수 없습니다.")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime startTime;

        @Builder
        startTime(
                Long meetingId,
                LocalDateTime startTime
        ){
            this.meetingId = meetingId;
            this.startTime = startTime;
        }
    }

    // ================================================================================================================
    // 화상채팅 종료시 활동 일지 종료 시간 입력(아이가 종료) -> MeetingServiceImpl(화상 미팅 세션 CLOSE)로 이동
}

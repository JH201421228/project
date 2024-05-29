package jpabasic.project_7lans.meetingImage.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MeetingImageRequestDto {
    // ================================================================================
    // ================================================================================
    // 생성

    // 사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    // PostMapping 방식으로 처리
    // Req: meetingId, meetingImagePath
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class saveMeetingImage{
        @NotNull(message = "[MeetingScheduleRequestDto.save] meetingId 는 Null 일 수 없습니다.")
        Long meetingId;

        @NotNull(message = "[MeetingScheduleRequestDto.save] meetingImagePath 는 Null 일 수 없습니다.")
        String meetingImagePath;

        @Builder
        saveMeetingImage(
                Long meetingId,
                String meetingImagePath
        ){
            this.meetingId = meetingId;
            this.meetingImagePath = meetingImagePath;
        }
    }

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    // GetRequest 방식으로 meetingId 하나 받아서 처리함 -> RequestDTo 필요없다.

    // ================================================================================
    // ================================================================================
    // 수정

    // 지난(종료된) 화상미팅의 썸네일 사진 수정하기
    // Put 방식으로 처리
    // Req: meetingImageId
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class changeThumbnailImage{
        @NotNull(message = "[MeetingImageRequestDto.modifyThumbnailImage] meetingImageId 는 Null 일 수 없습니다.")
        Long meetingImageId;

        @Builder
        changeThumbnailImage(
                Long meetingImageId
        ){
            this.meetingImageId = meetingImageId;
        }
    }

    // ================================================================================
    // ================================================================================
    // 삭제


}

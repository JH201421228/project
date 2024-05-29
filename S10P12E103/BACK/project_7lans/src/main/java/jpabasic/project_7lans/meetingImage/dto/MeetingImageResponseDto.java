package jpabasic.project_7lans.meetingImage.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dinosaur.dto.DinosaurResponseDto;
import jpabasic.project_7lans.dinosaur.entity.Dinosaur;
import jpabasic.project_7lans.meetingImage.entity.MeetingImage;
import jpabasic.project_7lans.relation.dto.RelationResponseDto;
import jpabasic.project_7lans.relation.entity.Relation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MeetingImageResponseDto {
    // ================================================================================
    // ================================================================================
    // 생성

    // 사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    // Response 필요 없다.

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    // Res: meetingImageId, meetingImagePath
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class imageList{
        @NotNull(message = "[MeetingImageResponseDto.imageList] meetingImageId 는 Null 일 수 없습니다.")
        Long meetingImageId;
        @NotNull(message = "[MeetingImageResponseDto.imageList] meetingImagePath 는 Null 일 수 없습니다.")
        String meetingImagePath;

        @Builder
        imageList(
                Long meetingImageId,
                String meetingImagePath
        ){
            this.meetingImageId = meetingImageId;
            this.meetingImagePath = meetingImagePath;
        }

        public static MeetingImageResponseDto.imageList toImageListDto(MeetingImage meetingImage) {
            return MeetingImageResponseDto.imageList.builder()
                    .meetingImageId(meetingImage.getMeetingImageId())
                    .meetingImagePath(meetingImage.getMeetingImagePath())
                    .build();
        }
    }

    // ================================================================================
    // 지난 랜덤 화상 미팅 사진
    // Req: PathVariable Long volunteerId
    // Res: List<randomMeetingImage>
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class randomMeetingImage{
        @NotNull(message = "[MeetingImageResponseDto.randomMeetingImage] randomImageId 는 Null 일 수 없습니다.")
        Long randomImageId;
        @NotNull(message = "[MeetingImageResponseDto.randomMeetingImage] randomImagePath 는 Null 일 수 없습니다.")
        String randomImagePath;

        @Builder
        randomMeetingImage(
                Long randomImageId,
                String randomImagePath
        ){
            this.randomImageId = randomImageId;
            this.randomImagePath = randomImagePath;
        }
    }

    public static MeetingImageResponseDto.randomMeetingImage toRandomMeetingImageDto(MeetingImage meetingImage) {
        return MeetingImageResponseDto.randomMeetingImage.builder()
                .randomImageId(meetingImage.getMeetingImageId())
                .randomImagePath(meetingImage.getMeetingImagePath())
                .build();
    }

    // ================================================================================
    // ================================================================================
    // 수정
    // Response 필요 없다.

    // ================================================================================
    // ================================================================================
    // 삭제

    // ================================================================================
    // ================================================================================
    // ================================================================================
    // 여기서부터 toDTO

    //
}

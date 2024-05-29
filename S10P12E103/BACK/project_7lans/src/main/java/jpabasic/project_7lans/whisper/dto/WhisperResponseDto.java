package jpabasic.project_7lans.whisper.dto;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.whisper.entity.Whisper;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class WhisperResponseDto {


    // ===================================================================================================
    // 속닥속닥 1건 조회용
    @Getter
    @Builder
    public static class detail {
        @NotNull(message = "[WhisperResponseDto.detail] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @NotNull(message = "[WhisperResponseDto.detail] writer 는 Null 일 수 없습니다.")
        private String writer;

        @NotNull(message = "[WhisperResponseDto.detail] relation 는 Null 일 수 없습니다.")
        private Long relationId;

        @NotNull(message = "[WhisperResponseDto.detail] content 는 Null 일 수 없습니다.")
        private String content;

        @NotNull(message = "[WhisperResponseDto.detail] createDate 는 Null 일 수 없습니다.")
        private LocalDateTime createDate;

        public static WhisperResponseDto.detail toDetailDto(Whisper whisper){
            return WhisperResponseDto.detail.builder()
                    .whisperId(whisper.getId())
                    .writer(whisper.getWriter().getName())
                    .content(whisper.getContent())
                    .relationId(whisper.getRelation().getId())
                    .createDate(whisper.getCreateDate())
                    .build();
        }

    }

    // ===================================================================================================
    // 메인화면 속닥속닥 리스트 조회용
//    @Getter
//    @Builder
//    public static class whisperForList {
//        @NotNull(message = "[WhisperResponseDto.whisperForList] whisperId 는 Null 일 수 없습니다.")
//        private Long whisperId;
//
//        @NotNull(message = "[WhisperResponseDto.whisperForList] writer 는 Null 일 수 없습니다.")
//        private String writer;
//
//        @NotNull(message = "[WhisperResponseDto.whisperForList] content 는 Null 일 수 없습니다.")
//        private String content;
//
//        @NotNull(message = "[WhisperResponseDto.whisperForList] childVolunteerRelationId 는 Null 일 수 없습니다.")
//        private Long relationId;
//
//        @NotNull(message = "[WhisperResponseDto.whisperForList] createDate 는 Null 일 수 없습니다.")
//        private LocalDateTime createDate;
//
//        public static WhisperResponseDto.whisperForList toListDto(Whisper whisper){
//            return WhisperResponseDto.whisperForList.builder()
//                    .whisperId(whisper.getId())
//                    .writer(whisper.getWriter().getName())
//                    .content(whisper.getContent())
//                    .relationId(whisper.getRelation().getId())
//                    .createDate(whisper.getCreateDate())
//                    .build();
//        }
//    }

    // ===================================================================================================
    // 여기부터 새로 추가

}

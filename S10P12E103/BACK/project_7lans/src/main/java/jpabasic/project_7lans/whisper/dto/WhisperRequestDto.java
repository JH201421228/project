package jpabasic.project_7lans.whisper.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
public class WhisperRequestDto {


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class create{
        @NotNull(message = "[WhisperRequestDto.create] writerId 는 Null 일 수 없습니다.")
        private Long writerId;
        @NotNull(message = "[WhisperRequestDto.create] relationId 는 Null 일 수 없습니다.")
        private Long relationId;
        @NotNull(message = "[WhisperRequestDto.create] content 는 Null 일 수 없습니다.")
        private String content;

        @Builder
        public create(
                Long writerId,
                Long relationId,
                String content
        ){
            this.writerId = writerId;
            this.relationId = relationId;
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById{
        @NotNull(message = "[WhisperRequestDto.detailById] whisperId 는 Null 일 수 없습니다.")
        private Long whisperId;

        @Builder
        public detailById(
                Long whisperId
        ){
            this.whisperId = whisperId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listById{
        @NotNull(message = "[WhisperRequestDto.detailById] whisperId 는 Null 일 수 없습니다.")
        private Long relationId;

        @Builder
        public listById(
                Long relationId
        ){
            this.relationId = relationId;
        }
    }
}

package jpabasic.project_7lans.dinosaur.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class EggRequestDto {

    // 화상 채팅 종료시 알 경험치 증가
    @Getter
    @NoArgsConstructor
    public static class addMeetingExperienceEgg{
        private Long relationId;

        @Builder
        addMeetingExperienceEgg(
                Long relationId
        ) {
            this.relationId = relationId;
        }
    }

    // 속닥속닥 사용 시 알 경험치 증가
    @Getter
    @NoArgsConstructor
    public static class addWhisperExperienceEgg{
        private Long relationId;

        @Builder
        addWhisperExperienceEgg(
                Long relationId
        ) {
            this.relationId = relationId;
        }
    }
}

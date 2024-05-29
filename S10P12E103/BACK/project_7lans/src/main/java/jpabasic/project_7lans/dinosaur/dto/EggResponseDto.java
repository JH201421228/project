package jpabasic.project_7lans.dinosaur.dto;

import jpabasic.project_7lans.dinosaur.entity.Egg;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class EggResponseDto {

    // 알 정보 얻기
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        private Long id;
        private boolean volunteerCheck;
        private boolean childCheck;
        private Integer experience;
        private DinosaurResponseDto.detail dinosaur;

        @Builder
        detail(
                Long id,
                boolean volunteerCheck,
                boolean childCheck,
                Integer experience,
                DinosaurResponseDto.detail dinosaur
        ) {
            this.id = id;
            this.volunteerCheck = volunteerCheck;
            this.childCheck = childCheck;
            this.experience = experience;
            this.dinosaur = dinosaur;
        }

        public static EggResponseDto.detail toDto(Egg egg) {
            return detail.builder()
                    .id(egg.getId())
                    .volunteerCheck(egg.isVolunteerCheck())
                    .childCheck(egg.isChildCheck())
                    .experience(egg.getExperience())
                    .dinosaur(DinosaurResponseDto.detail.toDto(egg.getDinosaur()))
                    .build();
        }

    }
}

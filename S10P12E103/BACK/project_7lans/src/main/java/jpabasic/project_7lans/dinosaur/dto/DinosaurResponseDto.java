package jpabasic.project_7lans.dinosaur.dto;

import jpabasic.project_7lans.dinosaur.entity.Dinosaur;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

public class DinosaurResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        private Long id;
        private String name;
        private String baseFace;
        private String happyFace;
        private String studyFace;
        private String sadFace;
        private String description;
        private int weight;
        private int height;
        private boolean isOwned;


        @Builder
        detail(
                Long id,
                String name,
                String baseFace,
                String happyFace,
                String studyFace,
                String sadFace,
                String description,
                int weight,
                int height,
                boolean isOwned
        ) {
            this.id = id;
            this.name = name;
            this.baseFace = baseFace;
            this.happyFace = happyFace;
            this.studyFace = studyFace;
            this.sadFace = sadFace;
            this.description = description;
            this.weight = weight;
            this.height = height;
            this.isOwned = isOwned;
        }


        public static DinosaurResponseDto.detail toDto(Dinosaur entity, boolean isOwned) {
            return DinosaurResponseDto.detail.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .baseFace(entity.getBaseFace())
                    .happyFace(entity.getHappyFace())
                    .studyFace(entity.getStudyFace())
                    .sadFace(entity.getSadFace())
                    .description(entity.getDescription())
                    .weight(entity.getWeight())
                    .height(entity.getHeight())
                    .isOwned(isOwned)
                    .build();
        }

        public static DinosaurResponseDto.detail toDto(Dinosaur entity) {
            return DinosaurResponseDto.detail.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .baseFace(entity.getBaseFace())
                    .happyFace(entity.getHappyFace())
                    .studyFace(entity.getStudyFace())
                    .sadFace(entity.getSadFace())
                    .description(entity.getDescription())
                    .weight(entity.getWeight())
                    .height(entity.getHeight())
                    .build();
        }

    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {

        private List<DinosaurResponseDto.detail> dinosaurs = new ArrayList<>();
        private DinosaurResponseDto.detail myDinosaur;


        @Builder
        list(
                DinosaurResponseDto.detail myDinosaur
        ) {
            this.myDinosaur = myDinosaur;
        }

    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class hatch {
        private Long id;
        private String name;
        private String baseFace;
        private String happyFace;
        private String studyFace;
        private String sadFace;
        private String description;
        private int weight;
        private int height;
        private boolean isAdded;


        @Builder
        hatch(
                Long id,
                String name,
                String baseFace,
                String happyFace,
                String studyFace,
                String sadFace,
                String description,
                int weight,
                int height,
                boolean isAdded
        ) {
            this.id = id;
            this.name = name;
            this.baseFace = baseFace;
            this.happyFace = happyFace;
            this.studyFace = studyFace;
            this.sadFace = sadFace;
            this.description = description;
            this.weight = weight;
            this.height = height;
            this.isAdded = isAdded;
        }


        public static DinosaurResponseDto.hatch toDto(Dinosaur entity, boolean isAdded) {
            return DinosaurResponseDto.hatch.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .baseFace(entity.getBaseFace())
                    .happyFace(entity.getHappyFace())
                    .studyFace(entity.getStudyFace())
                    .sadFace(entity.getSadFace())
                    .description(entity.getDescription())
                    .weight(entity.getWeight())
                    .height(entity.getHeight())
                    .isAdded(isAdded)
                    .build();
        }

    }

}

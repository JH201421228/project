package jpabasic.project_7lans.dinosaur.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Dinosaur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String baseFace;

    private String happyFace;

    private String studyFace;

    private String sadFace;

    private String description;

    private int weight;

    private int height;

    @Builder
    public Dinosaur(
            String name,
            String baseFace,
            String happyFace,
            String studyFace,
            String sadFace,
            String description,
            int weight,
            int height
    ) {
        this.name = name;
        this.baseFace = baseFace;
        this.happyFace = happyFace;
        this.studyFace = studyFace;
        this.sadFace = sadFace;
        this.description = description;
        this.weight = weight;
        this.height = height;
    }
}

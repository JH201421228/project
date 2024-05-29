package jpabasic.project_7lans.dinosaur.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DinosaurCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Dinosaur dinosaur;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private DinosaurBook dinosaurBook;
    @Builder
    public DinosaurCollection(
            Dinosaur dinosaur
    ) {
        this.dinosaur = dinosaur;
    }

}

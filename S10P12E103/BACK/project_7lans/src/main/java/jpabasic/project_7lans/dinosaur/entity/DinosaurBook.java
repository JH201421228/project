package jpabasic.project_7lans.dinosaur.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.member.entity.Member;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DinosaurBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @OneToOne(mappedBy = "dinosaurBook", fetch = FetchType.LAZY)
    private Member member;

    @OneToMany(mappedBy = "dinosaurBook", cascade = CascadeType.ALL)
    private List<DinosaurCollection> dinosaurCollection = new ArrayList<>();

    @ManyToOne
    private Dinosaur myDinosaur;

    @Builder
    public DinosaurBook(
            Dinosaur myDinosaur
    ) {
        this.myDinosaur = myDinosaur;
    }

    public void addDinosaurCollection(DinosaurCollection collection) {
        this.dinosaurCollection.add(collection);
        collection.setDinosaurBook(this);
    }

    public void changeMyDinosaur(Dinosaur newDinosaur) {
        this.myDinosaur = newDinosaur;
    }

    public boolean addNewDinosaur(Dinosaur dinosaur) {
        Optional<DinosaurCollection> existingCollection = this.dinosaurCollection.stream()
                .filter(collection -> collection.getDinosaur().equals(dinosaur))
                .findFirst();


        if (existingCollection.isPresent()) {
            return false; // 이미 보유하고 있으므로 Dinosaur를 추가하지 않았음을 나타내는 false 반환
        }

        // Dinosaur를 보유하고 있지 않으므로 새로운 DinosaurCollection을 추가
        DinosaurCollection dinosaurCollection = DinosaurCollection.builder()
                .dinosaur(dinosaur)
                .build();

        addDinosaurCollection(dinosaurCollection);
        return true; // 새로운 Dinosaur를 추가했음을 나타내는 true 반환
    }
}

package jpabasic.project_7lans.dinosaur.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.dinosaur.entity.Dinosaur;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Member;
import jpabasic.project_7lans.member.entity.Volunteer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Egg {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean volunteerCheck = false;

    private boolean childCheck = false;

    private Integer experience = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dinosaur_id")
    private Dinosaur dinosaur;

    public void addExperience(Integer exp){
        this.experience += exp;
    }

    public void changeVolunteerCheck() {
        this.volunteerCheck = !this.volunteerCheck;
    }

    public void changeChildCheck() {
        this.childCheck = !this.childCheck;
    }

    @Builder
    public Egg(
            Dinosaur dinosaur
    ){

        this.dinosaur = dinosaur;
    }

    public void changeCheckByMemberType(Member member) {
        if (member instanceof Volunteer) {
            this.changeVolunteerCheck();
        } else if (member instanceof Child) {
            this.changeChildCheck();
        }
    }

    public void resetEgg(Dinosaur newDinosaur) {
        this.dinosaur = newDinosaur;
        this.experience = 0;
        this.volunteerCheck = false;
        this.childCheck = false;
    }

    // FIXME 알의 경험치 상승 로직 실제 사용될때 수정해야 하는 부분이 있을때 추가/삭제/수정 필요
    public int increaseExpByWritingWhisper() {
        return this.experience = Math.min(100, this.experience + 5);
    }

    public int increaseExpByMeeting() {
        return this.experience = Math.min(100, this.experience + 15);
    }


}

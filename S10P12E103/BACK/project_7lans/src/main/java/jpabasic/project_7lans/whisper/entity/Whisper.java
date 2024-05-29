package jpabasic.project_7lans.whisper.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Whisper {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private Relation relation;

    private String content;

    private LocalDateTime createDate = LocalDateTime.now();

    private boolean readStatus = false;

    public void changeReadStatusApprove(Member reader){
        if(!writer.equals(reader)) readStatus = true;
    }

    @Builder
    public Whisper(
            Member writer,
            String content
    ){
        this.writer = writer;
        this.content = content;
    }
}

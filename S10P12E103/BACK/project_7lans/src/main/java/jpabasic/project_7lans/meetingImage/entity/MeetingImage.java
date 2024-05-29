package jpabasic.project_7lans.meetingImage.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingImageId;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private MeetingSchedule meetingSchedule;

    private String meetingImagePath;

    @Builder
    public MeetingImage(
            String meetingImagePath
    ){
        this.meetingImagePath = meetingImagePath;
    }
}

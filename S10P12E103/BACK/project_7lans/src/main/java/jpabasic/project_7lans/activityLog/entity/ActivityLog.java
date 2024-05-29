package jpabasic.project_7lans.activityLog.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class ActivityLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @OneToOne(mappedBy = "activityLog", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private MeetingSchedule meetingSchedule;

    @Setter
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime realStartTime;

    @Setter
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime realEndTime;

    private String content = null;

    private Boolean writeStatus = false; // 작성 완료 여부
    private Boolean approveStatus = false; // 승인 완료 여부


    public void changeContent(String newContent){
        this.content = newContent;
    }

    public void changeTime(LocalDateTime realStartTime, LocalDateTime realEndTime){
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
    }

    public void changeMeetingSchedule(MeetingSchedule meetingSchedule){
        this.meetingSchedule = meetingSchedule;
    }

    // 작성 완료 여부 관련
    public void writeDone(){ this.writeStatus = true; }

    public void writeNotDone(){ this.writeStatus = false; }

    // 승인 완료 여부 관련
    public void approve(){
        this.approveStatus = true;
    }

    public void disApprove(){
        this.approveStatus = false;
    }

    @Builder
    public ActivityLog(
            LocalDateTime realStartTime,
            LocalDateTime realEndTime
    ){
        this.realStartTime = realStartTime;
        this.realEndTime = realEndTime;
    }
}

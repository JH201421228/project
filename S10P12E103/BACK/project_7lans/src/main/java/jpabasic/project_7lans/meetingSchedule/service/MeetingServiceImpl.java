package jpabasic.project_7lans.meetingSchedule.service;

import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;
import jpabasic.project_7lans.activityLog.repository.ActivityLogRepository;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.entity.ScheduleType;
import jpabasic.project_7lans.meetingSchedule.repository.MeetingScheduleRepository;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.repository.ChildRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService{

    private final MeetingScheduleRepository meetingRepository;
    private final RelationRepository relationRepository;
    private final ChildRepository childRepository;

    /*
    위에서부터 아래로 내려가는 방향 순서대로
    생성, 조회, 수정, 삭제의 코드가 있다.
    가장 아래는 현재 사용되지 않으면서 주석처리된 코드들이 있다.
     */

    // =================================================================================================================
    // =================================================================================================================
    // 생성

    // 화상 미팅 생성
    @Override
    @Transactional
    public void create(MeetingScheduleRequestDto.create meeting) {
        log.info("[MeetingServiceImpl.create] start...");
        // 관계 조회
        Relation relation = relationRepository.findById(meeting.getRelationId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.create] 해당 Id와 일치하는 relation이 존재하지 않습니다."));

        log.info("[MeetingServiceImpl.create] {}, {}", meeting.getScheduledStartTime(), meeting.getScheduledEndTime());
        // 활동 일지 생성
        ActivityLog activityLog = ActivityLog.builder()
                .realStartTime(meeting.getScheduledStartTime())
                .realEndTime(meeting.getScheduledEndTime())
                .build();

        // 미팅 스케줄을 생성한다.
        MeetingSchedule newMeeting = MeetingSchedule.builder()
                .startTime(meeting.getScheduledStartTime())
                .endTime(meeting.getScheduledEndTime())
                .activityLog(activityLog)
                .build();

        // 해당 미팅 스케줄의 활동일지로 설정.
        activityLog.changeMeetingSchedule(newMeeting);

        // 관계에 미팅 스케줄 추가.
        relation.addMeetingSchedule(newMeeting);

        // DB에 저장
        meetingRepository.save(newMeeting);
        log.info("[MeetingServiceImpl.create] SUCCESS!!!");
    }


    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 해당 관계의 해당 년도, 해당 년월 화상 미팅 정보들 조회
    @Override
    public List<MeetingScheduleResponseDto.monthList> findMeetingsByRelation(MeetingScheduleRequestDto.meetings meetingsDto){
        //관계 찾기
        Relation relation = relationRepository.findById(meetingsDto.getRelationId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.findMeetingsByRelation] 해당 Id와 일치하는 Relation 이 존재하지 않습니다."));

        //관계된 모든 일정 받기 -> 월을 먼저 걸러서 받는 방법?
        List<MeetingSchedule> totalMeeting = relation.getMeetingScheduleList();

        //response
        List<MeetingScheduleResponseDto.monthList> monthMeeting = new ArrayList<>();

        for(MeetingSchedule meeting : totalMeeting){
            if(meeting.getScheduledStartTime() != null &&
                    meeting.getScheduledEndTime() != null &&
                    meeting.getScheduledStartTime().getMonthValue() == meetingsDto.getMonth() &&
                    meeting.getScheduledStartTime().getYear() == meetingsDto.getYear()){
                monthMeeting.add(MeetingScheduleResponseDto.toMonthListDto(meeting));
            }
        }
        return monthMeeting;
    }

    // =================================================================================================================
    // 미팅 스케줄 Id를 바탕으로 미팅 Detail 조회
    public MeetingScheduleResponseDto.meetingDetailById meetingDetailById(Long meetingId){
        MeetingSchedule meetingSchedule = meetingRepository.findById(meetingId)
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.meetingDetailById] 해당 Id와 일치하는 Relation 이 존재하지 않습니다."));

        return MeetingScheduleResponseDto.toMeetingDetailByIdDto(meetingSchedule, meetingSchedule.getRelation());
    }

    // =================================================================================================================
    // 유저 Id를 바탕으로 현재 진행중인 미팅 조회
    // 문제) 아동은 여러 개의 관계를 맺을 수 있다. -> 현재 구현 상 봉사자가 아동 한 명과 동시에 같은 시간에 미팅을 열 수 있다. -> 우선 가장 첫 조회를 반환한다.
    public MeetingScheduleResponseDto.meetingOpenedByMember meetingOpenedByMember(Long childId){
        Child child = childRepository.findById(childId)
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.meetingOpenedByMember] 해당 Id와 일치하는 Child 가 존재하지 않습니다."));

        // 아이는 여러 개의 관계들을 가지고 있다.
        List<Relation> relationList = relationRepository.findByChild(child);

        // 해당 관계들 중 관계 각각에 대해
        for(Relation relation : relationList){
            // 화상 미팅 정보들을 하나씩 가져와서
            List<MeetingSchedule> meetingScheduleList = relation.getMeetingScheduleList();
            for(MeetingSchedule meetingSchedule : meetingScheduleList){
                // 현재 화상 미팅이 열려 있지 않으면 continue
                if(! meetingSchedule.getStatus().equals(ScheduleType.OPENED)) continue;

                // 화상 미팅이 열려있는 경우이므로 값을 반환한다.
                return MeetingScheduleResponseDto.toMeetingOpenedByMemberDto(meetingSchedule, relation);
            }
        }

        // 모든 반복문을 돌고 나서도 없으면 현재 열려있는 화상 미팅이 존재 하지 않으므로 null 을 반환한다.
        return null;
    }

    // =================================================================================================================
    //미팅 상태 확인(SCHEDULED)
    public boolean isScheduled(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.SCHEDULED);
    }

    // =================================================================================================================
    //미팅 상태 확인(OPENED)
    public boolean isOpened(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.OPENED);
    }

    // =================================================================================================================
    //미팅 상태 확인(CLOSED)
    public boolean isClosed(MeetingSchedule meetingSchedule){
        return meetingSchedule.getStatus().equals(ScheduleType.CLOSED);
    }

    // =================================================================================================================
    // =================================================================================================================
    // 수정

    // 화상 미팅 상태 OPEN 으로 설정
    @Override
    @Transactional
    public void openMeeting(MeetingScheduleRequestDto.openMeeting meetingDto) {
        MeetingSchedule meeting = meetingRepository.findById(meetingDto.getMeetingId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.openMeeting] 해당 Id와 일치하는 meetingId가 존재하지 않습니다."));

        meeting.getActivityLog().setRealStartTime(LocalDateTime.now());

        //미팅이 열림
        meeting.statusChangeToOpen();
    }

    // 화상 미팅 상태 CLOSED 으로 설정
    @Override
    @Transactional
    public void closeMeeting(MeetingScheduleRequestDto.closeMeeting meetingDto) {
        MeetingSchedule meeting = meetingRepository.findById(meetingDto.getMeetingId())
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.openMeeting] 해당 Id와 일치하는 meeting 이 존재하지 않습니다."));

        // 화상 채팅 종료로 인한 알 경험치 증가.
        meeting.getRelation().getEgg().increaseExpByMeeting();

        // 활동 일지 종료 시간 수정.
        meeting.getActivityLog().setRealEndTime(meetingDto.getEndTime());

        //미팅이 닫힘
        meeting.statusChangeToClosed();
    }

    // =================================================================================================================
    // =================================================================================================================
    // 삭제

    @Override
    @Transactional
    public void deleteMeeting(Long meetingId){
        MeetingSchedule meetingSchedule = meetingRepository.findById(meetingId)
                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.deleteMeeting] 해당 Id와 일치하는 meeting 이 존재하지 않습니다."));

        meetingSchedule.getRelation().deleteMeetingSchedule(meetingSchedule);

        meetingRepository.delete(meetingSchedule);
    }

    // =================================================================================================================
    // =================================================================================================================
    // 일단 주석 처리된 코드들

//    @Override
//    @Transactional
//    public Long saveImg(MeetingScheduleRequestDto.saveImg img) {
//        String uploadPath = "https://i10e103.p.ssafy.io/images/";
//
//        File folder = new File(uploadPath);
//
//        if(!folder.exists()){
//            try{
//                folder.mkdir();
//            }
//            catch(Exception e){
//                e.printStackTrace();
//            }
//        }
//
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//        String curDate = sdf.format(new Date());
//        String ftype = img.getFile().getContentType();
//
//        String newFileName = curDate + Long.toString(System.nanoTime());
//        if(ftype.equals("image/jpeg") || ftype.equals("image/jpg")){
//            newFileName += ".jpg";
//        }
//        else {
//            newFileName += ".png";
//        }
//
//        Path copyOfLocation = Paths.get(uploadPath + File.separator + newFileName);
//
//        MeetingSchedule meeting = meetingRepository.findById(img.getMeetingId())
//                .orElseThrow(()-> new IllegalArgumentException("[MeetingServiceImpl.saveImg] 해당 Id와 일치하는 meetingId가 존재하지 않습니다."));
//
//        try{
//            Files.copy(img.getFile().getInputStream(), copyOfLocation, StandardCopyOption.REPLACE_EXISTING);
//
//            MeetingImage image = MeetingImage.builder()
//                    .imgPath(copyOfLocation.toString())
//                    .serverFileName(newFileName)
//                    .originFileName(img.getFile().getOriginalFilename())
//                    .contentType(ftype)
//                    .fileSize(img.getFile().getSize())
//                    .build();
//            meeting.addMeetingImage(image);
//            return meetingImageRepository.save(image).getId();
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return null;
//        }
//
//    }

//    @Override
//    @Transactional
//    public void choiceImg(List<MeetingScheduleRequestDto.choiceImg> imgs) {
//           for(MeetingScheduleRequestDto.choiceImg imgDto : imgs){
//                meetingImageRepository.deleteById(imgDto.getImgId());
//           }
//    }
}

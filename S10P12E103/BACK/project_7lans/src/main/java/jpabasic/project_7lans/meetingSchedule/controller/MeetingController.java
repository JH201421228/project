package jpabasic.project_7lans.meetingSchedule.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleRequestDto;
import jpabasic.project_7lans.meetingSchedule.dto.MeetingScheduleResponseDto;
import jpabasic.project_7lans.meetingSchedule.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="화상 미팅 API", description = "화상 미팅 관련 API입니다.")
@RestController
@RequestMapping(value = "/meetingSchedue")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;

    /*
    위에서부터 아래로 내려가는 방향 순서대로
    생성, 조회, 수정, 삭제의 코드가 있다.
    가장 아래는 현재 사용되지 않으면서 주석처리된 코드들이 있다.
     */


    // =================================================================================================================
    // =================================================================================================================
    // 생성

    // 미팅 생성
    @Operation(summary = "화상미팅 예약하기")
    @PostMapping("/create")
    public ResponseEntity create(@RequestBody @Valid MeetingScheduleRequestDto.create newMeeting){
        try{
            meetingService.create(newMeeting);
            return new ResponseEntity<>(HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // =================================================================================================================
    // =================================================================================================================
    // 조회

    // 해당 년도, 해당 월 미팅 조회하기
    @Operation(summary = "해당하는 달의 화상미팅 일정 조회")
    @PostMapping("")
    public ResponseEntity<List<MeetingScheduleResponseDto.monthList>> monthList(@RequestBody @Valid MeetingScheduleRequestDto.meetings meetingsDto){
        try{
            List<MeetingScheduleResponseDto.monthList> meetingSchedule = meetingService.findMeetingsByRelation(meetingsDto);
            return new ResponseEntity<>(meetingSchedule, HttpStatus.OK);

        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // =================================================================================================================
    // 미팅 스케줄 Id를 바탕으로 미팅 Detail 조회
    @Operation(summary = "미팅 일정 상세 조회")
    @GetMapping("/{meetingId}")
    public ResponseEntity<MeetingScheduleResponseDto.meetingDetailById> meetingDetailById(@PathVariable @Valid Long meetingId){
        try{
            return new ResponseEntity<>(meetingService.meetingDetailById(meetingId) ,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // =================================================================================================================
    // 유저 Id를 바탕으로 현재 진행중인 미팅 조회(현재는 아동을 대상으로 한다.)
    @Operation(summary = "현재 진행중인 미팅 조회")
    @GetMapping("/open/{childId}")
    public ResponseEntity<MeetingScheduleResponseDto.meetingOpenedByMember> meetingOpenedByMember(@PathVariable @Valid Long childId){
        try{
            return new ResponseEntity<>(meetingService.meetingOpenedByMember(childId), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // =================================================================================================================
    // =================================================================================================================
    // 수정

    //화상 시작
    @Operation(summary = "화상 미팅 상태 OPEN으로 설정")
    @PutMapping("/open")
    public ResponseEntity openMeeting(@RequestBody @Valid MeetingScheduleRequestDto.openMeeting meetingDto){
        try{
            meetingService.openMeeting(meetingDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //화상 종료
    @Operation(summary = "화상 미팅 상태 CLOSE으로 설정")
    @PutMapping("/close")
    public ResponseEntity closeMeeting(@RequestBody @Valid MeetingScheduleRequestDto.closeMeeting meetingDto){
        try{
            meetingService.closeMeeting(meetingDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =================================================================================================================
    // =================================================================================================================
    // 삭제
    @Operation(description = "화상 미팅 취소")
    @DeleteMapping("/delete/{meetingId}")
    public ResponseEntity deleteMeeting(@PathVariable @Valid Long meetingId){
        try{
            meetingService.deleteMeeting(meetingId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =================================================================================================================
    // =================================================================================================================
    // 일단 주석 처리된 코드들


//    //해당 날짜 사진들 보기
//    @Operation(summary = "해낭 날짜 사진들 보기")
//    @GetMapping("/image/{meetingId}")
//    public ResponseEntity<?> imageList(@PathVariable("meetingId") Long meetingId){
//        try{
//            List<MeetingScheduleResponseDto.imgList> imgList = meetingService.getImgList(meetingId);
//
//            return new ResponseEntity<List<MeetingScheduleResponseDto.imgList>>(imgList, HttpStatus.OK);
//
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    //썸네일 수정하기
//    @Operation(summary = "지난(종료된) 화상미팅의 썸네일 사진 수정하기")
//    @GetMapping("/changethumbnail/{imgId}")
//    public ResponseEntity changeThumbnail(@PathVariable("imgId") Long imgId){
//        try{
//            meetingService.changeThumbnail(imgId);
//
//            return new ResponseEntity(HttpStatus.OK);
//
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    //사진 1장 저장(캡쳐하면 1차적으로 무조건 저장)
//    @Operation(summary = "캡쳐시 사진 1장 저장")
//    @PostMapping("/image/saveImg")
//    public ResponseEntity<Long> saveImg(@RequestBody @Valid MeetingScheduleRequestDto.saveImg img){
//        try{
//            return new ResponseEntity<>(meetingService.saveImg(img), HttpStatus.OK);
//
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    //화상 종료 시 마음에 안드는 사진들 선택 및 삭제하기
//    @Operation(summary = "화상 종료 시 마음에 안드는 사진들 선택 및 삭제하기")
//    @PostMapping("/image/choice")
//    public ResponseEntity choiceImg(@RequestBody @Valid List<MeetingScheduleRequestDto.choiceImg> imgs){
//        try{
//            meetingService.choiceImg(imgs);
//            return new ResponseEntity(HttpStatus.OK);
//        }
//        catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}

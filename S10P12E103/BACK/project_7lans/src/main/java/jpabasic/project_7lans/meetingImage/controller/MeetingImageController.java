package jpabasic.project_7lans.meetingImage.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageRequestDto;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageResponseDto;
import jpabasic.project_7lans.meetingImage.service.MeetingImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="화상 미팅 이미지 API", description = "화상 미팅 이미지 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("/meetingImage")
@RequiredArgsConstructor
public class MeetingImageController {

    private final MeetingImageService meetingImageService;

    // ================================================================================
    // ================================================================================
    // 생성

    //사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    @Operation(summary = "캡쳐시 선택한 사진 1장 저장")
    @PostMapping("/save")
    public ResponseEntity saveMeetingImage(@RequestBody @Valid MeetingImageRequestDto.saveMeetingImage saveReqDto){
        try{
            log.info("[MeetingImageController.saveMeetingImage] start... ");
            meetingImageService.saveMeetingImage(saveReqDto);
            log.info("[MeetingImageController.saveMeetingImage] SUCCESS!!! ");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            log.info("[MeetingImageController.saveMeetingImage] FAIL!!! ");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    @Operation(summary = "해낭 날짜 사진들 보기")
    @GetMapping("/{meetingId}")
    public ResponseEntity<List<MeetingImageResponseDto.imageList>> imageList(@PathVariable("meetingId") @Valid Long meetingId){
        try{
            log.info("[MeetingImageController.imageList] start... ");
            List<MeetingImageResponseDto.imageList> imgList = meetingImageService.imageList(meetingId);
            log.info("[MeetingImageController.imageList] SUCCESS!!! ");
            return new ResponseEntity(imgList, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            log.info("[MeetingImageController.imageList] FAIL!!! ");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================
    // 지난 랜덤 화상 미팅 사진
    @Operation(summary = "지난 랜덤 화상 미팅 사진")
    @GetMapping("/random/{memberId}")
    public ResponseEntity<List<MeetingImageResponseDto.randomMeetingImage>> randomMeetingImage(@PathVariable @Valid Long memberId){
        try{
            log.info("[MeetingImageController.randomMeetingImage] start... ");
            List<MeetingImageResponseDto.randomMeetingImage> randomImageList = meetingImageService.randomMeetingImage(memberId);
            log.info("[MeetingImageController.randomMeetingImage] SUCCESS!!! ");
            return new ResponseEntity(randomImageList,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            log.info("[MeetingImageController.randomMeetingImage] FAIL!!! ");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================
    // ================================================================================
    // 수정

    //썸네일 수정하기
    @Operation(summary = "지난(종료된) 화상미팅의 썸네일 사진 수정하기")
    @PutMapping("/changeThumbnailImage")
    public ResponseEntity changeThumbnail(@RequestBody @Valid MeetingImageRequestDto.changeThumbnailImage changeReqDto){
        try{
            log.info("[MeetingImageController.changeThumbnail] start... ");
            meetingImageService.changeThumbnail(changeReqDto);
            log.info("[MeetingImageController.changeThumbnail] SUCCESS!!! ");
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            log.info("[MeetingImageController.changeThumbnail] FAIL!!! ");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================
    // ================================================================================
    // 삭제


    // TODO 나중에 삭제 기능이 필요한 경우 수정할 것.
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


package jpabasic.project_7lans.activityLog.controller;



import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jpabasic.project_7lans.activityLog.dto.ActivityLogRequestDto;
import jpabasic.project_7lans.activityLog.dto.ActivityLogResponseDto;
import jpabasic.project_7lans.activityLog.service.ActivityLogServiceImpl;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="활동 일지 API", description = "활동 일지 관련 API입니다.")
@RestController
@RequestMapping(value = "/activityLog")
@RequiredArgsConstructor
@Slf4j
public class ActivityLogController {

    private final ActivityLogServiceImpl activityLogServiceImpl;

    // ==================================================================================================
    // 봉사자

    // 봉사자 활동 일지 조회 리스트
    // Req: relationId, 날짜 정보(년, 월, 일)
    // Res: activityLog id, 날짜 정보(년, 월, 일), 활동 일지 승인 여부
    @Operation(summary = "봉사자가 활동 일지 리스트 조회")
    @PostMapping(value = "/volunteer/list")
    public ResponseEntity<List<ActivityLogResponseDto.detailListByVolunteer>> detailListByVolunteer(@RequestBody @Valid ActivityLogRequestDto.detailListByVolunteer listReqDto) {
        log.info("[ActivityLogController.detailListByVolunteer] data input from FRONT relationId: {} dateInfo: {}", listReqDto.getRelationId(), listReqDto.getDateInfo());
        try{
            System.out.println("ActivityController : " + listReqDto.getRelationId());
            List<ActivityLogResponseDto.detailListByVolunteer> dtoResList = activityLogServiceImpl.detailListByVolunteer(listReqDto);
            log.info("[ActivityLogController.detailListByVolunteer] data output to FRONT size: {}", dtoResList.size());
            return new ResponseEntity<>(dtoResList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "봉사자가 활동 일지 1개 상세 조회")
    // 봉사자 활동 일지 상세 조회
    // Req: relationId, activityLogId
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @PostMapping(value = "/volunteer")
    public ResponseEntity<ActivityLogResponseDto.detailByVolunteer> detailByVolunteer(@RequestBody @Valid ActivityLogRequestDto.detailByVolunteer detailReqDto) {
        log.info("[ActivityLogController.detailByVolunteer] data input from FRONT relationId: {} activityLogId: {}", detailReqDto.getRelationId(), detailReqDto.getActivityLogId());
        try{
            ActivityLogResponseDto.detailByVolunteer detailResDto = activityLogServiceImpl.detailByVolunteer(detailReqDto);
            log.info("[ActivityLogController.detailByVolunteer] data output to FRONT");
            return new ResponseEntity<>(detailResDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 수정(작성 완료일 경우 수정 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Operation(summary = "봉사자가 활동 일지 수정")
    @PutMapping(value = "/volunteer/modify")
    public ResponseEntity modifyActivityLogByVolunteer(@RequestBody @Valid ActivityLogRequestDto.modifyByVolunteer modifyReqDto){
        log.info("[ActivityLogController.modifyActivityLogByVolunteer] data input from FRONT activityLog: {}", modifyReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.modifyActivityLogByVolunteer(modifyReqDto);
            log.info("[ActivityLogController.modifyActivityLogByVolunteer] modify is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 봉사자 활동 일지 작성 완료(작성 완료 후 동작 불가)
    // Req: Relation id, activityLog id, content
    // Res: 없음
    @Operation(summary = "봉사자가 활동 일지 작성 완료")
    @PutMapping(value = "/volunteer/writeDone")
    public ResponseEntity writeDoneActivityLogByVolunteer(@RequestBody @Valid ActivityLogRequestDto.writeDoneByVolunteer writeDoneReqDto){
        log.info("[ActivityLogController.writeDoneActivityLogByVolunteer] activityLog: {}", writeDoneReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.writeDoneActivityLogByVolunteer(writeDoneReqDto);
            log.info("[ActivityLogController.writeDoneActivityLogByVolunteer] modify is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // ==================================================================================================
    // 관리자

    // 관리자 활동 일지 리스트 조회(승인 안된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Operation(summary = "관리자가 승인되지 않은 활동 리스트 조회")
    @GetMapping(value = "/manager/disapprovedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listDisapprovedByManager>> listDisapprovedByManager (@PathVariable @Valid Long centerId) {
        log.info("[ActivityLogController.listDisapprovedByManager] data input centerId: {}", centerId);
        ActivityLogRequestDto.listDisapprovedByManager reqDto = ActivityLogRequestDto.listDisapprovedByManager.builder()
                .centerId(centerId)
                .build();
        try{
            List<ActivityLogResponseDto.listDisapprovedByManager> resList = activityLogServiceImpl.listDisapprovedByManager(reqDto);
            log.info("[ActivityLogController.listDisapprovedByManager] list is done size: {}", resList.size());
            return new ResponseEntity<>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 리스트 조회(승인된)
    // Req: Center Id
    // Res: activityLog id, 제목, 봉사자 명, 아동 명, 날짜(년, 월, 일)
    @Operation(summary = "관리자가 승인된 활동 리스트 조회")
    @GetMapping(value = "/manager/approvedList/{centerId}")
    public ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>> listApprovedByManager (@PathVariable @Valid Long centerId) {
        log.info("[ActivityLogController.listApprovedByManager] centerId: {}", centerId);
        ActivityLogRequestDto.listApprovedByManager reqDto = ActivityLogRequestDto.listApprovedByManager.builder()
                .centerId(centerId)
                .build();

        try {
            List<ActivityLogResponseDto.listApprovedByManager> resList = activityLogServiceImpl.listApprovedByManager(reqDto);
            log.info("[ActivityLogController.listApprovedByManager] list size: {}", resList.size());
            return new ResponseEntity<List<ActivityLogResponseDto.listApprovedByManager>>(resList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 관리자 활동 일지 상세 조회
    // Req: Relation Id, activityLog Id
    // Res: activityLog id, 활동 일지 날짜(년, 월, 일), 활동 시간, 활동 기관, 봉사자 명, 활동 내용, 작성 완료 여부, 승인 여부
    @Operation(summary = "관리자 활동 일지 상세 조회")
    @PostMapping(value = "/manager/detail")
    public ResponseEntity<ActivityLogResponseDto.detailByManager> detailByManager (@RequestBody @Valid ActivityLogRequestDto.detailByManager reqDto) {
        log.info("[ActivityLogController.detailByManager] output activityLogId: {}", reqDto.getActivityLogId());
        try {
            ActivityLogResponseDto.detailByManager resDto = activityLogServiceImpl.detailByManager(reqDto);
            log.info("[ActivityLogController.detailByManager] output activityLogId: {}", resDto.getActivityLogId());
            return new ResponseEntity<>(resDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자가 특정 활동 일지 승인
    //승인
    @Operation(summary = "관리자가 특정 활동 일지 승인")
    @PostMapping(value = "/manager/approve")
    public ResponseEntity approveByManager (@RequestBody @Valid ActivityLogRequestDto.approveByManager approveReqDto) {
        log.info("[ActivityLogController.approveByManager] input activityLogId: {}", approveReqDto.getActivityLogId());
        try{
            activityLogServiceImpl.approveByManager(approveReqDto);
            log.info("[ActivityLogController.approveByManager] approve is done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 화상채팅 시작시 활동 일지 시작 시간 입력(아이가 세션 입장)
    @Operation(summary = "활동 일지 시작 시간 입력(아동 세션 입장)")
    @PostMapping(value = "/startTime")
    public ResponseEntity setStartTime (@RequestBody @Valid ActivityLogRequestDto.startTime startTime) {
        log.info("[ActivityLogController.setStartTime] relationId: {}, time: {}", startTime.getMeetingId(), startTime.getStartTime());
        try{
            activityLogServiceImpl.setStartTime(startTime);
            log.info("[ActivityLogController.setStartTime] set start time done");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 화상채팅 종료시 활동 일지 종료 시간 입력(세션 종료) -> MeetingServiceImpl(화상 미팅 세션 CLOSE)로 이동
}

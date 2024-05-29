package jpabasic.project_7lans.dinosaur.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.dinosaur.dto.EggRequestDto;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.dinosaur.service.EggService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="공룡 알 API", description = "공룡 관련 API입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/egg")
public class EggController {

    private final EggService eggService;

    // 친구 관계 알 정보 가져오기.
    @Operation(summary = "친구 관계에 있는 알 정보")
    @GetMapping("/{id}")
    public ResponseEntity<EggResponseDto.detail> getMyEgg(@PathVariable @Valid Long id) {
        log.info("start EggController.getMyEgg...");
        try{
            EggResponseDto.detail dto = eggService.getMyEgg(id);
            log.info("EggController.getMyEgg SUCCESS!!!");
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            log.info("EggController.getMyEgg FAIL!!!");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 화상 채팅 종료시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    @Operation(summary = "알 화상채팅으로 인한 경험치 증가")
    @PutMapping("/meeting/experience")
    public ResponseEntity addMeetingExperienceEgg(@RequestBody @Valid EggRequestDto.addMeetingExperienceEgg eggMeetingExpReqDto){
        log.info("start EggController.addMeetingExperienceEgg...");
        try{
            eggService.addMeetingExperienceEgg(eggMeetingExpReqDto);
            log.info("EggController.addMeetingExperienceEgg SUCCESS!!!");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            log.info("EggController.addMeetingExperienceEgg FAIL!!!");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 속닥속닥 사용 시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    @Operation(summary = "알 속닥속닥으로 인한 경험치 증가")
    @PutMapping("/whisper/experience")
    public ResponseEntity addWhisperExperienceEgg(@RequestBody @Valid EggRequestDto.addWhisperExperienceEgg eggWhisperExpReqDto){
        log.info("start EggController.addWhisperExperienceEgg...");
        try{
            eggService.addWhisperExperienceEgg(eggWhisperExpReqDto);
            log.info("EggController.addWhisperExperienceEgg SUCCESS!!!");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            log.info("EggController.addWhisperExperienceEgg FAIL!!!");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

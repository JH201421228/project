package jpabasic.project_7lans.relation.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.relation.dto.RelationRequestDto;
import jpabasic.project_7lans.relation.dto.RelationResponseDto;
import jpabasic.project_7lans.relation.service.RelationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="관계 API", description = "관계 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping(value = "/relation")
@RequiredArgsConstructor
public class RelationController {

    private final RelationService relationService;

    @Operation(summary = "관리자가 아동과 봉사자 친구 맺어주기")
    @PostMapping("/create")
    public ResponseEntity<RelationResponseDto.info> createRelation(@RequestBody @Valid RelationRequestDto.create requestDto) {
        try{
            log.info("[RelationController.createRelation] create Relation start...");
            RelationResponseDto.info createResDto = relationService.createRelation(requestDto);
            log.info("[RelationController.createRelation] create Relation SUCCESS!!!");
            return new ResponseEntity(createResDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            log.info("[RelationController.createRelation] create Relation FAIL!!!");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "관리자가 아동과 봉사자 사이의 친구 끊기")
    @PostMapping("/delete")
    public ResponseEntity deleteRelation(@RequestBody @Valid RelationRequestDto.delete deleteReqDto) {
        try{
            log.info("[RelationController.deleteRelation] delete Relation start...");
            relationService.deleteRelation(deleteReqDto);
            log.info("[RelationController.deleteRelation] delete Relation SUCCESS!!!");
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            log.info("[RelationController.deleteRelation] delete Relation FAIL!!!");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

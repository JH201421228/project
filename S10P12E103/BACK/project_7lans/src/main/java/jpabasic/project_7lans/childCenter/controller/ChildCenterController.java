package jpabasic.project_7lans.childCenter.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.childCenter.dto.ChildCenterRequestDto;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.childCenter.service.ChildCenterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name="아동 센터 API", description = "아동 센터 관련 API입니다.")
@Slf4j
@RestController
@RequestMapping("childCenter")
@RequiredArgsConstructor
public class ChildCenterController {

    public final ChildCenterService childCenterService;
    // =======================================================================================
    //센터 리스트 출력
    @Operation(summary = "회원가입시 센터 목록 출력")
    @GetMapping("/list")
    public ResponseEntity<List<ChildCenterResponseDto.list>> centerList(){
        try{
            List<ChildCenterResponseDto.list> centerList = childCenterService.list();
            return new ResponseEntity<>(centerList, HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // =======================================================================================
    // 센터 등록
    @Operation(summary = "센터 등록")
    @PostMapping("/register")
    public ResponseEntity centerRegister(@RequestBody @Valid ChildCenterRequestDto.centerDto centerDto){
        try{
            childCenterService.centerRegister(centerDto);
            log.info("[MemberController.centerRegister] finish register center");
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

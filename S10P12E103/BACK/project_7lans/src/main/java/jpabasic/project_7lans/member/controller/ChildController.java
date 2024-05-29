package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.member.dto.child.ChildRequestDto;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="아동 API", description = "아동 관련 API입니다.")
@RestController
@RequestMapping(value = "/child")
@RequiredArgsConstructor
public class ChildController {

    private final ChildService childService;

    // ================================================================================================================
    // ================================================================================================================
    // 조회
    // 아동 상세보기
    @Operation(summary = "특정 아동 상세 조회")
    @GetMapping("/{childId}")
    public ResponseEntity<ChildResponseDto.detail> childDetail(@PathVariable("childId") @Valid Long childId){
        try{

            ChildResponseDto.detail child = childService.childDetail(childId);
            return new ResponseEntity<>(child, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 봉사자의 아동 리스트 반환
    @Operation(summary = "봉사자의 아동 리스트 반환")
    @GetMapping("/listByVolunteer/{volunteerId}")
    public ResponseEntity<List<ChildResponseDto.listByVolunteer>> listByVolunteer(@PathVariable("volunteerId") @Valid Long volunteerId){
        try{
            List<ChildResponseDto.listByVolunteer> children = childService.listByVolunteer(volunteerId);
            return new ResponseEntity<>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 해당 센터의 아동 리스트
    @Operation(summary = "해당 센터의 아동 리스트")
    @GetMapping("/listByCenter/{centerId}")
    public ResponseEntity<List<ChildResponseDto.listByCenter>> listByCenter(@PathVariable("centerId") @Valid Long centerId){
        try{
            List<ChildResponseDto.listByCenter> children = childService.listByCenter(centerId);
            System.out.println(children.size());
            return new ResponseEntity<>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 관리자가 센터 관리화면에서 선택한 봉사자와 친구 추가가 되어 있지 않은 아동 리스트
    @Operation(summary = "우리 센터의 봉사자와 친구 추가하지 않은 아동 리스트")
    @PostMapping("/centerAndVolunteerNoRelation")
    public ResponseEntity<List<ChildResponseDto.childListByVolunteerAndCenter>> childListByVolunteerAndCenter(@RequestBody @Valid ChildRequestDto.childListByVolunteerAndCenter childReqDto){
        try{
            List<ChildResponseDto.childListByVolunteerAndCenter> children = childService.childListByVolunteerAndCenter(childReqDto);
            return new ResponseEntity<>(children, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 수정

    // 아동의 특이사항 작성하기
    @Operation(summary = "해당 센터의 아동의 특이사항 작성하기")
    @PostMapping("/content")
    public ResponseEntity writeContent(@RequestBody @Valid ChildRequestDto.childWithContent childWithContent){
        try{

            childService.modifyContent(childWithContent);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

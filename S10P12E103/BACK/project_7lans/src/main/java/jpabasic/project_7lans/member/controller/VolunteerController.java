package jpabasic.project_7lans.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerRequestDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="봉사자 API", description = "봉사자 관련 API입니다.")
@RestController
@RequestMapping(value = "/volunteer")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    //봉사자 상세보기
    @Operation(summary = "선택한 봉사자 정보 상세 보기")
    @GetMapping("/{volunteerId}")
    public ResponseEntity<VolunteerResponseDto.detail> volunteerDetail(@PathVariable("volunteerId") @Valid Long volunteerId){
        try{
            VolunteerResponseDto.detail volunteer = volunteerService.volunteerDetail(volunteerId);
            return new ResponseEntity(volunteer, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 봉사 시간 조회
    @Operation(summary = "봉사자의 나의 봉사 시간 출력")
    @GetMapping("/time/{volunteerId}")
    public ResponseEntity<VolunteerResponseDto.timeDto> volunteerTime(@PathVariable("volunteerId") @Valid Long volunteerId){
        try{

            Integer volunteerTime = volunteerService.getVolunteerTime(volunteerId);
            VolunteerResponseDto.timeDto timeDto =
                    VolunteerResponseDto.timeDto.builder().volunteerTime(volunteerTime).build();
            return new ResponseEntity(timeDto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 봉사자 전체 조회
    @Operation(summary = "봉사자 전체 조회")
    @GetMapping("/list")
    public ResponseEntity<VolunteerResponseDto.list> volunteerList(){
        try{
            List<VolunteerResponseDto.list> list = volunteerService.volunteerList();
            return new ResponseEntity(list, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 봉사자 이름으로 봉사자 리스트 조회(관리자용)
    @Operation(summary = "봉사자 이름으로 봉사자 리스트 조회")
    @PostMapping("/searchByName")
    public ResponseEntity<List<VolunteerResponseDto.volunteerSearchByName>> volunteerSearchByName(@RequestBody @Valid VolunteerRequestDto.volunteerSearchByName reqDto){
        try{
            List<VolunteerResponseDto.volunteerSearchByName> volunteers = volunteerService.volunteerSearchByName(reqDto);
            return new ResponseEntity<>(volunteers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 아동의 봉사자 리스트
    @Operation(summary = "아동이 나의 봉사자 리스트 조회")
    @GetMapping("/listByChild/{childId}")
    public ResponseEntity<List<VolunteerResponseDto.listByChild>> listByChild(@PathVariable("childId") @Valid Long childId){
        try{
            List<VolunteerResponseDto.listByChild> volunteers = volunteerService.listByChild(childId);
            return new ResponseEntity(volunteers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ================================================================================================================
    // 센터의 봉사자 리스트
    @Operation(summary = "해당 센터의 아동과 친구추가 되어 있는 봉사자 리스트")
    @GetMapping("/listByCenter/{centerId}")
    public ResponseEntity<List<VolunteerResponseDto.listByCenter>> listByCenter(@PathVariable("centerId") @Valid Long centerId){
        try{
            List<VolunteerResponseDto.listByCenter> volunteers = volunteerService.listByCenter(centerId);
            return new ResponseEntity(volunteers, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package jpabasic.project_7lans.dinosaur.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.dinosaur.dto.DinosaurRequestDto;
import jpabasic.project_7lans.dinosaur.dto.DinosaurResponseDto;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.dinosaur.service.DinosaurService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="공룡 도감 API", description = "공룡 도감 관련 API입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping
public class DinosaurController {

    private final DinosaurService dinosaurService;

    // TODO URL 및 PathVariable 추후 수정
    @GetMapping("/dinosaurs/{id}")
    @Operation(summary = "유저가 가지고 있는 모든 공룡 리스트")
    public ResponseEntity<DinosaurResponseDto.list> getAllDinosaursForMember(@PathVariable @Valid Long id) {
        return ResponseEntity.ok(dinosaurService.getAllDinosaursForMember(id));
    }

    @Operation(summary = "공룡 부화")
    @PostMapping("/dinosaurs/hatch")
    public ResponseEntity<DinosaurResponseDto.hatch> acquireDinosaur(@RequestBody @Valid DinosaurRequestDto.acquire requestDto) {
        try {
            return new ResponseEntity<>(dinosaurService.acquireDinosaur(requestDto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "유저의 대표 공룡 변경")
    @PutMapping("/dinosaurs/change")
    public ResponseEntity changeMyDinosaur(@RequestBody @Valid DinosaurRequestDto.change requestDto) {
        try{
            dinosaurService.changeMyDinosaur(requestDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "유저(아동, 봉사자)의 대표 공룡 조회")
    @GetMapping("/dinosaurs/myDinosaur/{memberId}")
    public ResponseEntity<DinosaurResponseDto.detail> myDinosaur(@PathVariable @Valid Long memberId) {
        try {
            DinosaurRequestDto.detail detailReqDto = DinosaurRequestDto.detail.builder()
                    .memberId(memberId)
                    .build();
            DinosaurResponseDto.detail detailResDto = dinosaurService.getMyDinosaurDetail(detailReqDto);
            return new ResponseEntity<>(detailResDto, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

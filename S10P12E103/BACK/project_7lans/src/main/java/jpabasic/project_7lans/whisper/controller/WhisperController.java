package jpabasic.project_7lans.whisper.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jpabasic.project_7lans.whisper.dto.WhisperRequestDto;
import jpabasic.project_7lans.whisper.dto.WhisperResponseDto;
import jpabasic.project_7lans.whisper.service.WhisperServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 속닥속닥 관련 컨트롤러

@Tag(name="속닥속닥 API", description = "속닥속닥 관련 API입니다.")
@RestController
@RequiredArgsConstructor
public class WhisperController {
    private final WhisperServiceImpl whisperServiceImpl;

    @Operation(summary = "속닥속닥 작성하기")
    // 속닥속닥 1건 작성(작성자 id, 상대방과의 관계 id, 작성 내용 content 받는다.)
    @PostMapping(path = "/whisper")
    public ResponseEntity createWhisper(@RequestBody @Valid WhisperRequestDto.create whisperCreateDto){
        try{
            whisperServiceImpl.createWhisper(whisperCreateDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "속닥속닥 1건 조회하기")
    // 속닥속닥 1건 조회 (관계 Id, 해당 속닥속닥 Id 필요)
    @GetMapping(path = "/whisper/{whisperId}")
    public ResponseEntity<WhisperResponseDto.detail> whisperDetail(@PathVariable @Valid Long whisperId){
        try{
            WhisperResponseDto.detail whisperDTo = whisperServiceImpl.whisperDetail(WhisperRequestDto.detailById.builder()
                    .whisperId(whisperId)
                    .build());
            return new ResponseEntity<WhisperResponseDto.detail>(whisperDTo,HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 나와 상대방의 관계의 속닥속닥 리스트 전체 조회 (관계 Id로 조회)
    @Operation(summary = "아동과 봉사자의 속닥속닥 전체 리스트")
    @GetMapping(path = "/whisper/list/{relationId}")
    public ResponseEntity<List<WhisperResponseDto.detail>> whisperList(@PathVariable @Valid Long relationId){
        try{
            List<WhisperResponseDto.detail> whisperList = whisperServiceImpl.whisperList(WhisperRequestDto.listById.builder()
                    .relationId(relationId).build());
            return new ResponseEntity<List<WhisperResponseDto.detail>>(whisperList,HttpStatus.OK);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 나와 상대방의 관계에서 내가 읽지 않은 속닥속닥 리스트 전체 조회 (관계 Id 필요)
    @Operation(summary = "아동과 봉사자의 읽지않은 속닥속닥 전체 리스트")
    @GetMapping(path = "/whisper/unreadList/{relationId}")
    public ResponseEntity<List<WhisperResponseDto.detail>> whisperUnreadList(@PathVariable @Valid Long relationId){
        try{
            List<WhisperResponseDto.detail> whisperList = whisperServiceImpl.whisperListUnread(WhisperRequestDto.listById.builder().relationId(relationId).build());
            return new ResponseEntity<List<WhisperResponseDto.detail>>(whisperList,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

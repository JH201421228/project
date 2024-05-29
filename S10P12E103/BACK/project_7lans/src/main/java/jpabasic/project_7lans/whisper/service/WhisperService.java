package jpabasic.project_7lans.whisper.service;

import jpabasic.project_7lans.whisper.dto.WhisperRequestDto;
import jpabasic.project_7lans.whisper.dto.WhisperResponseDto;

import java.util.List;

public interface WhisperService {
    // 생성
    // 속닥속닥 하나 작성. (작성자 Id, 상대방과의 관계 Id, 작성 내용 데이터 필요)
    public void createWhisper(WhisperRequestDto.create whisperCreateDto);

    // 조회
    // 나와 상대방의 관계의 속닥속닥 리스트 전체 조회 (관계 Id로 조회)
    public List<WhisperResponseDto.detail> whisperList(WhisperRequestDto.listById whisperListDto);

    // 나와 상대방의 관계에서 내가 읽지 않은 속닥속닥 리스트 전체 조회 (관계 Id 필요)
    public List<WhisperResponseDto.detail> whisperListUnread(WhisperRequestDto.listById whisperListDto);

    // 속닥속닥 한 건 조회. (관계 Id, 해당 속닥속닥 Id 필요)
    public WhisperResponseDto.detail whisperDetail(WhisperRequestDto.detailById whisperDetailDto);
}

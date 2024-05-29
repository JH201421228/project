package jpabasic.project_7lans.meetingImage.service;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageRequestDto;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface MeetingImageService {
    // ================================================================================
    // ================================================================================
    // 생성

    //사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    public void saveMeetingImage(@RequestBody @Valid MeetingImageRequestDto.saveMeetingImage saveReqDto);

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    public List<MeetingImageResponseDto.imageList> imageList(Long meetingId);

    // ================================================================================
    // 지난 랜덤 화상 미팅 사진
    public List<MeetingImageResponseDto.randomMeetingImage> randomMeetingImage(Long memberId);

    // ================================================================================
    // ================================================================================
    // 수정

    //썸네일 수정하기
    public void changeThumbnail(MeetingImageRequestDto.changeThumbnailImage changeReqDto);
}

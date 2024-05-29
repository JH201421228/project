package jpabasic.project_7lans.meetingImage.service;

import jakarta.validation.Valid;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageRequestDto;
import jpabasic.project_7lans.meetingImage.dto.MeetingImageResponseDto;
import jpabasic.project_7lans.meetingImage.entity.MeetingImage;
import jpabasic.project_7lans.meetingImage.repository.MeetingImageRepository;
import jpabasic.project_7lans.meetingSchedule.entity.MeetingSchedule;
import jpabasic.project_7lans.meetingSchedule.repository.MeetingScheduleRepository;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Member;
import jpabasic.project_7lans.member.entity.MemberType;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.member.repository.VolunteerRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MeetingImageServiceImpl implements MeetingImageService{

    private final MeetingScheduleRepository meetingScheduleRepository;
    private final MeetingImageRepository meetingImageRepository;
    private final VolunteerRepository volunteerRepository;
    private final RelationRepository relationRepository;
    private final MemberRepository memberRepository;

    // ================================================================================
    // ================================================================================
    // 생성

    //사진 1장 저장(캡쳐하면 선택해서 무조건 저장)
    @Transactional
    public void saveMeetingImage(@RequestBody @Valid MeetingImageRequestDto.saveMeetingImage saveReqDto){
        log.info("[MeetingImageServiceImpl.saveMeetingImage] start... ");

        //미팅 스케줄 찾기
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(saveReqDto.getMeetingId())
                        .orElseThrow(()-> new IllegalArgumentException("no such meetingSchedule. meetingId:"+saveReqDto.getMeetingId()));

        // 미팅 이미지 생성
        MeetingImage meetingImage = MeetingImage.builder()
                .meetingImagePath(saveReqDto.getMeetingImagePath())
                .build();

        // 미팅 스케줄에 미팅 이미지 추가
        meetingSchedule.addMeetingImage(meetingImage);

        // 미팅 이미지 저장
        meetingImageRepository.save(meetingImage);
        log.info("[MeetingImageServiceImpl.saveMeetingImage] SUCCESS!!! ");
    }

    // ================================================================================
    // ================================================================================
    // 조회

    // 선택한 날짜 날짜 사진들 보기
    public List<MeetingImageResponseDto.imageList> imageList(Long meetingId){
        log.info("[MeetingImageServiceImpl.imageList] start... ");
        // 미팅 스케줄 찾기
        MeetingSchedule meetingSchedule = meetingScheduleRepository.findById(meetingId)
                .orElseThrow(()-> new IllegalArgumentException("no such meetingSchedule. meetingId:"+meetingId));

        // 해당 미팅 스케줄의 이미지 리스트 가져오기
        List<MeetingImage> meetingImageList = meetingSchedule.getMeetingImageList();

        // 반환하기 위한 DTO 리스트 생성
        List<MeetingImageResponseDto.imageList> imageDtoList = new ArrayList<>();

        // Entity 를 DTO 로 변환 및 DTO 리스트에 추가
        for(MeetingImage meetingImage: meetingImageList){
            imageDtoList.add(MeetingImageResponseDto.imageList.toImageListDto(meetingImage));
        }

        // DTO 리스트 반환
        log.info("[MeetingImageServiceImpl.imageList] SUCCESS!!! ");
        return imageDtoList;
    }

    // ================================================================================
    // 지난 랜덤 화상 미팅 사진
    @Override
    public List<MeetingImageResponseDto.randomMeetingImage> randomMeetingImage(Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()-> new IllegalArgumentException("no such member. memberId: "+ memberId));

        List<Relation> relationList;
        if(member.getMemberType().equals(MemberType.CHILD)){
            relationList = relationRepository.findByChild((Child) member);
        }else{
            relationList = relationRepository.findByVolunteer((Volunteer) member);
        }

        List<MeetingImageResponseDto.randomMeetingImage> randomImages = new ArrayList<>();

        List<MeetingImage> meetingImageList = new ArrayList<>();
        int relationSize = relationList.size();
        for(int i=0; i<relationSize; i++){
            List<MeetingSchedule> meetingScheduleList = relationList.get(i).getMeetingScheduleList();

            int meetingScheduleSize = meetingScheduleList.size();
            for(int j=0; j<meetingScheduleSize; j++){
                meetingImageList.addAll(meetingScheduleList.get(j).getMeetingImageList());
            }
        }


        int size = meetingImageList.size();
        if(20 < size){
            Map<Integer, MeetingImage> map = new HashMap<>();

            int index = 0;
            while(index < 20){
                Integer num = new Random().nextInt(size);

                if(map.containsKey(num)) continue;

                MeetingImage meetingImage = meetingImageList.get(num);
                map.put(num, meetingImage);
                randomImages.add(MeetingImageResponseDto.toRandomMeetingImageDto(meetingImage));
                index++;
            }
        }else if(0 < size){
            for(MeetingImage meetingImage: meetingImageList){
                randomImages.add(MeetingImageResponseDto.toRandomMeetingImageDto(meetingImage));
            }
        }

        return randomImages;
    }

    // ================================================================================
    // ================================================================================
    // 수정

    //썸네일 수정하기
    @Transactional
    public void changeThumbnail(MeetingImageRequestDto.changeThumbnailImage changeReqDto){
        log.info("[MeetingImageServiceImpl.changeThumbnail] start... ");

        MeetingImage meetingImage = meetingImageRepository.findById(changeReqDto.getMeetingImageId())
                        .orElseThrow(()-> new IllegalArgumentException("no such meetingImage. meetingImageId:"+changeReqDto.getMeetingImageId()));

        MeetingSchedule meetingSchedule = meetingImage.getMeetingSchedule();

        meetingSchedule.changeThumbnail(meetingImage.getMeetingImagePath());

        log.info("[MeetingImageServiceImpl.changeThumbnail] SUCCESS!!! ");
    }

    // ================================================================================
    // ================================================================================
    // 삭제
}

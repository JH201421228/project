package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.EggRequestDto;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.dinosaur.entity.Egg;
import jpabasic.project_7lans.dinosaur.repository.EggRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class EggServiceImpl implements EggService{

    public final EggRepository eggRepository;
    public final RelationRepository relationRepository;

    // 알 정보 얻기
    @Override
    public EggResponseDto.detail getMyEgg(Long relationId) {
        Egg egg = relationRepository.findById(relationId)
                .orElseThrow(()-> new IllegalArgumentException("[EggServiceImpl.getMyEgg] no such relation")).getEgg();
        return EggResponseDto.detail.toDto(egg);
    }

    // 화상 채팅 종료시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    @Override
    public void addMeetingExperienceEgg(EggRequestDto.addMeetingExperienceEgg eggMeetingExpReqDto) {
        Relation relation = relationRepository.findById(eggMeetingExpReqDto.getRelationId())
                .orElseThrow(() -> new IllegalArgumentException("[EggServiceImpl.addMeetingExperienceEgg] no such relation"));

        // 화상채팅으로인한 알 경험치 증가.
        relation.getEgg().increaseExpByMeeting();
    }

    // 속닥속닥 사용 시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    @Override
    public void addWhisperExperienceEgg(EggRequestDto.addWhisperExperienceEgg eggWhisperExpReqDto) {
        Relation relation = relationRepository.findById(eggWhisperExpReqDto.getRelationId())
                .orElseThrow(() -> new IllegalArgumentException("[EggServiceImpl.addWhisperExperienceEgg] no such relation"));

        // 속닥속닥으로인한 알 경험치 증가.
        relation.getEgg().increaseExpByWritingWhisper();
    }
}

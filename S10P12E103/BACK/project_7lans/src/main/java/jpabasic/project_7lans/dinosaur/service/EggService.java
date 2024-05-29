package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.EggRequestDto;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.dinosaur.entity.Egg;

import java.util.List;

public interface EggService {

//    public List<Egg> findAllEgg(Relation relation);
//
//    //egg open 후 새로운 egg 생성
//    public Egg openEgg(Egg curEgg);
//
//    //openable
//    public void changeEggOpenable(Egg egg);

    // 알 정보 얻기
    public EggResponseDto.detail getMyEgg(Long eggId);

    // 화상 채팅 종료시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    public void addMeetingExperienceEgg(EggRequestDto.addMeetingExperienceEgg eggMeetingExpReqDto);

    // 속닥속닥 사용 시 알 경험치 증가
    // Req: relationId을 포함한 DTO
    // Res: 없음
    public void addWhisperExperienceEgg(EggRequestDto.addWhisperExperienceEgg eggWhisperExpReqDto);
}

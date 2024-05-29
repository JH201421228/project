package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.DinosaurRequestDto;
import jpabasic.project_7lans.dinosaur.dto.DinosaurResponseDto;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;

public interface DinosaurService {

    // TODO 인자 DTO로 받기
    public DinosaurResponseDto.list getAllDinosaursForMember(Long memberId);

    public DinosaurResponseDto.detail getMyDinosaurDetail(DinosaurRequestDto.detail detailReqDto);

    public DinosaurResponseDto.hatch acquireDinosaur(DinosaurRequestDto.acquire requestDto);
    public void changeMyDinosaur(DinosaurRequestDto.change requestDto);

}

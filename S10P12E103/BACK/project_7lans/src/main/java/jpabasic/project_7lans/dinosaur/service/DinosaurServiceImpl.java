package jpabasic.project_7lans.dinosaur.service;

import jpabasic.project_7lans.dinosaur.dto.DinosaurRequestDto;
import jpabasic.project_7lans.dinosaur.dto.DinosaurResponseDto;
import jpabasic.project_7lans.dinosaur.entity.Dinosaur;
import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import jpabasic.project_7lans.dinosaur.entity.DinosaurCollection;
import jpabasic.project_7lans.dinosaur.entity.Egg;
import jpabasic.project_7lans.dinosaur.repository.DinosaurRepository;
import jpabasic.project_7lans.dinosaur.repository.EggRepository;
import jpabasic.project_7lans.dinosaur.dto.EggResponseDto;
import jpabasic.project_7lans.member.entity.Member;
import jpabasic.project_7lans.member.repository.MemberRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class DinosaurServiceImpl implements DinosaurService {

    private final DinosaurRepository dinosaurRepository;
    private final MemberRepository memberRepository;
    private final RelationRepository relationRepository;
    private final EggRepository eggRepository;


    @Override
    public DinosaurResponseDto.list getAllDinosaursForMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("[DinosaurServiceImpl.getAllDinosaursForMember] 해당 멤버 ID 일치하는 멤버가 존재하지 않습니다."));

        Dinosaur myDinosaur = member.getDinosaurBook().getMyDinosaur();

        List<DinosaurCollection> dinosaurCollection = member.getDinosaurBook().getDinosaurCollection();
        List<Dinosaur> allDinosaurs = dinosaurRepository.findAll();

        DinosaurResponseDto.list response = DinosaurResponseDto.list.builder()
                .myDinosaur(DinosaurResponseDto.detail.toDto(myDinosaur))
                .build();

        for (Dinosaur dinosaur : allDinosaurs) {
            // TODO 우선 O(N^2)으로 만들어 놓음
            boolean isOwned = dinosaurCollection
                    .stream()
                    .anyMatch(collection -> collection.getDinosaur().getId().equals(dinosaur.getId()));

            response.getDinosaurs().add(DinosaurResponseDto.detail.toDto(dinosaur, isOwned));
        }

        return response;
    }

    // 유저(아동, 봉사자) 자신의 대표 공룡 정보 조회.
    @Override
    public DinosaurResponseDto.detail getMyDinosaurDetail(DinosaurRequestDto.detail detailReqDto) {
        Member member = memberRepository.findById(detailReqDto.getMemberId())
                .orElseThrow(()->new IllegalArgumentException(""));

        Dinosaur dinosuar = member.getDinosaurBook().getMyDinosaur();

        return DinosaurResponseDto.detail.toDto(dinosuar);
    }

    @Transactional
    @Override
    public DinosaurResponseDto.hatch acquireDinosaur(DinosaurRequestDto.acquire requestDto) {

        // TODO 수행하는게 많아서 리뷰해야함

        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 멤버가 없습니다. id=" + requestDto.getMemberId()));

        Relation relation = relationRepository.findById(requestDto.getRelationId())
                .orElseThrow(() -> new IllegalArgumentException("해당 관계가 없습니다."));

        Egg egg = relation.getEgg();
        Dinosaur dinosaur = egg.getDinosaur();
        DinosaurBook dinosaurBook = member.getDinosaurBook();

        // 이미 가지고 있는 공룡이라서 획득하지 못한 경우 false
        // 처음 얻은 공룡이라 획득한 경우 true
        boolean isAdded = dinosaurBook.addNewDinosaur(dinosaur);

        egg.changeCheckByMemberType(member);


        if (egg.isChildCheck() && egg.isVolunteerCheck()) {
            List<Dinosaur> allDinosaurs = dinosaurRepository.findAll();
            Dinosaur newDinosaur = allDinosaurs.get(new Random().nextInt(allDinosaurs.size()));
            egg.resetEgg(newDinosaur);
        }

        return DinosaurResponseDto.hatch.toDto(dinosaur, isAdded);
    }

    @Override
    @Transactional
    public void changeMyDinosaur(DinosaurRequestDto.change requestDto) {
        DinosaurBook dinosaurBook = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Member가 없습니다. id=" + requestDto.getMemberId()))
                .getDinosaurBook();

        Dinosaur dinosaur = dinosaurRepository.findById(requestDto.getDinosaurId())
                .orElseThrow(() -> new IllegalArgumentException("해당 Dinosaur가 없습니다. id=" + requestDto.getDinosaurId()));

        dinosaurBook.changeMyDinosaur(dinosaur);
    }
}

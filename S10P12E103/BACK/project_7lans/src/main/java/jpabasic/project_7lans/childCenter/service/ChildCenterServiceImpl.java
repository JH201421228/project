package jpabasic.project_7lans.childCenter.service;

import jpabasic.project_7lans.childCenter.dto.ChildCenterRequestDto;
import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.member.dto.child.ChildResponseDto;
import jpabasic.project_7lans.childCenter.dto.ChildCenterResponseDto;
import jpabasic.project_7lans.member.dto.volunteer.VolunteerResponseDto;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Volunteer;
import jpabasic.project_7lans.childCenter.repository.ChildCenterRepository;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildCenterServiceImpl implements ChildCenterService{

    private final RelationRepository relationRepository;
    private final ChildCenterRepository childCenterRepository;

    @Override
    public List<ChildCenterResponseDto.list> list() {
        List<ChildCenter> childCenters = childCenterRepository.findAll();

        List<ChildCenterResponseDto.list> centerList = new ArrayList<>();

        for(ChildCenter childCenter: childCenters){
            centerList.add(ChildCenterResponseDto.list.builder()
                    .childCenterId(childCenter.getId())
                    .childCenterName(childCenter.getName())
                    .build());
        }
        return centerList;
    }

    @Override
    @Transactional
    public void centerRegister(ChildCenterRequestDto.centerDto centerDto) {
        ChildCenter childCenter = ChildCenter.builder()
                .name(centerDto.getName())
                .address(centerDto.getAddress())
                .phoneNumber(centerDto.getPhoneNumber())
                .build();

        childCenterRepository.save(childCenter);
    }
}

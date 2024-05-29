package jpabasic.project_7lans.relation.service;

import jpabasic.project_7lans.relation.dto.RelationRequestDto;
import jpabasic.project_7lans.relation.dto.RelationResponseDto;

public interface RelationService {

    public RelationResponseDto.info createRelation(RelationRequestDto.create requestDto);

    public void deleteRelation(RelationRequestDto.delete requestDto);

}

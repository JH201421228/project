package jpabasic.project_7lans.relation.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RelationRequestDto {


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class create {

        private Long childId;
        private Long volunteerId;

        @Builder
        create(
                Long childId,
                Long volunteerId
        ) {
            this.childId = childId;
            this.volunteerId = volunteerId;
        }
    }


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class delete {

        private Long relationId;

        @Builder
        delete(
                Long relationId
        ) {
            this.relationId = relationId;
        }
    }

}

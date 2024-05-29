package jpabasic.project_7lans.childCenter.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChildCenterRequestDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById{
        @NotNull(message = "[ChildCenterRequestDto.detailById] childCenterId 는 Null 일 수 없습니다.")
        private Long childCenterId;

        @Builder detailById(
                Long childCenterId
        ){
            this.childCenterId = childCenterId;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class centerDto {
        @NotNull(message = "[MemberRequestDto.centerDto] name 는 null 이 될 수 없습니다.")
        private String name;

        @NotNull(message = "[MemberRequestDto.centerDto] address 는 null 이 될 수 없습니다.")
        private String address;

        @NotNull(message = "[MemberRequestDto.centerDto] phoneNumber 는 null 이 될 수 없습니다.")
        private String phoneNumber;

        @Builder
        centerDto(
                String name,
                String address,
                String phoneNumber
        ){
            this.name = name;
            this.address = address;
            this.phoneNumber = phoneNumber;
        }
    }
}

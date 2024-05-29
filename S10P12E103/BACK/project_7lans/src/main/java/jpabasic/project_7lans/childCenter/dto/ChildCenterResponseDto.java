package jpabasic.project_7lans.childCenter.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChildCenterResponseDto {
    // ===============================================================================
    // 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail{
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterId 는 Null 일 수 없습니다.")
        private Long childCenterId;
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterAddress 는 Null 일 수 없습니다.")
        private String childCenterAddress;
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterPhoneNumber 는 Null 일 수 없습니다.")
        private String childCenterPhoneNumber;

        @Builder
        detail(
                Long childCenterId,
                String childCenterName,
                String childCenterAddress,
                String childCenterPhoneNumber
        ){
            this.childCenterId = childCenterId;
            this.childCenterName = childCenterName;
            this.childCenterAddress = childCenterAddress;
            this.childCenterPhoneNumber = childCenterPhoneNumber;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list{
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterId 는 Null 일 수 없습니다.")
        private Long childCenterId;
        @NotNull(message = "[ChildCenterResponseDto.detail] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;

        @Builder
        list(
                Long childCenterId,
                String childCenterName
        ){
            this.childCenterId = childCenterId;
            this.childCenterName = childCenterName;
        }
    }


}

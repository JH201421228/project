package jpabasic.project_7lans.member.dto.manager;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ManagerResponseDto {
    // ===============================================================================
    // 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[ManagerResponseDto.detail] managerId 는 Null 일 수 없습니다.")
        private Long managerId;
        @NotNull(message = "[ManagerResponseDto.detail] managerEmail 는 Null 일 수 없습니다.")
        private String managerEmail;
        @NotNull(message = "[ManagerResponseDto.detail] managerName 는 Null 일 수 없습니다.")
        private String managerName;
        @NotNull(message = "[ManagerResponseDto.detail] managerPhoneNumber 는 Null 일 수 없습니다.")
        private String managerPhoneNumber;
        @NotNull(message = "[ManagerResponseDto.detail] managerBirth 는 Null 일 수 없습니다.")
        private LocalDate managerBirth;
        @NotNull(message = "[ManagerResponseDto.detail] managerProfileImagePath 는 Null 일 수 없습니다.")
        private String managerProfileImagePath;
        @NotNull(message = "[ManagerResponseDto.detail] managerEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime managerEnterDate;
        @NotNull(message = "[ManagerResponseDto.detail] managerChildCenterId 는 Null 일 수 없습니다.")
        private Long managerChildCenterId;
        private boolean approvedStatus; // primitive type은 기본값이 false이므로 null 이 될 리가 없다.

        @Builder
        detail(
                Long managerId,
                String managerEmail,
                String managerName,
                String managerPhoneNumber,
                LocalDate managerBirth,
                String managerProfileImagePath,
                LocalDateTime managerEnterDate,
                Long managerChildCenterId,
                boolean approvedStatus
        ){
            this.managerId = managerId;
            this.managerEmail = managerEmail;
            this.managerName = managerName;
            this.managerPhoneNumber = managerPhoneNumber;
            this.managerBirth = managerBirth;
            this.managerProfileImagePath = managerProfileImagePath;
            this.managerEnterDate = managerEnterDate;
            this.managerChildCenterId = managerChildCenterId;
            this.approvedStatus = approvedStatus;
        }
    }

    // ===============================================================================
    // 수정??
}

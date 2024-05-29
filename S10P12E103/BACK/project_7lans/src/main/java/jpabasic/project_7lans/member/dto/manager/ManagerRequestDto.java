package jpabasic.project_7lans.member.dto.manager;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class ManagerRequestDto {
    // ===============================================================================
    // 회원가입

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class register{
        @NotNull(message = "[ManagerRequestDto.register] managerEmail 는 Null 일 수 없습니다.")
        String managerEmail;
        @NotNull(message = "[ManagerRequestDto.register] managerName 는 Null 일 수 없습니다.")
        String managerName;
        @NotNull(message = "[ManagerRequestDto.register] managerPassword 는 Null 일 수 없습니다.")
        String managerPassword;
        @NotNull(message = "[ManagerRequestDto.register] managerPhoneNumber 는 Null 일 수 없습니다.")
        String managerPhoneNumber;
        @NotNull(message = "[ManagerRequestDto.register] managerBirth 는 Null 일 수 없습니다.")
        LocalDate managerBirth;
        @NotNull(message = "[ManagerRequestDto.register] managerChildCenterId 는 Null 일 수 없습니다.")
        Long managerChildCenterId;

        @Builder
        register(
                String managerEmail,
                String managerName,
                String managerPassword,
                String managerPhoneNumber,
                LocalDate managerBirth,
                Long managerChildCenterId
        ){
            this.managerEmail = managerEmail;
            this.managerName = managerName;
            this.managerPassword = managerPassword;
            this.managerPhoneNumber = managerPhoneNumber;
            this.managerBirth = managerBirth;
            this.managerChildCenterId = managerChildCenterId;
        }
    }

    // ===============================================================================
    // 조회

    // Id 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById{
        @NotNull(message = "[ManagerRequestDto.detailById] managerId 는 Null 일 수 없습니다.")
        private Long managerId;

        @Builder
        detailById(
                Long managerId
        ){
            this.managerId = managerId;
        }
    }

    // Email 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByEmail{
        @NotNull(message = "[ManagerRequestDto.detailByEmail] managerEmail 는 Null 일 수 없습니다.")
        private String managerEmail;

        @Builder
        detailByEmail(
                String managerEmail
        ){
            this.managerEmail = managerEmail;
        }
    }

    // Name 으로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByName{
        @NotNull(message = "[ManagerRequestDto.detailByName] managerName 는 Null 일 수 없습니다.")
        private String managerName;

        @Builder
        detailByName(
                String managerName
        ){
            this.managerName = managerName;
        }
    }

    // CenterId로

    // ===============================================================================
    // 수정

    // 수정(비밀번호) -> MemberRequestDto 에 존재
    // public static class modifyPassword { }

    // ===============================================================================
    // 탈퇴 -> MemberRequestDto 에 존재
    // public static class delete { }
}

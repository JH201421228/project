package jpabasic.project_7lans.member.dto.volunteer;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class VolunteerRequestDto {
    // ================================================================================================================
    // ================================================================================================================
    // 회원가입

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class register {
        @NotNull(message = "[VolunteerRequestDto.register] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerRequestDto.register] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerRequestDto.register] volunteerPassword 는 null 이 될 수 없습니다.")
        private String volunteerPassword;
        @NotNull(message = "[VolunteerRequestDto.register] volunteerPhoneNumber 는 null 이 될 수 없습니다.")
        private String volunteerPhoneNumber;
        @NotNull(message = "[VolunteerRequestDto.register] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;

        @Builder
        register(
                String volunteerEmail,
                String volunteerName,
                String volunteerPassword,
                String volunteerPhoneNumber,
                LocalDate volunteerBirth
        ){
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerPassword = volunteerPassword;
            this.volunteerPhoneNumber = volunteerPhoneNumber;
            this.volunteerBirth = volunteerBirth;
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    // Id 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailById {
        @NotNull(message = "[VolunteerRequestDto.detailById] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;

        @Builder
        detailById(
                Long volunteerId
        ){
            this.volunteerId = volunteerId;
        }
    }

    // ================================================================================================================
    // Email 로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detailByEmail {
        @NotNull(message = "[VolunteerRequestDto.detailByEmail] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;

        @Builder
        detailByEmail(
                String volunteerEmail
        ){
            this.volunteerEmail = volunteerEmail;
        }
    }

    // ================================================================================================================
    // Name 으로 1건 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class volunteerSearchByName {
        @NotNull(message = "[VolunteerRequestDto.detailByName] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;

        @Builder
        volunteerSearchByName(
                String volunteerName
        ){
            this.volunteerName = volunteerName;
        }
    }

    // ================================================================================================================
    // ================================================================================================================
    // 수정

    // 수정(비밀번호) -> MemberRequestDto 에 존재
    // public static class modifyPassword { }

    // ================================================================================================================
    // ================================================================================================================
    // 탈퇴 -> MemberRequestDto 에 존재
    // public static class delete { }
}

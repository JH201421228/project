package jpabasic.project_7lans.member.dto.member;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class MemberRequestDto {

    // ===============================================================================
    // 가입

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class sign {
        @NotNull(message = "[MemberRequestDto.sign] memberId 는 null 이 될 수 없습니다.")
        private String memberEmail;
        @NotNull(message = "[MemberRequestDto.sign] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;
        @NotNull(message = "[MemberRequestDto.sign] type을 선택해 주세요")
        private String memberType;
        @NotNull(message = "[MemberRequestDto.sign] memberType 는 null 이 될 수 없습니다.")
        private String memberName;
        @NotNull(message = "[MemberRequestDto.sign] memberPhoneNumber 는 null 이 될 수 없습니다.")
        private String memberPhoneNumber;
        @NotNull(message = "[MemberRequestDto.sign] memberbirth 는 null 이 될 수 없습니다.")
        private LocalDate memberBirth;
        private Long centerId;

        @Builder
        sign(
                String memberEmail,
                String memberPassword,
                String memberType,
                String memberName,
                String memberPhoneNumber,
                LocalDate memberBirth,
                Long centerId
        ){
            this.memberEmail = memberEmail;
            this.memberPassword = memberPassword;
            this.memberType = memberType;
            this.memberName = memberName;
            this.memberPhoneNumber = memberPhoneNumber;
            this.memberBirth = memberBirth;
            this.centerId = centerId;
        }
    }
    // ===============================================================================
    // 수정(비밀번호)

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class modifyPassword {
        @NotNull(message = "[MemberRequestDto.modifyPassword] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.modifyPassword] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        modifyPassword(
                Long memberId,
                String memberPassword
        ){
            this.memberId = memberId;
            this.memberPassword = memberPassword;
        }
    }

    // ===============================================================================
    // 로그인

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class login {
        @NotNull(message = "[MemberRequestDto.login] memberId 는 null 이 될 수 없습니다.")
        private String memberEmail;
        @NotNull(message = "[MemberRequestDto.login] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        login(
                String memberEmail,
                String memberPassword

        ){
            this.memberEmail = memberEmail;
            this.memberPassword = memberPassword;
        }
    }

    // ===============================================================================
    // 탈퇴

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class delete {
        @NotNull(message = "[MemberRequestDto.delete] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.delete] memberPassword 는 null 이 될 수 없습니다.")
        private String memberPassword;

        @Builder
        delete(
                Long memberId,
                String memberPassword
        ){
          this.memberId = memberId;
          this.memberPassword = memberPassword;
        }
    }

    // ===============================================================================
    // 프로필 이미지 수정
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class changeProfile {
        @NotNull(message = "[MemberRequestDto.delete] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.delete] profileImgPath 는 null 이 될 수 없습니다.")
        private String profileImgPath;

        @Builder
        changeProfile(
                Long memberId,
                String profileImgPath
        ){
            this.memberId = memberId;
            this.profileImgPath = profileImgPath;
        }
    }


    // ================================================================================================================
    // 비밀번호 변경
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class changePassword {
        @NotNull(message = "[MemberRequestDto.delete] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberRequestDto.delete] nowPassword 는 null 이 될 수 없습니다.")
        private String nowPassword;
        @NotNull(message = "[MemberRequestDto.delete] newPassword 는 null 이 될 수 없습니다.")
        private String newPassword;

        @Builder
        changePassword(
                Long memberId,
                String nowPassword,
                String newPassword
        ){
            this.memberId = memberId;
            this.nowPassword = nowPassword;
            this.newPassword = newPassword;
        }
    }
}

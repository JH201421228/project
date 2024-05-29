package jpabasic.project_7lans.member.dto.member;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.member.entity.MemberType;
import lombok.*;

import java.time.LocalDate;

public class MemberResponseDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginResChildDto {
        @NotNull(message = "[MemberResponseDto.loginResChildDto] memberType 는 null 이 될 수 없습니다.")
        private MemberType memberType;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] centerId 는 null 이 될 수 없습니다.")
        private Long centerId;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] dinosaurBookId 는 null 이 될 수 없습니다.")
        private Long dinosaurBookId;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] childName 는 null 이 될 수 없습니다.")
        private String childName;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] centerName 는 null 이 될 수 없습니다.")
        private String centerName;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] email 는 null 이 될 수 없습니다.")
        private String email;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] phoneNumber 는 null 이 될 수 없습니다.")
        private String phoneNumber;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] profileImgPath 는 null 이 될 수 없습니다.")
        private String profileImgPath;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] birth 는 null 이 될 수 없습니다.")
        private LocalDate birth;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] enterDate 는 null 이 될 수 없습니다.")
        private LocalDate enterDate;
        @NotNull(message = "[MemberResponseDto.loginResChildDto] token 는 null 이 될 수 없습니다.")
        private String token;

        @Builder
        loginResChildDto(
                MemberType memberType,
                Long memberId,
                Long centerId,
                Long dinosaurBookId,
                String childName,
                String centerName,
                String email,
                String phoneNumber,
                String profileImgPath,
                LocalDate birth,
                LocalDate enterDate,
                String token
        ){
            this.memberType = memberType;
            this.memberId = memberId;
            this.centerId = centerId;
            this.dinosaurBookId = dinosaurBookId;
            this.childName = childName;
            this.centerName = centerName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.profileImgPath = profileImgPath;
            this.birth = birth;
            this.enterDate = enterDate;
            this.token = token;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginResVolunteerDto {
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] memberType 는 null 이 될 수 없습니다.")
        private MemberType memberType;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] dinosaurBookId 는 null 이 될 수 없습니다.")
        private Long dinosaurBookId;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] email 는 null 이 될 수 없습니다.")
        private String email;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] phoneNumber 는 null 이 될 수 없습니다.")
        private String phoneNumber;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] profileImgPath 는 null 이 될 수 없습니다.")
        private String profileImgPath;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] birth 는 null 이 될 수 없습니다.")
        private LocalDate birth;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] enterDate 는 null 이 될 수 없습니다.")
        private LocalDate enterDate;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] volunteerTime 는 null 이 될 수 없습니다.")
        private Integer volunteerTime;
        @NotNull(message = "[MemberResponseDto.loginResVolunteerDto] token 는 null 이 될 수 없습니다.")
        private String token;

        @Builder
        loginResVolunteerDto(
                MemberType memberType,
                Long memberId,
                Long dinosaurBookId,
                String volunteerName,
                String email,
                String phoneNumber,
                String profileImgPath,
                LocalDate birth,
                LocalDate enterDate,
                Integer volunteerTime,
                String token
        ){
            this.memberType = memberType;
            this.memberId = memberId;
            this.dinosaurBookId = dinosaurBookId;
            this.volunteerName = volunteerName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.profileImgPath = profileImgPath;
            this.birth = birth;
            this.enterDate = enterDate;
            this.volunteerTime = volunteerTime;
            this.token = token;
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginResManagerDto {
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] memberType 는 null 이 될 수 없습니다.")
        private MemberType memberType;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] memberId 는 null 이 될 수 없습니다.")
        private Long memberId;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] centerId 는 null 이 될 수 없습니다.")
        private Long centerId;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] managerName 는 null 이 될 수 없습니다.")
        private String managerName;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] centerName 는 null 이 될 수 없습니다.")
        private String centerName;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] email 는 null 이 될 수 없습니다.")
        private String email;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] phoneNumber 는 null 이 될 수 없습니다.")
        private String phoneNumber;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] profileImgPath 는 null 이 될 수 없습니다.")
        private String profileImgPath;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] birth 는 null 이 될 수 없습니다.")
        private LocalDate birth;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] enterDate 는 null 이 될 수 없습니다.")
        private LocalDate enterDate;
        @NotNull(message = "[MemberResponseDto.loginResManagerDto] token 는 null 이 될 수 없습니다.")
        private String token;

        @Builder
        loginResManagerDto(
                MemberType memberType,
                Long memberId,
                Long centerId,
                String managerName,
                String centerName,
                String email,
                String phoneNumber,
                String profileImgPath,
                LocalDate birth,
                LocalDate enterDate,
                String token
        ){
            this.memberType = memberType;
            this.memberId = memberId;
            this.centerId = centerId;
            this.managerName = managerName;
            this.centerName = centerName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.profileImgPath = profileImgPath;
            this.birth = birth;
            this.enterDate = enterDate;
            this.token = token;
        }
    }

    // ===============================================================================
    // 프로필 이미지 수정
    // Response 필요 없음.

//    @Getter
//    @NoArgsConstructor(access = AccessLevel.PROTECTED)
//    public static class loginResDto {
//        @NotNull(message = "[MemberResponseDto.loginResDto] token 는 null 이 될 수 없습니다.")
//        private String token;
//        @Builder
//        loginResDto(
//                String token
//        ){
//            this.token = token;
//        }
//    }

    // ================================================================================================================
    // 비밀번호 변경
    // Response 필요 없음
}

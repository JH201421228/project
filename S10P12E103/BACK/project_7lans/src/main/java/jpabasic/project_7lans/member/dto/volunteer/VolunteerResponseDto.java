package jpabasic.project_7lans.member.dto.volunteer;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Volunteer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class VolunteerResponseDto {

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    // 봉사자 상세 정보 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class detail {
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerPhoneNumber 는 null 이 될 수 없습니다.")
        private String volunteerPhoneNumber;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;
        @NotNull(message = "[VolunteerResponseDto.detail] volunteerEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime volunteerEnterDate;

        // 바로 아래의 DTO 활용
        @Builder
        detail(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                String volunteerPhoneNumber,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath,
                LocalDateTime volunteerEnterDate
        ){
          this.volunteerId = volunteerId;
          this.volunteerEmail = volunteerEmail;
          this.volunteerName = volunteerName;
          this.volunteerPhoneNumber = volunteerPhoneNumber;
          this.volunteerBirth = volunteerBirth;
          this.volunteerProfileImagePath = volunteerProfileImagePath;
          this.volunteerEnterDate = volunteerEnterDate;
        }
    }

    // detail 를 위한 DTO
    public static VolunteerResponseDto.detail toDetailDto(Volunteer volunteer){
        return detail.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerPhoneNumber(volunteer.getPhoneNumber())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .volunteerEnterDate(volunteer.getEnterDate())
                .build();
    }

    // ================================================================================================================

    // 봉사자의 봉사 시간 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class timeDto {
        @NotNull(message = "[VolunteerResponseDto.timeDto] timeDto 는 null 이 될 수 없습니다.")
        private Integer volunteerTime;

        // 바로 아래의 DTO 활용
        @Builder
        timeDto(
                Integer volunteerTime
        ){
            this.volunteerTime = volunteerTime;
        }
    }

    // timeDto 를 위한 DTO
    public static VolunteerResponseDto.timeDto toTimeDtoDto(Volunteer volunteer){
        return timeDto.builder()
                .volunteerTime(volunteer.getVolunteerTime())
                .build();
    }

    // ================================================================================================================
    // 봉사자 전체 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class list {
        @NotNull(message = "[VolunteerResponseDto.list] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerTime 는 Null 일 수 없습니다.")
        private Integer volunteerTime;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerProfileImgPath 는 Null 일 수 없습니다.")
        private String volunteerProfileImgPath;

        // 바로 아래의 DTO 활용
        @Builder
        list(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                Integer volunteerTime,
                String volunteerProfileImgPath
        ) {
            this.volunteerId = volunteerId;
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerTime = volunteerTime;
            this.volunteerProfileImgPath = volunteerProfileImgPath;
        }
    }

    // list 를 위한 DTO
    public static VolunteerResponseDto.list toListDto(Volunteer volunteer){
        return list.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerTime(volunteer.getVolunteerTime())
                .volunteerProfileImgPath(volunteer.getProfileImgPath())
                .build();
    }

    // ================================================================================================================
    // 봉사자 이름으로 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class volunteerSearchByName {
        @NotNull(message = "[VolunteerResponseDto.list] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;

        // 바로 아래의 DTO 활용
        @Builder
        volunteerSearchByName(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath
        ){
            this.volunteerId = volunteerId;
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerBirth = volunteerBirth;
            this.volunteerProfileImagePath = volunteerProfileImagePath;
        }
    }

    // volunteerSearchByName 를 위한 DTO
    public static VolunteerResponseDto.volunteerSearchByName toVolunteerSearchByNameDto(Volunteer volunteer){
        return volunteerSearchByName.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .build();
    }

    // ================================================================================================================
    // 아동이 나의 봉사자 리스트 조회
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listByChild {
        @NotNull(message = "[VolunteerResponseDto.list] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;
        @NotNull(message = "[VolunteerResponseDto.list] relationId 는 Null 일 수 없습니다.")
        private Long relationId;

        // 바로 아래의 DTO 활용
        @Builder
        listByChild(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath,
                Long relationId
        ){
            this.volunteerId = volunteerId;
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerBirth = volunteerBirth;
            this.volunteerProfileImagePath = volunteerProfileImagePath;
            this.relationId = relationId;
        }
    }

    // listByChild 를 위한 DTO
    public static VolunteerResponseDto.listByChild toListByChildDto(Volunteer volunteer, Relation relation){
        return listByChild.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .relationId(relation.getId())
                .build();
    }

    // ================================================================================================================
    // 해당 센터의 아동과 친구 추가 되어 있는 봉사자 리스트
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listByCenter {
        @NotNull(message = "[VolunteerResponseDto.list] volunteerId 는 null 이 될 수 없습니다.")
        private Long volunteerId;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerEmail 는 null 이 될 수 없습니다.")
        private String volunteerEmail;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerName 는 null 이 될 수 없습니다.")
        private String volunteerName;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerBirth 는 null 이 될 수 없습니다.")
        private LocalDate volunteerBirth;
        @NotNull(message = "[VolunteerResponseDto.list] volunteerProfileImagePath 는 Null 일 수 없습니다.")
        private String volunteerProfileImagePath;
        @NotNull(message = "[VolunteerResponseDto.list] relationId 는 Null 일 수 없습니다.")
        private Long relationId;

        // 바로 아래의 DTO 활용
        @Builder
        listByCenter(
                Long volunteerId,
                String volunteerEmail,
                String volunteerName,
                LocalDate volunteerBirth,
                String volunteerProfileImagePath,
                Long relationId
        ){
            this.volunteerId = volunteerId;
            this.volunteerEmail = volunteerEmail;
            this.volunteerName = volunteerName;
            this.volunteerBirth = volunteerBirth;
            this.volunteerProfileImagePath = volunteerProfileImagePath;
            this.relationId = relationId;
        }
    }

    // listByCenter 를 위한 DTO
    public static VolunteerResponseDto.listByCenter toListByCenterDto(Volunteer volunteer, Relation relation){
        return listByCenter.builder()
                .volunteerId(volunteer.getId())
                .volunteerEmail(volunteer.getEmail())
                .volunteerName(volunteer.getName())
                .volunteerBirth(volunteer.getBirth())
                .volunteerProfileImagePath(volunteer.getProfileImgPath())
                .relationId(relation.getId())
                .build();
    }

    // ================================================================================================================
    // ================================================================================================================
}

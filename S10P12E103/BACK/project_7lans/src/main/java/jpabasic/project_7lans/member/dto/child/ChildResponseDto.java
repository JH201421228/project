package jpabasic.project_7lans.member.dto.child;

import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.relation.entity.Relation;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ChildResponseDto {

    // ================================================================================================================
    // ================================================================================================================
    // 조회

    // 아동 상세 조회
    @Getter
    @Builder
    public static class detail {
        @NotNull(message = "[ChildResponseDto.detail] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.detail] childEmail 은 Null 일 수 없습니다.")
        private String childEmail;
        @NotNull(message = "[ChildResponseDto.detail] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.detail] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildResponseDto.detail] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.detail] childProfileImagePath 는 Null 일 수 없습니다.")
        private String childProfileImagePath;
        @NotNull(message = "[ChildResponseDto.detail] childEnterDate 는 Null 일 수 없습니다.")
        private LocalDateTime childEnterDate;
        @NotNull(message = "[ChildResponseDto.detail] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.detail] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;

        // 아래의 toDTO 활용
        @Builder
        detail(
                Long childId,
                String childEmail,
                String childName,
                String childPhoneNumber,
                LocalDate childBirth,
                String childProfileImagePath,
                LocalDateTime childEnterDate,
                String childCenterName,
                String childSpecialContent
        ){
            this.childId = childId;
            this.childEmail = childEmail;
            this.childName = childName;
            this.childPhoneNumber = childPhoneNumber;
            this.childBirth = childBirth;
            this.childProfileImagePath = childProfileImagePath;
            this.childEnterDate = childEnterDate;
            this.childCenterName = childCenterName;
            this.childSpecialContent = childSpecialContent;
        }
    }

    // detail 를 위한 DTO
    public static ChildResponseDto.detail toDetailDto(Child child){
        return detail.builder()
                .childId(child.getId())
                .childEmail(child.getEmail())
                .childName(child.getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childEnterDate(child.getEnterDate())
                .childCenterName(child.getChildCenter().getName())
                .childSpecialContent(child.getSpecialContent())
                .build();
    }

    // ================================================================================================================
    // 봉사자의 아동 리스트 반환
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listByVolunteer{
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childProfileImagePath 는 Null 일 수 없습니다.")
        private String childProfileImagePath;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childCenterName 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] childSpecialContent 는 Null 일 수 없습니다.")
        private String childSpecialContent;
        @NotNull(message = "[ChildResponseDto.listByVolunteer] relationId 는 Null 일 수 없습니다.")
        private Long relationId;

        // 아래의 toDTO 활용
        @Builder
        listByVolunteer(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childProfileImagePath,
                String childCenterName,
                String childSpecialContent,
                Long relationId
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childProfileImagePath = childProfileImagePath;
            this.childCenterName = childCenterName;
            this.childSpecialContent = childSpecialContent;
            this.relationId = relationId;
        }
    }

    // listByVolunteer 를 위한 DTO
    public static ChildResponseDto.listByVolunteer toListByVolunteerDto(Child child, Relation relation) {
        return listByVolunteer.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childProfileImagePath(child.getProfileImgPath())
                .childCenterName(child.getChildCenter().getName())
                .childSpecialContent(child.getSpecialContent())
                .relationId(relation.getId())
                .build();
    }


    // ================================================================================================================
    // 해당 센터의 아동 리스트
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class listByCenter {
        @NotNull(message = "[ChildResponseDto.listByCenter] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.listByCenter] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.listByCenter] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.listByCenter] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildResponseDto.listByCenter] childChildCenterId 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.listByCenter] childProfileImgPath 는 Null 일 수 없습니다.")
        private String childProfileImgPath;

        // 아래의 toDTO 활용
        @Builder
        listByCenter(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childPhoneNumber,
                String childCenterName,
                String childProfileImgPath
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childPhoneNumber = childPhoneNumber;
            this.childCenterName = childCenterName;
            this.childProfileImgPath = childProfileImgPath;
        }
    }

    // listByCenter 를 위한 DTO
    public static ChildResponseDto.listByCenter toListByCenterDto(Child child) {
        return listByCenter.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childCenterName(child.getChildCenter().getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childProfileImgPath(child.getProfileImgPath())
                .build();
    }

    // ================================================================================================================
    // 관리자가 센터 관리화면에서 선택한 봉사자와 친구 추가가 되어 있지 않은 아동 리스트
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class childListByVolunteerAndCenter{
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childId 는 Null 일 수 없습니다.")
        private Long childId;
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childName 은 Null 일 수 없습니다.")
        private String childName;
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childBirth 은 Null 일 수 없습니다.")
        private LocalDate childBirth;
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childPhoneNumber 은 Null 일 수 없습니다.")
        private String childPhoneNumber;
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childChildCenterId 는 Null 일 수 없습니다.")
        private String childCenterName;
        @NotNull(message = "[ChildResponseDto.childListByVolunteerAndCenter] childProfileImgPath 는 Null 일 수 없습니다.")
        private String childProfileImgPath;

        // 아래의 toDTO 활용
        @Builder
        childListByVolunteerAndCenter(
                Long childId,
                String childName,
                LocalDate childBirth,
                String childPhoneNumber,
                String childCenterName,
                String childProfileImgPath
        ){
            this.childId = childId;
            this.childName = childName;
            this.childBirth = childBirth;
            this.childPhoneNumber = childPhoneNumber;
            this.childCenterName = childCenterName;
            this.childProfileImgPath = childProfileImgPath;
        }
    }

    // childListByVolunteerAndCenter 를 위한 DTO
    public static ChildResponseDto.childListByVolunteerAndCenter toChildListByVolunteerAndCenterDto(Child child) {
        return childListByVolunteerAndCenter.builder()
                .childId(child.getId())
                .childName(child.getName())
                .childBirth(child.getBirth())
                .childCenterName(child.getChildCenter().getName())
                .childPhoneNumber(child.getPhoneNumber())
                .childProfileImgPath(child.getProfileImgPath())
                .build();
    }

    // ================================================================================================================
    // ================================================================================================================
}

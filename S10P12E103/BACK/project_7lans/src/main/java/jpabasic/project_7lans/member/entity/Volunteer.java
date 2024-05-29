package jpabasic.project_7lans.member.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@DiscriminatorValue("VOLUNTEER")
@PrimaryKeyJoinColumn(name="VOLUNTEER_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Volunteer extends Member {

    // ================================================================================================
    // 필드
    private Integer volunteerTime;

    // ================================================================================================
    // 메서드

    // 봉사 시간 추가
    public void addVolunteerTime(Integer time){
        this.volunteerTime += time;
    }

    // ================================================================================================
    // 생성자
    @Builder
    public Volunteer(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            DinosaurBook dinosaurBook,
            MemberType memberType
    ){
        super(
                email,
                name,
                password,
                phoneNumber,
                birth,
                dinosaurBook,
                memberType
        );
        this.volunteerTime = 0;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(MemberType.VOLUNTEER.name()));
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

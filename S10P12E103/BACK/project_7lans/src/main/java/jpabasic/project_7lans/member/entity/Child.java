package jpabasic.project_7lans.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@DiscriminatorValue("CHILD")
@PrimaryKeyJoinColumn(name="CHILD_ID")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Child extends Member {
    // ==============================================================================================
    // 필드

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull(message = "[Child] childCenter 은 Null 일 수 없습니다.")
    private ChildCenter childCenter;

    private String specialContent;

    // ==============================================================================================
    // 메서드

    public void changeChildCenter(ChildCenter childCenter){
        this.childCenter = childCenter;
    }

    public void changeSpecialContent(String specialContent){
        this.specialContent = specialContent;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(MemberType.CHILD.name()));
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

    // ==============================================================================================
    // 생성자

    @Builder
    public Child(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            ChildCenter childCenter,
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
        this.childCenter = childCenter;
        this.specialContent = "";
    }
}

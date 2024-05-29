package jpabasic.project_7lans.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "member_type" , discriminatorType = DiscriminatorType.STRING)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Member implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(name= "member_type", insertable=false, updatable=false)
    @Enumerated(EnumType.STRING)
    private MemberType memberType;

    @NotNull(message = "[Member] email 은 Null 일 수 없습니다.")
    private String email;

    @NotNull(message = "[Member] name 은 Null 일 수 없습니다.")
    private String name;

    @NotNull(message = "[Member] password 은 Null 일 수 없습니다.")
    private String password;

    @NotNull(message = "[Member] phoneNumber 은 Null 일 수 없습니다.")
    private String phoneNumber;

    private String profileImgPath;

    @NotNull(message = "[Member] birth 은 Null 일 수 없습니다.")
    private LocalDate birth;

    private LocalDateTime enterDate;

    @Setter
    @OneToOne(cascade = CascadeType.PERSIST)
    private DinosaurBook dinosaurBook;

    public void changePassword(String password){
        this.password = password;
    }

    public void changePhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public void changeProfileImage(String profileImgPath){
        this.profileImgPath = profileImgPath;
    }

    public Member(
            String email,
            String name,
            String password,
            String phoneNumber,
            LocalDate birth,
            DinosaurBook dinosaurBook,
            MemberType memberType
    ){
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profileImgPath = "no_profile.jpg";
        this.birth = birth;
        this.dinosaurBook = dinosaurBook;
        this.enterDate = LocalDateTime.now();
        this.memberType = memberType;
    }

}

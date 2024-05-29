package jpabasic.project_7lans.childCenter.entity;

import jakarta.persistence.*;
import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.member.entity.Manager;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildCenter {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String phoneNumber;

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<Child> childList = new ArrayList<>();

    @OneToMany(mappedBy = "childCenter", cascade = CascadeType.ALL)
    private List<Manager> managerList = new ArrayList<>();

    public void changeName(String name) {
        this.name = name;
    }

    public void addChildList(Child child) {
        this.childList.add(child);
        child.changeChildCenter(this);
    }

    public void addManagerList(Manager manager) {
        this.managerList.add(manager);
        manager.changeChildCenter(this);
    }

    @Builder
    public ChildCenter(
            String name,
            String address,
            String phoneNumber
    ){
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

}

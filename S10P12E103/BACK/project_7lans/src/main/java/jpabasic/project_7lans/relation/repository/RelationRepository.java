package jpabasic.project_7lans.relation.repository;

import jpabasic.project_7lans.member.entity.Child;
import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import jpabasic.project_7lans.relation.entity.Relation;
import jpabasic.project_7lans.member.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    List<Relation> findByChild(Child child);

    List<Relation> findByVolunteer(Volunteer volunteer);

    List<Relation> findByChildCenter(ChildCenter childCenter);

}

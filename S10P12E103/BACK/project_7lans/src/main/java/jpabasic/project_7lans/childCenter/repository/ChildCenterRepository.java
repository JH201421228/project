package jpabasic.project_7lans.childCenter.repository;

import jpabasic.project_7lans.childCenter.entity.ChildCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildCenterRepository extends JpaRepository<ChildCenter, Long> {
}

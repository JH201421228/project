package jpabasic.project_7lans.dinosaur.repository;

import jpabasic.project_7lans.dinosaur.entity.Egg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EggRepository extends JpaRepository<Egg, Long> {

}

package jpabasic.project_7lans.dinosaur.repository;


import jpabasic.project_7lans.dinosaur.entity.DinosaurBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DinosaurBookRepository extends JpaRepository<DinosaurBook, Long> {
    Optional<DinosaurBook> findByMemberId(Long memberId);
}

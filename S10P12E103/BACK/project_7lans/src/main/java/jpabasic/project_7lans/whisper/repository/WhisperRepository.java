package jpabasic.project_7lans.whisper.repository;

import jpabasic.project_7lans.whisper.entity.Whisper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhisperRepository extends JpaRepository<Whisper, Long> {

}

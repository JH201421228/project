package jpabasic.project_7lans.meetingImage.repository;

import jpabasic.project_7lans.meetingImage.entity.MeetingImage;
import jpabasic.project_7lans.member.repository.ManagerRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingImageRepository extends JpaRepository<MeetingImage, Long> {
}

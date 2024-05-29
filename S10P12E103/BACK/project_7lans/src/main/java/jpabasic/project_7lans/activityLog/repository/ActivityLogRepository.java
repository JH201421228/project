package jpabasic.project_7lans.activityLog.repository;

import jpabasic.project_7lans.activityLog.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

}

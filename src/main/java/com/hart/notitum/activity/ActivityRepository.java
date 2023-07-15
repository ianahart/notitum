package com.hart.notitum.activity;

import com.hart.notitum.activity.dto.ActivitiesDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    @Query(value = """
            SELECT new com.hart.notitum.activity.dto.ActivitiesDto(
            a.id as activityId, a.createdAt as createdAt, a.text as text
            )
            FROM Activity a
            INNER JOIN a.user u
            INNER JOIN a.workspace w
            WHERE w.id = :workspaceId
            AND u.id = :userId
            """)
    Page<ActivitiesDto> getActivities(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId,
            Pageable paging);

}

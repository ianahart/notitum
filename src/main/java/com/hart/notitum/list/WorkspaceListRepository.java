package com.hart.notitum.list;

import java.util.List;

import com.hart.notitum.list.dto.WorkspaceListDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceListRepository extends JpaRepository<WorkspaceList, Long> {

    @Query(value = """
             SELECT wl FROM WorkspaceList wl WHERE wl.id IN (:listIds) ORDER BY wl.index ASC
            """)
    List<WorkspaceList> findAllByIdOrderByIndexASC(@Param("listIds") List<Long> listIds);

    @Query(value = """
             SELECT COUNT(wl) from WorkspaceList wl
             INNER JOIN wl.user u
             INNER JOIN wl.workspace w
             WHERE u.id = :userId
            AND w.id = :workspaceId
            """)
    Long checkWorkspaceListLimit(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId);

    @Query(value = """
            SELECT new com.hart.notitum.list.dto.WorkspaceListDto(
               wl.id as id, wl.createdAt as createdAt,
               wl.xCoordinate as xCoordinate, wl.yCoordinate as yCoordinate,
               wl.index as index, wl.title as title, wl.updatedAt as updatedAt)
               FROM WorkspaceList wl
               INNER JOIN wl.user u
               INNER JOIN wl.workspace w
               WHERE w.id = :workspaceId
               And u.id = :userId
               ORDER BY wl.index ASC """)
    List<WorkspaceListDto> getWorkspaceLists(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId);
}

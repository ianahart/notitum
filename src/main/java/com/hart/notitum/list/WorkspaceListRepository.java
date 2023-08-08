package com.hart.notitum.list;

import java.util.List;

import com.hart.notitum.list.dto.WorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListIdDto;
import com.hart.notitum.list.dto.WorkspaceListWithCardDto;

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
            SELECT new com.hart.notitum.list.dto.WorkspaceListIdDto(
               wl.id)
               FROM WorkspaceList wl
               INNER JOIN wl.user u
               INNER JOIN wl.workspace w
               WHERE w.id = :workspaceId
               And u.id = :userId
               ORDER BY wl.index ASC """)
    List<WorkspaceListIdDto> getWorkspaceLists(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId);
}

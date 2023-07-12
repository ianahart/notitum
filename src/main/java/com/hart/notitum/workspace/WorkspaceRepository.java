package com.hart.notitum.workspace;

import java.util.List;

import com.hart.notitum.workspace.dto.WorkspaceDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    @Query(value = """
            SELECT EXISTS(SELECT 1 from workspace w WHERE w.title = :title)
            """, nativeQuery = true)
    boolean checkIfWorkspaceExists(@Param("title") String title);

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId
            ) FROM
                    Workspace w
                    INNER JOIN w.user u
                    WHERE u.id = :userId
                    """)
    List<WorkspaceDto> getWorkspaces(@Param("userId") Long userId);
}

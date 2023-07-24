package com.hart.notitum.workspace;

import java.util.List;

import com.hart.notitum.workspace.dto.WorkspaceDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId, w.updatedAt as updatedAt, w.isStarred as isStarred,
            w.description as description)
            FROM Workspace w
            INNER JOIN w.user u
            WHERE w.id IN (:ids)
            """)
    List<WorkspaceDto> getWorkspacesByIds(@Param("ids") List<Long> ids);

    @Query(value = """
            SELECT EXISTS(SELECT 1 from workspace w WHERE w.title = :title)
            """, nativeQuery = true)
    boolean checkIfWorkspaceExists(@Param("title") String title);

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId, w.updatedAt as updatedAt, w.isStarred as isStarred,
            w.description as description)
            FROM Workspace w
            INNER JOIN w.user u
            WHERE w.id = :workspaceId
            """)
    WorkspaceDto getWorkspace(@Param("workspaceId") Long workspaceId);

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId, w.updatedAt as updatedAt, w.isStarred as isStarred,
            w.description as description
            ) FROM
                    Workspace w
                    INNER JOIN w.user u
                    WHERE u.id = :userId
                    ORDER BY updatedAt DESC LIMIT 2
                    """)
    List<WorkspaceDto> getRecentWorkspaces(@Param("userId") Long userId);

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId, w.updatedAt as updatedAt, w.isStarred as isStarred,
            w.description as description
            ) FROM
                    Workspace w
                    INNER JOIN w.user u
                    WHERE u.id = :userId
                    AND w.isStarred = :isStarred
                    """)
    List<WorkspaceDto> getStarredWorkspaces(@Param("userId") Long userId, @Param("isStarred") boolean isStarred);

    @Query(value = """
            SELECT new com.hart.notitum.workspace.dto.WorkspaceDto(
             w.id as workspaceId, w.background as background,
             w.createdAt as createdAt, w.title as title, w.visibility as visibility,
            u.id as userId, w.updatedAt as updatedAt, w.isStarred as isStarred,
            w.description as description
            ) FROM
                    Workspace w
                    INNER JOIN w.user u
                    WHERE u.id = :userId
                    ORDER BY w.id DESC
                    """)
    List<WorkspaceDto> getWorkspaces(@Param("userId") Long userId);
}

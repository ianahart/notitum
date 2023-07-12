package com.hart.notitum.workspace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    @Query(value = """
            SELECT EXISTS(SELECT 1 from workspace w WHERE w.title = :title)
            """, nativeQuery = true)
    boolean checkIfWorkspaceExists(@Param("title") String title);
}

package com.hart.notitum.checklistitem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {

    @Query(value = """
             SELECT COUNT(cli.id) FROM ChecklistItem cli
             INNER JOIN cli.checklist cl
             WHERE cl.id = :checklistId
            """)
    int countChecklistItems(@Param("checklistId") Long checklistId);

}

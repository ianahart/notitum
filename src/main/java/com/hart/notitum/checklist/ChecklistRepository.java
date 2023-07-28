package com.hart.notitum.checklist;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    @Query(value = """
             SELECT cl FROM Checklist cl
             INNER JOIN cl.card c
             WHERE c.id = :cardId
            """)
    List<Checklist> getChecklists(@Param("cardId") Long cardId);

    @Query(value = """
             SELECT COUNT(cl.id) FROM Checklist cl
             INNER JOIN cl.card c
             WHERE c.id = :cardId
            """)
    int countChecklists(@Param("cardId") Long cardId);
}

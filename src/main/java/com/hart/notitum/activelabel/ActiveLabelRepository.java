package com.hart.notitum.activelabel;

import java.util.List;

import com.hart.notitum.activelabel.dto.ActiveLabelDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveLabelRepository extends JpaRepository<ActiveLabel, Long> {

    @Query(value = """
              SELECT al FROM ActiveLabel al
              INNER JOIN al.card c
              WHERE c.id = :cardId
            """)
    List<ActiveLabel> findActiveLabelsById(@Param("cardId") Long cardId);

    @Query(value = """
            SELECT new com.hart.notitum.activelabel.dto.ActiveLabelDto(
              al.id AS id, l.isChecked AS isChecked, l.title AS title,
              l.color AS color, al.createdAt AS createdAt, l.id AS labelId
            ) FROM ActiveLabel al
              INNER JOIN al.card c
              INNER JOIN al.label l
              WHERE c.id = :cardId
              ORDER BY l.id ASC""")
    List<ActiveLabelDto> getActiveLabels(@Param("cardId") Long cardId);

    @Query(value = """
            SELECT al.id FROM ActiveLabel al
             INNER JOIN al.label l
             INNER JOIN al.card c
             WHERE l.id = :labelId
             AND c.id = :cardId

                    """)

    Long checkIfActiveLabelExists(@Param("labelId") Long labelId, @Param("cardId") Long cardId);
}

package com.hart.notitum.label;

import java.util.List;

import com.hart.notitum.label.dto.LabelDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {

    @Query(value = """
            SELECT new com.hart.notitum.label.dto.LabelDto(
             l.id AS id, l.isChecked AS isChecked, l.title AS title,
            l.color AS color, l.createdAt AS createdAt
            )
            FROM Label l
            INNER JOIN l.workspace w
            INNER JOIN l.card c
            WHERE w.id = :workspaceId
            """)
    List<LabelDto> getLabels(@Param("workspaceId") Long workspaceId);
}

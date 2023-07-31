package com.hart.notitum.comment;

import com.hart.notitum.comment.dto.CommentDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = """
            SELECT new com.hart.notitum.comment.dto.CommentDto(
             c.id AS id, c.createdAt AS createdAt, c.text AS text,
             u.firstName AS firstName, u.lastName AS lastName, c.isOpen AS isOpen
            ) FROM Comment c
            INNER JOIN c.card _c
            INNER JOIN c.user u
            WHERE _c.id = :cardId
                    """)
    Page<CommentDto> getComments(@Param("cardId") Long cardId, Pageable paging);
}

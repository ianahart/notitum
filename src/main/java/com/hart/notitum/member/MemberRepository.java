package com.hart.notitum.member;

import java.util.List;

import com.hart.notitum.member.dto.MemberDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = """
              SELECT u.id FROM Member m
              INNER JOIN m.user u
              INNER JOIN m.workspace w
              WHERE w.id = :workspaceId
            """)
    List<Long> getMemberUserIds(@Param("workspaceId") Long workspaceId);

    @Query(value = """
                 SELECT new com.hart.notitum.member.dto.MemberDto(
                  m.id AS id, u.firstName AS firstName, u.lastName AS lastName,
                  u.id AS userId
                ) FROM Member m
                INNER JOIN m.user u
                INNER JOIN m.workspace w
                WHERE w.id = :workspaceId
                AND LOWER(u.firstName) LIKE %:query% OR LOWER(u.lastName) LIKE %:query%
                ORDER BY m.id LIMIT 2
            """)
    List<MemberDto> searchMembers(@Param("query") String query, @Param("workspaceId") Long workspaceId);

    @Query(value = """
            SELECT new com.hart.notitum.member.dto.MemberDto(
              m.id AS id, u.firstName AS firstName, u.lastName AS lastName,
              u.id AS userId
            ) FROM Member m
            INNER JOIN m.user u
            INNER JOIN m.workspace w
            WHERE w.id = :workspaceId
                    """)
    Page<MemberDto> getMembers(@Param("workspaceId") Long workspaceId, Pageable paging);

    @Query(value = """
              SELECT m FROM Member m
              INNER JOIN m.user u
              WHERE u.id = :userId
            """)
    List<Member> getMemberWorkspaces(@Param("userId") Long userId);

    @Query(value = """
                SELECT m.id FROM Member m
                INNER JOIN m.user u
                INNER JOIN m.workspace w
                WHERE u.id = :userId
                AND w.id = :workspaceId
                ORDER BY m.id LIMIT 1
            """)
    Long checkIfMemberExists(@Param("userId") Long userId, @Param("workspaceId") Long workspaceId);

}

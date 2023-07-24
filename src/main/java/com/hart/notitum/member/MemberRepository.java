package com.hart.notitum.member;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
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

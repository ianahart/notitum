package com.hart.notitum.card;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Query(value = """
             SELECT c FROM Card c
             WHERE c.id IN (:ids)
            """)
    List<Card> getAllCards(@Param("ids") List<Long> ids);

    @Query(value = """
             SELECT c FROM Card c WHERE c.id IN (:cardIds) ORDER BY c.index ASC
            """)
    List<Card> findAllByIdOrderByIndexASC(@Param("cardIds") List<Long> cardIds);

    @Query(value = """
             SELECT COUNT(*) FROM Card c
             INNER JOIN c.user u
             INNER JOIN c.workspaceList wl
             WHERE u.id = :userId
             AND  wl.id = :workspaceListId
            """)
    int checkCardLimit(@Param("userId") Long userId, @Param("workspaceListId") Long workspaceListId);

    @Query(value = """
            SELECT c FROM Card c
            INNER JOIN c.workspaceList wl
            WHERE wl.id IN (:ids)
              """)
    List<Card> getCardsByWorkspaceListIds(@Param("ids") List<Long> ids);
}

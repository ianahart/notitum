package com.hart.notitum.card;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    @Query(value = """
             SELECT c FROM Card c WHERE c.id IN (:cardIds) ORDER BY c.index ASC
            """)
    List<Card> findAllByIdOrderByIndexASC(@Param("cardIds") List<Long> cardIds);

}

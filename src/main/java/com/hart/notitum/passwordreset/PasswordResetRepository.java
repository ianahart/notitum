package com.hart.notitum.passwordreset;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {

    Optional<PasswordReset> findByToken(String token);

    @Modifying
    @Query(value = """
                DELETE FROM password_reset pr
                WHERE pr.user_id = :id
            """, nativeQuery = true)
    @Transactional
    void deleteUserPasswordResetsById(@Param("id") Long id);
}

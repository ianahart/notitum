package com.hart.notitum.user;

import java.util.Optional;

import com.hart.notitum.user.dto.MinimalUserDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query(value = """
             SELECT new com.hart.notitum.user.dto.MinimalUserDto(
             u.id AS id, u.firstName AS firstName, u.lastName AS lastName,
             u.bio AS bio
             ) FROM User u
             WHERE u.id = :userId
            """)
    MinimalUserDto getMinimalUser(@Param("userId") Long userId);
}

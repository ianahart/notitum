package com.hart.notitum.profile;

import com.hart.notitum.profile.dto.ProfileDto;
import com.hart.notitum.profile.dto.SyncProfileDto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query(value = """
            SELECT new com.hart.notitum.profile.dto.ProfileDto(
             p.id AS id,
             u.firstName AS firstName, u.lastName AS lastName,
             p.publicName AS publicName, p.jobTitle AS jobTitle,
            p.department AS department, p.organization AS organization,
            p.location AS location, p.locationVisible AS locationVisible,
            u.bio AS bio
            ) FROM Profile p
            INNER JOIN p.user u
            WHERE p.id = :profileId
                    """)
    ProfileDto getProfile(@Param("profileId") Long profileId);

    @Query(value = """
            SELECT new com.hart.notitum.profile.dto.SyncProfileDto(
             u.firstName AS firstName, u.lastName AS lastName,
             p.publicName AS publicName, p.jobTitle AS jobTitle,
            p.department AS department, p.organization AS organization,
            p.location AS location, p.locationVisible AS locationVisible
            ) FROM Profile p
            INNER JOIN p.user u
            WHERE u.id = :userId
            AND p.id = :profileId
                    """)
    SyncProfileDto syncProfile(@Param("userId") Long userId, @Param("profileId") Long profileId);

}

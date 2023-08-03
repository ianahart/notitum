package com.hart.notitum.profile;

import com.hart.notitum.profile.dto.ProfileDto;
import com.hart.notitum.profile.dto.SyncProfileDto;
import com.hart.notitum.profile.request.UpdateProfileRequest;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.user.UserService;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public ProfileService(ProfileRepository profileRepository,
            UserService userService,
            UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public Profile createProfile() {
        Profile profile = new Profile();

        return this.profileRepository.save(profile);
    }

    public ProfileDto getProfile(Long profileId) {
        return this.profileRepository.getProfile(profileId);
    }

    public SyncProfileDto syncProfile(Long userId, Long profileId) {
        return this.profileRepository.syncProfile(userId, profileId);
    }

    public Profile getProfileById(Long profileId) {
        return this.profileRepository
                .findById(profileId)
                .orElseThrow(() -> new NotFoundException("Profile not found"));
    }

    private void updateProfileField(String name, String field, Boolean locationVisible, Profile profile) {
        switch (name) {
            case "fullName":
                User user = profile.getUser();
                String[] names = field.split(" ");
                user.setFirstName(names[0]);
                user.setLastName(names[1]);
                this.userRepository.save(user);
                break;
            case "publicName":
                profile.setPublicName(field);
                break;
            case "jobTitle":
                profile.setJobTitle(field);
                break;
            case "department":
                profile.setDepartment(field);
                break;
            case "organization":
                profile.setOrganization(field);
                break;
            case "location":
                profile.setLocation(field);
                profile.setLocationVisible(locationVisible);
                break;
            default:
                break;
        }
        this.profileRepository.save(profile);

    }

    public void updateProfile(Long profileId, UpdateProfileRequest request) {
        Profile profile = getProfileById(profileId);
        if (profile.getUser().getId() != this.userService.getCurrentlyLoggedInUser().getId()) {
            throw new ForbiddenException("Cannot write to another person's profile");
        }
        updateProfileField(request.getName(), request.getValue(), request.getLocationVisible(), profile);
    }
}

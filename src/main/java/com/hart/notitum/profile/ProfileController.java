package com.hart.notitum.profile;

import com.hart.notitum.profile.request.CreateProfileRequest;
import com.hart.notitum.profile.request.UpdateProfileRequest;
import com.hart.notitum.profile.response.CreateProfileResponse;
import com.hart.notitum.profile.response.SyncProfileResponse;
import com.hart.notitum.profile.response.UpdateProfileResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/sync")
    public ResponseEntity<SyncProfileResponse> syncProfile(@RequestParam("userId") Long userId,
            @RequestParam("profileId") Long profileId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new SyncProfileResponse("success", this.profileService.syncProfile(userId, profileId)));
    }

    @PostMapping
    public ResponseEntity<CreateProfileResponse> createProfile(@RequestBody CreateProfileRequest request) {
        this.profileService.createProfile();
        return ResponseEntity.status(HttpStatus.CREATED).body(new CreateProfileResponse("success"));
    }

    @PatchMapping("/{profileId}")
    public ResponseEntity<UpdateProfileResponse> updateProfile(@PathVariable("profileId") Long profileId,

            @RequestBody UpdateProfileRequest request) {
        this.profileService.updateProfile(profileId, request);
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateProfileResponse("success"));
    }

}

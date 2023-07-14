package com.hart.notitum.activity;

import com.hart.notitum.activity.request.CreateActivityRequest;
import com.hart.notitum.activity.response.CreateActivityResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<CreateActivityResponse> createActivity(@RequestBody CreateActivityRequest request) {
        this.activityService.createActivity(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateActivityResponse("success"));
    }
}

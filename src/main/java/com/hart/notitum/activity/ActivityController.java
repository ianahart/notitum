package com.hart.notitum.activity;

import com.hart.notitum.activity.request.CreateActivityRequest;
import com.hart.notitum.activity.response.CreateActivityResponse;
import com.hart.notitum.activity.response.DeleteActivityResponse;
import com.hart.notitum.activity.response.GetActivitiesResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<GetActivitiesResponse> getActivities(
            @RequestParam("userId") Long userId,
            @RequestParam("workspaceId") Long workspaceId,
            @RequestParam("page") int page,
            @RequestParam("direction") String direction,
            @RequestParam("pageSize") int pageSize) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new GetActivitiesResponse("success",
                        this.activityService.getActivities(userId, workspaceId, page, direction, pageSize)));
    }

    @PostMapping
    public ResponseEntity<CreateActivityResponse> createActivity(@RequestBody CreateActivityRequest request) {
        this.activityService.createActivity(request.getText(), request.getUserId(), request.getWorkspaceId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CreateActivityResponse("success"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteActivityResponse> deleteActivity(@PathVariable("id") Long id) {
        this.activityService.deleteActivity(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new DeleteActivityResponse("success"));
    }
}

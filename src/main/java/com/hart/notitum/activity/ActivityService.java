package com.hart.notitum.activity;

import com.hart.notitum.activity.request.CreateActivityRequest;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public void createActivity(CreateActivityRequest request) {
        if (request.getUserId() == null) {
            throw new BadRequestException("User id not present in request");
        }
        User user = this.userRepository
                .findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User was not found from activity"));

        this.activityRepository.save(
                new Activity(request.getText(), user));
    }

}

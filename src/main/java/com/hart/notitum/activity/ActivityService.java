package com.hart.notitum.activity;

import com.hart.notitum.activity.dto.ActivitiesDto;
import com.hart.notitum.activity.dto.PaginationDto;
import com.hart.notitum.activity.request.CreateActivityRequest;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.util.MyUtils;
import com.hart.notitum.workspace.Workspace;
import com.hart.notitum.workspace.WorkspaceRepository;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository,
            UserRepository userRepository,
            WorkspaceRepository workspaceRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
    }

    public void createActivity(String text, Long userId, Long workspaceId) {
        if (userId == null) {
            throw new BadRequestException("User id not present in request");
        }
        User user = this.userRepository
                .findById(userId)
                .orElseThrow(() -> new NotFoundException("User was not found from activity"));

        Workspace workspace = this.workspaceRepository
                .findById(workspaceId)
                .orElseThrow(() -> new NotFoundException("Workspace was not found from activity"));

        this.activityRepository.save(
                new Activity(text, user, workspace));
    }

    public PaginationDto getActivities(Long userId, Long workspaceId, int page, String direction, int pageSize) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<ActivitiesDto> result = workspaceId == 0 ? this.activityRepository.getAllActivities(userId, paging)
                : this.activityRepository.getActivities(userId, workspaceId, paging);

        return new PaginationDto(
                result.getContent(),
                direction,
                pageSize,
                currentPage,
                result.getTotalPages());

    }

    public void deleteActivity(Long id) {
        if (id == null) {
            throw new BadRequestException("Cannot delete acitivty with no id");
        }

        this.activityRepository.deleteById(id);
    }

}

package com.hart.notitum.list;

import com.hart.notitum.list.dto.ReorderWorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListDto;
import com.hart.notitum.list.request.CreateWorkspaceListRequest;
import com.hart.notitum.advice.NotFoundException;

import java.util.List;
import java.util.Optional;

import com.hart.notitum.activity.ActivityService;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.user.UserService;
import com.hart.notitum.workspace.Workspace;
import com.hart.notitum.workspace.WorkspaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceListService {

    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceListRepository workspaceListRepository;
    private final ActivityService activityService;
    private final UserService userService;

    @Autowired
    public WorkspaceListService(
            UserRepository userRepository,
            WorkspaceRepository workspaceRepository,
            WorkspaceListRepository workspaceListRepository,
            ActivityService activityService,
            UserService userService) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceListRepository = workspaceListRepository;
        this.activityService = activityService;
        this.userService = userService;
    }

    public void updateWorkspaceList(WorkspaceList workspaceList, Long workspaceListId, Long workspaceId) {
        WorkspaceList prevWorkspaceList = this.workspaceListRepository.findById(workspaceListId)
                .orElseThrow(() -> new NotFoundException("WorkspaceList not found"));

        User user = this.userService.getCurrentlyLoggedInUser();
        if (user.getId() != prevWorkspaceList.getUser().getId()) {
            throw new ForbiddenException("Cannot update another person's list");
        }

        prevWorkspaceList.setTitle(workspaceList.getTitle());

        this.workspaceListRepository.save(prevWorkspaceList);

        this.activityService.createActivity(
                user.getFirstName() + " " + user.getLastName() + " changed list title from "
                        + prevWorkspaceList.getTitle() + " to " + workspaceList.getTitle(),
                user.getId(), workspaceId);
    }

    public boolean checkWorkspaceListLimit(Long userId, Long workspaceId, int limit) {
        Long count = this.workspaceListRepository.checkWorkspaceListLimit(userId, workspaceId);
        if (count > limit) {
            return true;
        }
        return false;
    }

    public List<WorkspaceListDto> getWorkspaceLists(Long userId, Long workspaceId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        if (user.getId() != userId) {
            throw new ForbiddenException("Cannot view another person's lists");
        }
        return this.workspaceListRepository.getWorkspaceLists(userId, workspaceId);
    }

    public WorkspaceListDto createWorkspaceList(CreateWorkspaceListRequest request) {
        User user = this.userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found creating list"));

        Workspace workspace = this.workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new NotFoundException("Workspace not found creating list"));

        if (request.getTitle() == null || request.getTitle().length() == 0) {
            throw new BadRequestException("Title missing creating list");
        }

        if (checkWorkspaceListLimit(user.getId(), workspace.getId(), 10)) {
            throw new BadRequestException("You have reached a limit of 10 lists, you can delete one.");
        }
        WorkspaceList workspaceList = new WorkspaceList(request.getTitle(),
                user,
                workspace,
                request.getIndex());

        this.workspaceListRepository.save(workspaceList);
        String text = user.getFirstName() + " " + user.getLastName() + " added a list called " + request.getTitle();
        this.activityService.createActivity(text, user.getId(), workspace.getId());
        return new WorkspaceListDto(
                workspaceList.getId(),
                workspaceList.getCreatedAt(),
                workspaceList.getxCoordinate(),
                workspaceList.getyCoordinate(),
                workspaceList.getIndex(),
                workspaceList.getTitle(),
                workspaceList.getUpdatedAt());
    }

    public void reorderWorkspaceLists(List<ReorderWorkspaceListDto> workspaceLists) {

        List<Long> workspaceListIds = workspaceLists.stream().map(v -> v.getWorkspaceListId()).toList();

        List<WorkspaceList> lists = this.workspaceListRepository.findAllByIdOrderByIndexASC(workspaceListIds);

        for (int i = 0; i < workspaceLists.size(); i++) {
            int index = i;
            Optional<ReorderWorkspaceListDto> wl = workspaceLists.stream()
                    .filter(x -> x.getWorkspaceListId() == lists.get(index).getId())
                    .findFirst();

            if (wl.isPresent()) {
                lists.get(index).setIndex(wl.get().getIndex());
            }
        }
        this.workspaceListRepository.saveAll(lists);
    }
}

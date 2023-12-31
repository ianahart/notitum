package com.hart.notitum.list;

import com.hart.notitum.list.dto.ReorderWorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListDto;
import com.hart.notitum.list.dto.WorkspaceListWithCardDto;
import com.hart.notitum.list.request.CreateWorkspaceListRequest;
import com.hart.notitum.member.MemberService;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.Card;

import java.util.List;
import java.util.ArrayList;
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
    private final MemberService memberService;

    @Autowired
    public WorkspaceListService(
            UserRepository userRepository,
            WorkspaceRepository workspaceRepository,
            WorkspaceListRepository workspaceListRepository,
            ActivityService activityService,
            UserService userService,
            MemberService memberService) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.workspaceListRepository = workspaceListRepository;
        this.activityService = activityService;
        this.userService = userService;
        this.memberService = memberService;
    }

    public void removeWorkspaceList(Long id, Long userId) {
        WorkspaceList workspaceList = this.workspaceListRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("workspace list id not found deleting"));
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceList.getUser().getId()) {
            throw new ForbiddenException("Cannot delete another person's list");
        }
        this.workspaceListRepository.deleteById(id);
    }

    public void updateWorkspaceList(WorkspaceListDto workspaceList, Long workspaceListId, Long workspaceId) {
        WorkspaceList prevWorkspaceList = this.workspaceListRepository.findById(workspaceListId)
                .orElseThrow(() -> new NotFoundException("WorkspaceList not found"));

        User user = this.userService.getCurrentlyLoggedInUser();
        if (user.getId() != prevWorkspaceList.getUser().getId()) {
            throw new ForbiddenException("Cannot update another person's list even if you are a member");
        }

        if (user.getId() != prevWorkspaceList.getUser().getId()) {
            throw new ForbiddenException("Cannot update another person's list");
        }
        this.activityService.createActivity(
                user.getFirstName() + " " + user.getLastName() + " changed list title from "
                        + prevWorkspaceList.getTitle() + " to " + workspaceList.getTitle(),
                user.getId(), workspaceId);

        prevWorkspaceList.setTitle(workspaceList.getTitle());

        this.workspaceListRepository.save(prevWorkspaceList);

    }

    public boolean checkWorkspaceListLimit(Long userId, Long workspaceId, int limit) {
        Long count = this.workspaceListRepository.checkWorkspaceListLimit(userId, workspaceId);
        if (count > limit) {
            return true;
        }
        return false;
    }

    public List<WorkspaceListWithCardDto> getWorkspaceLists(Long userId, Long workspaceId, Long workspaceUserId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        if (user.getId() != userId && !this.memberService.checkIfMemberExists(workspaceId, user.getId())) {
            throw new ForbiddenException("Cannot view another person's lists");
        }
        List<Long> ids = this.workspaceListRepository.getWorkspaceLists(workspaceUserId, workspaceId)
                .stream()
                .map(v -> v.getId()).toList();
        List<WorkspaceList> workspaceLists = this.workspaceListRepository.findAllByIdOrderByIndexASC(ids);
        List<WorkspaceListWithCardDto> workspaceListWithCards = new ArrayList<>();

        for (WorkspaceList x : workspaceLists) {
            workspaceListWithCards.add(
                    new WorkspaceListWithCardDto(
                            x.getCards(),
                            x.getId(),
                            x.getCreatedAt(),
                            x.getUpdatedAt(),
                            x.getIndex(),
                            x.getTitle(),
                            x.getxCoordinate(),
                            x.getyCoordinate()));
        }
        return workspaceListWithCards;

    }

    public WorkspaceListWithCardDto createWorkspaceList(CreateWorkspaceListRequest request) {
        User user = this.userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found creating list"));

        Workspace workspace = this.workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new NotFoundException("Workspace not found creating list"));

        if (this.userService.getCurrentlyLoggedInUser().getId() != workspace.getUser().getId()) {
            throw new ForbiddenException("Cannot create a list on another person's workspace even if you're a member");
        }

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
        List<Card> cards = new ArrayList<>();
        return new WorkspaceListWithCardDto(
                cards,
                workspaceList.getId(),
                workspaceList.getCreatedAt(),
                workspaceList.getUpdatedAt(),
                workspaceList.getIndex(),
                workspaceList.getTitle(),
                workspaceList.getxCoordinate(),
                workspaceList.getyCoordinate());

    }

    public void reorderWorkspaceLists(List<ReorderWorkspaceListDto> workspaceLists, Long workspaceUserId) {
        if (this.userService.getCurrentlyLoggedInUser().getId() != workspaceUserId) {
            throw new ForbiddenException("Cannot reorder another person's lists");
        }

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

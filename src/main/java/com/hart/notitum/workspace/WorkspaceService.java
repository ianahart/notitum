package com.hart.notitum.workspace;

import com.hart.notitum.workspace.dto.SearchWorkspaceDto;
import com.hart.notitum.workspace.dto.SearchWorkspacesPaginationDto;
import com.hart.notitum.workspace.dto.WorkspaceDto;
import com.hart.notitum.workspace.request.CreateWorkspaceRequest;
import com.hart.notitum.workspace.request.UpdateWorkspaceRequest;
import com.hart.notitum.workspace.response.CreateWorkspaceResponse;
import com.hart.notitum.user.UserService;

import java.util.List;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.member.MemberService;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final MemberService memberService;

    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository,
            UserRepository userRepository,
            UserService userService,
            MemberService memberService) {
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.memberService = memberService;
    }

    public SearchWorkspacesPaginationDto searchWorkspaces(String query, int pageSize, int page, String direction,
            Long userId) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id"));
        Page<SearchWorkspaceDto> result = this.workspaceRepository.searchWorkspaces(query.toLowerCase(), userId,
                paging);

        return new SearchWorkspacesPaginationDto(result.getContent(), pageSize, currentPage, direction,
                result.getTotalPages());

    }

    public void validateWorkspaceProperties(UpdateWorkspaceRequest request) {
        if (request.getTitle().trim().length() == 0 || request.getTitle().length() > 150) {
            throw new BadRequestException("Title must be between 1 and 150 characters");
        }
        if (!request.getBackground().startsWith("https://") && !request.getBackground().startsWith("#")) {
            throw new BadRequestException("Background is malformed");
        }

        if (request.getDescription().trim().length() == 0 || request.getDescription().length() > 150) {
            throw new BadRequestException("Description must be between 1 and 150 characters");
        }

    }

    public void updateWorkspace(UpdateWorkspaceRequest request, Long id) {

        Workspace workspace = this.workspaceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Work space not found with id " + id));

        User user = this.userService.getCurrentlyLoggedInUser();

        if (user.getId() != workspace.getUser().getId()) {
            throw new ForbiddenException("Cannot update another person's workspace");
        }

        if (request.getTitle() != null && request.getBackground() != null && request.getDescription() != null) {
            validateWorkspaceProperties(request);

        }

        workspace.setBackground(request.getBackground());
        workspace.setCreatedAt(request.getCreatedAt());
        workspace.setIsStarred(request.getIsStarred());
        workspace.setTitle(request.getTitle());
        workspace.setUpdatedAt(request.getUpdatedAt());
        workspace.setUser(user);
        workspace.setVisibility(request.getVisibility());
        workspace.setId(request.getWorkspaceId());
        workspace.setDescription(request.getDescription());

        this.workspaceRepository.save(workspace);

    }

    private void checkOwnerShip(Long userId) {
        User user = this.userService.getCurrentlyLoggedInUser();
        if (userId != user.getId()) {
            throw new ForbiddenException("You cannot view another user's workspaces.");
        }
    }

    private void updateTimestamp(Long workspaceId) {
        Workspace workspace = this.workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new NotFoundException("Workspace not found to update"));

        if (workspace.getToggleUpdate() == null) {
            workspace.setToggleUpdate(true);
        } else {
            if (workspace.getToggleUpdate() == false) {
                workspace.setToggleUpdate(true);
            } else {
                workspace.setToggleUpdate(false);
            }
        }

        this.workspaceRepository.save(workspace);

    }

    public WorkspaceDto getWorkspace(Long workspaceId, Long userId) {
        if (workspaceId == null || userId == null) {
            throw new BadRequestException("Workspace id or user id is missing");
        }

        WorkspaceDto workspace = this.workspaceRepository.getWorkspace(workspaceId);

        if (!this.memberService.checkIfMemberExists(workspaceId, this.userService.getCurrentlyLoggedInUser().getId())
                && workspace.getVisibility() != Visibility.PUBLIC) {
            checkOwnerShip(userId);
        }

        updateTimestamp(workspaceId);
        return workspace;
    }

    public List<WorkspaceDto> getWorkspaces(Long userId) {
        if (userId == null) {
            throw new BadRequestException("A user id was not present in the query string");
        }
        checkOwnerShip(userId);
        return this.workspaceRepository.getWorkspaces(userId);
    }

    public List<WorkspaceDto> getRecentWorkspaces(Long userId) {
        if (userId == null) {
            throw new BadRequestException("A user id was not present in the query string");
        }

        checkOwnerShip(userId);
        return this.workspaceRepository.getRecentWorkspaces(userId);
    }

    public List<WorkspaceDto> getStarredWorkspaces(Long userId, boolean isStarred) {
        if (userId == null) {
            throw new BadRequestException("A user id was not present in the query string");
        }

        checkOwnerShip(userId);
        return this.workspaceRepository.getStarredWorkspaces(userId, isStarred);
    }

    private boolean checkIfWorkspaceExists(String title) {
        if (title == null) {
            return false;
        }
        return this.workspaceRepository.checkIfWorkspaceExists(title);
    }

    public CreateWorkspaceResponse createWorkSpace(CreateWorkspaceRequest request) {
        if (checkIfWorkspaceExists(request.getTitle())) {
            throw new BadRequestException("A workspace with this title already exists");
        }

        if (request.getTitle().strip().length() > 150) {
            throw new BadRequestException("Workspace title cannot exceed 150 characters.");
        }

        User user = this.userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NotFoundException("User id not present in create workspace"));

        Visibility visibility = request.getVisibility().equals("WORKSPACE") ? Visibility.WORKSPACE
                : request.getVisibility().equals("PUBLIC") ? Visibility.PUBLIC : Visibility.PRIVATE;

        Workspace workspace = new Workspace(request.getTitle(),
                request.getBackground(),
                visibility,
                user,
                false);

        this.workspaceRepository.save(workspace);

        String title = MyUtils.slugify(request.getTitle());

        return new CreateWorkspaceResponse("success", title, user.getId(), workspace.getId());
    }
}

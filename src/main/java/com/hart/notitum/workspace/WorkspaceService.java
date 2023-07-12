package com.hart.notitum.workspace;

import com.hart.notitum.workspace.request.CreateWorkspaceRequest;
import com.hart.notitum.workspace.response.CreateWorkspaceResponse;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository,
            UserRepository userRepository) {
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
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

        this.workspaceRepository.save(
                new Workspace(request.getTitle(),
                        request.getBackground(),
                        visibility,
                        user));

        String title = MyUtils.slugify(request.getTitle());

        return new CreateWorkspaceResponse("success", title, user.getId());
    }
}

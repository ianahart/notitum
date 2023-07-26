package com.hart.notitum.label;

import java.util.List;

import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.Card;
import com.hart.notitum.card.CardRepository;
import com.hart.notitum.label.dto.LabelDto;
import com.hart.notitum.label.request.CreateLabelRequest;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.user.UserService;
import com.hart.notitum.workspace.Workspace;
import com.hart.notitum.workspace.WorkspaceRepository;

import org.springframework.stereotype.Service;

@Service
public class LabelService {
    private final LabelRepository labelRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final CardRepository cardRepository;

    public LabelService(
            LabelRepository labelRepository,
            UserService userService,
            UserRepository userRepository,
            WorkspaceRepository workspaceRepository,
            CardRepository cardRepository) {
        this.labelRepository = labelRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.cardRepository = cardRepository;
    }

    public List<LabelDto> getLabels(Long workspaceId) {
        return this.labelRepository.getLabels(workspaceId);
    }

    public void createLabel(CreateLabelRequest request) {
        Workspace workspace = this.workspaceRepository.findById(request.getWorkspaceId())
                .orElseThrow(() -> new NotFoundException("Workspace not found creating label"));

        if (this.userService.getCurrentlyLoggedInUser().getId() != workspace.getUser().getId()) {
            throw new ForbiddenException("Cannot create label unless you are the workspace owner");
        }

        Card card = this.cardRepository.findById(request.getCardId())
                .orElseThrow(() -> new NotFoundException("Card not found creating label"));

        this.labelRepository.save(new Label(this.userService.getCurrentlyLoggedInUser(), workspace, card,
                request.getTitle(), request.getColor(), false));
    }
}

package com.hart.notitum.comment;

import java.util.List;

import com.hart.notitum.comment.dto.CommentDto;
import com.hart.notitum.comment.dto.PaginationDto;
import com.hart.notitum.comment.request.CreateCommentRequest;
import com.hart.notitum.comment.request.UpdateCommentRequest;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserService;
import com.hart.notitum.util.MyUtils;
import com.hart.notitum.workspace.Workspace;
import com.hart.notitum.workspace.WorkspaceService;
import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.card.CardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final UserService userService;
    private final CardService cardService;
    private final CommentRepository commentRepository;
    private final WorkspaceService workspaceService;

    @Autowired
    public CommentService(
            CommentRepository commentRepository,
            UserService userService,
            WorkspaceService workspaceService,
            CardService cardService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.workspaceService = workspaceService;
        this.cardService = cardService;
    }

    public PaginationDto getComments(int page, int pageSize, Long cardId, String direction) {
        int currentPage = MyUtils.paginate(page, direction);
        Pageable paging = PageRequest.of(currentPage, pageSize, Sort.by("id").descending());
        Page<CommentDto> results = this.commentRepository.getComments(cardId, paging);

        return new PaginationDto(
                results.getContent(),
                currentPage, pageSize,
                results.getTotalPages(),
                direction);

    }

    public void deleteComment(Long commentId, Long userId, Long workspaceId) {
        canComment(userId, workspaceId);
        this.commentRepository.deleteById(commentId);
    }

    private void canComment(Long userId, Long workspaceId) {
        Workspace workspace = this.workspaceService.getWorkspaceById(workspaceId);
        List<Long> memberUserIds = workspace.getMembers().stream().map(m -> m.getUser().getId()).toList();

        if (userId != workspace.getUser().getId() && !memberUserIds.contains(userId)) {
            throw new ForbiddenException("Only the owner of workspace and members can interact with comments");
        }
    }

    public CommentDto createComment(CreateCommentRequest request) {
        canComment(request.getUserId(), request.getWorkspaceId());

        if (request.getComment().strip().length() == 0) {
            throw new BadRequestException("Please provide a comment");
        }
        User user = this.userService.getUserById(request.getUserId());
        Comment comment = this.commentRepository.save(
                new Comment(request.getComment(),
                        this.cardService.getCardById(request.getCardId()), user, false));

        return new CommentDto(
                comment.getId(),
                comment.getCreatedAt(),
                comment.getText(),
                user.getFirstName(),
                user.getLastName(),
                comment.getIsOpen(),
                user.getId());
    }

    public void updateComment(Long commentId, UpdateCommentRequest request) {
        canComment(request.getUserId(), request.getWorkspaceId());
        if (request.getText().strip().length() == 0) {
            throw new BadRequestException("Please provide a comment");
        }

        Comment comment = this.commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found with id " + commentId));

        comment.setText(request.getText());
        this.commentRepository.save(comment);
    }
}

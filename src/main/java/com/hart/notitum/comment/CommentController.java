package com.hart.notitum.comment;

import com.hart.notitum.comment.request.CreateCommentRequest;
import com.hart.notitum.comment.request.UpdateCommentRequest;
import com.hart.notitum.comment.response.CreateCommentResponse;
import com.hart.notitum.comment.response.DeleteCommentResponse;
import com.hart.notitum.comment.response.GetCommentsResponse;
import com.hart.notitum.comment.response.UpdateCommentResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<DeleteCommentResponse> deleteComment(
            @PathVariable("commentId") Long commentId,
            @RequestParam("userId") Long userId,
            @RequestParam("workspaceId") Long workspaceId,
            @RequestParam("workspaceTitle") String workspaceTitle,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName) {
        this.commentService.deleteComment(commentId, userId, workspaceId, workspaceTitle, firstName, lastName);
        return ResponseEntity.status(HttpStatus.OK).body(new DeleteCommentResponse("success"));
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<UpdateCommentResponse> updateComment(@PathVariable("commentId") Long commentId,
            @RequestBody UpdateCommentRequest request) {
        this.commentService.updateComment(commentId, request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UpdateCommentResponse("success"));
    }

    @GetMapping
    public ResponseEntity<GetCommentsResponse> getComments(
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam("cardId") Long cardId,
            @RequestParam("direction") String direction) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new GetCommentsResponse("success", this.commentService.getComments(page, pageSize, cardId, direction)));
    }

    @PostMapping
    public ResponseEntity<CreateCommentResponse> createComment(@RequestBody CreateCommentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateCommentResponse("success", this.commentService.createComment(request)));
    }
}

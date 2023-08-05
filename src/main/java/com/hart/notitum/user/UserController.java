package com.hart.notitum.user;

import com.hart.notitum.user.dto.UserDto;
import com.hart.notitum.user.request.UpdateEmailRequest;
import com.hart.notitum.user.request.UpdateUserRequest;
import com.hart.notitum.user.response.GetMinimalUserResponse;
import com.hart.notitum.user.response.UpdateEmailResponse;
import com.hart.notitum.user.response.UpdateUserResponse;
import com.hart.notitum.advice.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/{userId}/email")
    public ResponseEntity<UpdateEmailResponse> updateUserEmail(@PathVariable("userId") Long userId,
            @RequestBody UpdateEmailRequest request) {
        this.userService.updateUserEmail(userId, request.getEmail());
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateEmailResponse("success"));
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UpdateUserResponse> updateUser(@PathVariable("userId") Long userId,
            @RequestBody UpdateUserRequest request) {
        this.userService.updateUser(userId, request);
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateUserResponse("success"));
    }

    @GetMapping("/{userId}/minimal-details")
    public ResponseEntity<GetMinimalUserResponse> getMinimalUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetMinimalUserResponse("success", this.userService.getMinimalUser(userId)));
    }

    @GetMapping("/sync")
    public ResponseEntity<UserDto> syncUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            throw new NotFoundException("token not present in header");
        }

        return ResponseEntity.status(200).body(this.userService.getUserByToken(authHeader.substring(7)));
    }
}

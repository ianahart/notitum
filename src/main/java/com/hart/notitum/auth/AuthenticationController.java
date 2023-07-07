package com.hart.notitum.auth;

import java.io.IOException;

import com.hart.notitum.auth.request.LoginRequest;
import com.hart.notitum.auth.request.RegisterRequest;
import com.hart.notitum.auth.response.LoginResponse;
import com.hart.notitum.auth.response.RegisterResponse;
import com.hart.notitum.config.JwtService;
import com.hart.notitum.config.RefreshTokenService;
import com.hart.notitum.email.EmailService;
import com.hart.notitum.email.request.EmailRequest;
import com.hart.notitum.email.response.EmailResponse;
import com.hart.notitum.passwordreset.PasswordResetService;
import com.hart.notitum.passwordreset.request.PasswordResetRequest;
import com.hart.notitum.passwordreset.response.PasswordResetResponse;
import com.hart.notitum.refreshtoken.RefreshToken;
import com.hart.notitum.refreshtoken.request.RefreshTokenRequest;
import com.hart.notitum.refreshtoken.response.RefreshTokenResponse;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetService passwordResetService;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailService emailService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService,
            RefreshTokenService refreshTokenService,
            JwtService jwtService,
            PasswordResetService passwordResetService,
            UserService userService,
            EmailService emailService) {
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
        this.passwordResetService = passwordResetService;
        this.userService = userService;
        this.emailService = emailService;

    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        this.authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponse("success"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.authenticationService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        RefreshToken refreshToken = this.refreshTokenService.verifyRefreshToken(request.getRefreshToken());

        this.authenticationService.revokeAllUserTokens(refreshToken.getUser());
        String token = this.jwtService.generateToken(refreshToken.getUser());
        this.authenticationService.saveTokenWithUser(token, refreshToken.getUser());

        return ResponseEntity.status(200).body(
                new RefreshTokenResponse(token, refreshToken.getRefreshToken()));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<EmailResponse> sendEmail(@RequestBody EmailRequest request)
            throws IOException, TemplateException, MessagingException {
        User user = this.userService.getUserByEmail(request.getEmail());

        this.passwordResetService.deleteUserPasswordResetsById(user.getId());
        return ResponseEntity
                .status(200)
                .body(this.emailService.sendSimpleMail(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<PasswordResetResponse> passwordReset(
            @RequestBody PasswordResetRequest request) {

        this.passwordResetService
                .isResetTokenValid(request.getToken());

        this.userService.resetUserPassword(request);

        this.passwordResetService.deleteUserPasswordResetsById(request.getId());
        return ResponseEntity.status(200).body(
                new PasswordResetResponse("Password has been reset."));
    }

}

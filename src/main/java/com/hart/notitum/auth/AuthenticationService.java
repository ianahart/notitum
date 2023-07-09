package com.hart.notitum.auth;

import java.util.List;
import java.util.Optional;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.auth.request.LoginRequest;
import com.hart.notitum.auth.request.RegisterRequest;
import com.hart.notitum.auth.response.LoginResponse;
import com.hart.notitum.auth.response.RegisterResponse;
import com.hart.notitum.config.JwtService;
import com.hart.notitum.config.RefreshTokenService;
import com.hart.notitum.refreshtoken.RefreshToken;
import com.hart.notitum.token.Token;
import com.hart.notitum.token.TokenRepository;
import com.hart.notitum.token.TokenType;
import com.hart.notitum.user.Role;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;
import com.hart.notitum.user.dto.UserDto;
import com.hart.notitum.util.MyUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final RefreshTokenService refreshTokenService;

    @Autowired
    public AuthenticationService(
            PasswordEncoder passwordEncoder,
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            TokenRepository tokenRepository,
            RefreshTokenService refreshTokenService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.refreshTokenService = refreshTokenService;
    }

    public RegisterResponse register(RegisterRequest request) {
        User user = new User(
                MyUtils.capitalize(request.getFirstName()),
                MyUtils.capitalize(request.getLastName()),
                request.getEmail(),
                this.passwordEncoder.encode(request.getPassword()),
                false,
                request.getRole().equals("USER") ? Role.USER : Role.ADMIN);

        Optional<User> exists = this.userRepository.findByEmail(request.getEmail());

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        if (exists.isPresent()) {
            throw new BadRequestException("A user with that email already exists.");
        }
        this.userRepository.save(user);

        return new RegisterResponse("User created.");
    }

    public void revokeAllUserTokens(User user) {
        List<Token> tokens = this.tokenRepository.findAllValidTokens(user.getId());

        if (tokens.isEmpty()) {
            return;
        }

        tokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });

        this.tokenRepository.saveAll(tokens);
    }

    public LoginResponse login(LoginRequest request) {

        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));

        } catch (BadCredentialsException e) {
            throw new ForbiddenException("Credentials are invalid");
        }
        User user = this.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found by email."));
        String jwtToken = this.jwtService.generateToken(user);
        this.revokeAllUserTokens(user);
        user.setLoggedIn(true);
        this.userRepository.save(user);
        this.saveTokenWithUser(jwtToken, user);
        RefreshToken refreshToken = this.refreshTokenService.generateRefreshToken(user.getId());
        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn());

        return new LoginResponse(userDto, jwtToken, refreshToken.getRefreshToken());
    }

    public void saveTokenWithUser(String token, User user) {
        Token tokenToSave = new Token(token, TokenType.BEARER, false, false, user);
        this.tokenRepository.save(tokenToSave);

    }

}

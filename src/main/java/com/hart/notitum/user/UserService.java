package com.hart.notitum.user;

import com.hart.notitum.advice.BadRequestException;
import com.hart.notitum.advice.ForbiddenException;
import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.config.JwtService;
import com.hart.notitum.passwordreset.request.PasswordResetRequest;
import com.hart.notitum.user.dto.UserDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Service
public class UserService {
    @Value("${secretkey}")
    private String secretKey;

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractUserIdFromToken(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public UserDto getUserByToken(String token) {
        Claims claims = extractUserIdFromToken(token);

        User user = getUserByEmail(claims.getSubject());
        UserDto userDto = new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getAbbreviation(),
                user.getLoggedIn());
        return userDto;

    }

    public void resetUserPassword(PasswordResetRequest request) {

        User user = this.userRepository.findById(request.getId())
                .orElseThrow(() -> new NotFoundException("User not found."));

        if (!this.jwtService.isTokenValid(request.getToken(), user)) {
            throw new ForbiddenException("Link has expired.");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match.");
        }
        user.setPassword(this.passwordEncoder.encode(request.getNewPassword()));
        this.userRepository.save(user);
    }

    public User getCurrentlyLoggedInUser() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        String username = ((UserDetails) principal).getUsername();
        User user = this.userRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("Current user was not found."));

        return user;
    }

}

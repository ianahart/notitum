package com.hart.notitum.email;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import com.hart.notitum.advice.NotFoundException;
import com.hart.notitum.config.JwtService;
import com.hart.notitum.email.request.EmailRequest;
import com.hart.notitum.email.response.EmailResponse;
import com.hart.notitum.passwordreset.PasswordResetService;
import com.hart.notitum.user.User;
import com.hart.notitum.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JwtService jwtService;
    private final Configuration configuration;
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final PasswordResetService passwordResetService;

    @Autowired
    public EmailService(
            JwtService jwtService,
            Configuration configuration,
            JavaMailSender javaMailSender,
            UserRepository userRepository,
            PasswordResetService passwordResetService) {

        this.jwtService = jwtService;
        this.configuration = configuration;
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.passwordResetService = passwordResetService;
    }

    @Value("${emailsender}")
    private String sender;

    public EmailResponse sendSimpleMail(EmailRequest request)
            throws MessagingException, IOException, TemplateException {

        MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setFrom(sender);
        helper.setSubject("Reset Your Password");

        User user = this.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("A user with this email does not exist."));

        helper.setTo(request.getEmail());
        String emailContent = getEmailContent(user);
        helper.setText(emailContent, true);
        javaMailSender.send(mimeMessage);

        return new EmailResponse("Email sent successfully...");
    }

    String getEmailContent(User user) throws IOException, TemplateException {
        String token = this.jwtService.generateToken(user);
        this.passwordResetService.savePasswordReset(user, token);

        StringWriter stringWriter = new StringWriter();
        Map<String, Object> model = new HashMap<>();
        model.put("user", user);
        model.put("token", token);
        this.configuration.getTemplate("email.ftlh").process(model, stringWriter);
        return stringWriter.getBuffer().toString();
    }
}

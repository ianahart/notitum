package com.hart.notitum.passwordreset;

import java.sql.Timestamp;

import com.hart.notitum.user.User;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "password_reset")
public class PasswordReset {

    @Id
    @SequenceGenerator(name = "password_reset_sequence", sequenceName = "password_reset_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "password_reset_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "token")
    private String token;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    public PasswordReset() {

    }

    public PasswordReset(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public PasswordReset(Long id, Timestamp createdAt, String token, User user) {
        this.id = id;
        this.createdAt = createdAt;
        this.token = token;
        this.user = user;
    }

    public PasswordReset(Timestamp createdAt, String token, User user) {
        this.createdAt = createdAt;
        this.token = token;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public String getToken() {
        return token;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}

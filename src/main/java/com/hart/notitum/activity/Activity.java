package com.hart.notitum.activity;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hart.notitum.user.User;
import com.hart.notitum.workspace.Workspace;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "activity")
public class Activity {

    @Id
    @SequenceGenerator(name = "activity_sequence", sequenceName = "activity_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp()
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp()
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "text")
    private String text;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "workspace_id", referencedColumnName = "id")
    private Workspace workspace;

    public Activity() {

    }

    public Activity(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String text) {

        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.text = text;
    }

    public Activity(String text, User user, Workspace workspace) {
        this.text = text;
        this.user = user;
        this.workspace = workspace;
    }

    public Long getId() {
        return id;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}

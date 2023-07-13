package com.hart.notitum.workspace;

import java.sql.Timestamp;

import com.hart.notitum.user.User;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity()
@Table(name = "workspace")
public class Workspace {
    @Id
    @SequenceGenerator(name = "workspace_sequence", sequenceName = "workspace_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workspace_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "title")
    private String title;
    @Column(name = "background")
    private String background;
    @Column(name = "toggle_update")
    private Boolean toggleUpdate;
    @Column(name = "description")
    private String description;
    @Column(name = "is_starred")
    private Boolean isStarred;
    @Column(name = "visibility")
    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Workspace() {

    }

    public Workspace(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String title,
            String background,
            Boolean toggleUpdate,
            Visibility visibility,
            Boolean isStarred,
            String description

    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.title = title;
        this.background = background;
        this.toggleUpdate = toggleUpdate;
        this.visibility = visibility;
        this.isStarred = isStarred;
        this.description = description;
    }

    public Workspace(
            String title,
            String background,
            Visibility visibility,
            User user,
            Boolean isStarred

    ) {
        this.title = title;
        this.background = background;
        this.visibility = visibility;
        this.user = user;
        this.isStarred = isStarred;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getToggleUpdate() {
        return toggleUpdate;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getIsStarred() {
        return isStarred;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public String getBackground() {
        return background;
    }

    public Visibility getVisibility() {
        return visibility;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setToggleUpdate(Boolean toggleUpdate) {
        this.toggleUpdate = toggleUpdate;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public void setIsStarred(Boolean isStarred) {
        this.isStarred = isStarred;
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility;
    }
}

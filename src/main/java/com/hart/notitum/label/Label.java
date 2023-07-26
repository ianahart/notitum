package com.hart.notitum.label;

import java.sql.Timestamp;
import java.util.List;

import com.hart.notitum.activelabel.ActiveLabel;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity()
@Table(name = "label")
public class Label {
    @Id
    @SequenceGenerator(name = "label_sequence", sequenceName = "label_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "label_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "is_checked")
    private Boolean isChecked;
    @Column(name = "title", length = 50)
    private String title;
    @Column(name = "color", length = 50)
    private String color;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "workspace_id", referencedColumnName = "id")
    private Workspace workspace;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActiveLabel> activeLabels;

    public Label() {

    }

    public Label(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Boolean isChecked,
            String title,
            String color) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isChecked = isChecked;
        this.title = title;
        this.color = color;
    }

    public Label(
            User user,
            Workspace workspace,
            String title,
            String color,
            Boolean isChecked) {
        this.user = user;
        this.workspace = workspace;
        this.title = title;
        this.color = color;
        this.isChecked = isChecked;
    }

    public Long getId() {
        return id;
    }

    public List<ActiveLabel> getActiveLabels() {
        return activeLabels;
    }

    public User getUser() {
        return user;
    }

    public String getColor() {
        return color;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Boolean getIsChecked() {
        return isChecked;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setActiveLabels(List<ActiveLabel> activeLabels) {
        this.activeLabels = activeLabels;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setIsChecked(Boolean isChecked) {
        this.isChecked = isChecked;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }
}

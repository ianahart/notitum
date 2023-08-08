package com.hart.notitum.user;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.notitum.activity.Activity;
import com.hart.notitum.card.Card;
import com.hart.notitum.checklist.Checklist;
import com.hart.notitum.checklistitem.ChecklistItem;
import com.hart.notitum.comment.Comment;
import com.hart.notitum.label.Label;
import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.member.Member;
import com.hart.notitum.passwordreset.PasswordReset;
import com.hart.notitum.profile.Profile;
import com.hart.notitum.refreshtoken.RefreshToken;
import com.hart.notitum.token.Token;
import com.hart.notitum.workspace.Workspace;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity()
@Table(name = "_user")
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name = "_user_sequence", sequenceName = "_user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_user_sequence")
    @Column(name = "id")
    private Long id;
    @Column(name = "first_name", length = 200)
    private String firstName;
    @Column(name = "last_name", length = 200)
    private String lastName;
    @Column(name = "email", unique = true, length = 200)
    private String email;
    @JsonIgnore
    @Column(name = "password")
    private String password;
    @Column(name = "logged_in")
    private Boolean loggedIn;
    @Column(name = "bio", length = 300)
    private String bio;
    @Transient
    private String abbreviation;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Workspace> workspaces;

    @OneToMany()
    private List<Token> tokens;

    @OneToMany()
    private List<PasswordReset> passwordResets;

    @OneToMany()
    private List<RefreshToken> refreshTokens;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkspaceList> workspaceLists;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Checklist> checklists;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Label> labels;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChecklistItem> checklistItems;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    public User() {

    }

    public User(
            Long id,
            String firstName,
            String lastName,
            String email,
            String password,
            Boolean loggedIn,
            Role role,
            String bio) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
        this.role = role;
        this.bio = bio;
    }

    public User(
            String firstName,
            String lastName,
            String email,
            String password,
            Boolean loggedIn,
            Role role,
            Profile profile) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
        this.role = role;
        this.profile = profile;
    }

    public String getBio() {
        return bio;
    }

    public Long getId() {
        return id;

    }

    public List<Label> getLabels() {
        return labels;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public List<Checklist> getChecklists() {
        return checklists;
    }

    public Profile getProfile() {
        return profile;
    }

    public List<Member> getMembers() {
        return members;
    }

    public List<ChecklistItem> getChecklistItems() {
        return checklistItems;
    }

    public List<Card> getCards() {
        return cards;
    }

    public List<WorkspaceList> getWorkspaceLists() {
        return workspaceLists;
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public List<Workspace> getWorkspaces() {
        return workspaces;
    }

    public Boolean getLoggedIn() {
        return loggedIn;
    }

    public Role getRole() {
        return role;
    }

    public List<PasswordReset> getPasswordResets() {
        return passwordResets;
    }

    public String getEmail() {
        return email;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
    }

    public void setChecklistItems(List<ChecklistItem> checklistItems) {
        this.checklistItems = checklistItems;
    }

    public void setWorkspaceLists(List<WorkspaceList> workspaceLists) {
        this.workspaceLists = workspaceLists;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAbbreviation() {
        return firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase();
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setChecklists(List<Checklist> checklists) {
        this.checklists = checklists;
    }

    public void setWorkspaces(List<Workspace> workspaces) {
        this.workspaces = workspaces;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public void setPasswordResets(List<PasswordReset> passwordResets) {
        this.passwordResets = passwordResets;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setLoggedIn(Boolean loggedIn) {
        this.loggedIn = loggedIn;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName=" + lastName + '\'' +
                ", email=" + email +
                ", role=" + role +
                ", password=" + password +
                '}';
    }
}

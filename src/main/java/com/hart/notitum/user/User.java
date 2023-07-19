package com.hart.notitum.user;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hart.notitum.activity.Activity;
import com.hart.notitum.card.Card;
import com.hart.notitum.list.WorkspaceList;
import com.hart.notitum.passwordreset.PasswordReset;
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
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    @Column(name = "password")
    private String password;
    @Column(name = "logged_in")
    private Boolean loggedIn;
    @Transient
    private String abbreviation;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Workspace> workspaces;

    @OneToMany()
    private List<Token> tokens;

    @OneToMany()
    private List<PasswordReset> passwordResets;

    @OneToMany()
    private List<RefreshToken> refreshTokens;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Activity> activities;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkspaceList> workspaceLists;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards;

    public User() {

    }

    public User(
            Long id,
            String firstName,
            String lastName,
            String email,
            String password,
            Boolean loggedIn,
            Role role) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
        this.role = role;
    }

    public User(
            String firstName,
            String lastName,
            String email,
            String password,
            Boolean loggedIn,
            Role role) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.loggedIn = loggedIn;
        this.role = role;
    }

    public Long getId() {
        return id;

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

    public void setWorkspaceLists(List<WorkspaceList> workspaceLists) {
        this.workspaceLists = workspaceLists;
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

    public void setWorkspaces(List<Workspace> workspaces) {
        this.workspaces = workspaces;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public void setPasswordResets(List<PasswordReset> passwordResets) {
        this.passwordResets = passwordResets;
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

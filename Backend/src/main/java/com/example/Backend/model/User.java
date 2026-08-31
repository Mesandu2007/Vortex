package com.example.Backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String googleId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vote> votes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ElectionParticipant> joinedElections;


    public User() {
    }


    public User(Long id,
                String fullName,
                String email,
                String googleId,
                Role role,
                List<Vote> votes,
                List<ElectionParticipant> joinedElections) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.googleId = googleId;
        this.role = role;
        this.votes = votes;
        this.joinedElections = joinedElections;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    public List<Vote> getVotes() {
        return votes;
    }

    public void setVotes(List<Vote> votes) {
        this.votes = votes;
    }


    public List<ElectionParticipant> getJoinedElections() {
        return joinedElections;
    }

    public void setJoinedElections(List<ElectionParticipant> joinedElections) {
        this.joinedElections = joinedElections;
    }
}
package com.example.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "votes",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"user_id", "election_id"}
                )
        }
)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;


    @ManyToOne
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;


    private LocalDateTime createdAt;



    public Vote() {
    }



    public Vote(Long id, User user, Candidate candidate,
                Election election, LocalDateTime createdAt) {

        this.id = id;
        this.user = user;
        this.candidate = candidate;
        this.election = election;
        this.createdAt = createdAt;
    }



    @PrePersist
    public void beforeSave() {
        createdAt = LocalDateTime.now();
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public Candidate getCandidate() {
        return candidate;
    }


    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }


    public Election getElection() {
        return election;
    }


    public void setElection(Election election) {
        this.election = election;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

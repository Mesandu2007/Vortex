package com.example.Backend.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "election_participants",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"user_id", "election_id"}
                )
        }
)
public class ElectionParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;


    // No-Argument Constructor
    public ElectionParticipant() {
    }


    // Parameterized Constructor
    public ElectionParticipant(Long id, User user, Election election) {

        this.id = id;
        this.user = user;
        this.election = election;


    }


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


    public Election getElection() {
        return election;
    }


    public void setElection(Election election) {
        this.election = election;
    }
}
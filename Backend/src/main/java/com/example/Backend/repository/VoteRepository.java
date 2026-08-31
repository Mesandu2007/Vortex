package com.example.Backend.repository;

import com.example.Backend.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsByUserIdAndElectionId(Long userId, Long electionId);

    Optional<Vote> findByUserIdAndElectionId(Long userId, Long electionId);

    long countByCandidateId(Long candidateId);

    List<Vote> findByElectionId(Long electionId);

    long countByElectionId(Long electionId);



    void deleteAllByElectionId(Long electionId);

}
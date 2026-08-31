package com.example.Backend.repository;
import com.example.Backend.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByElectionId(Long electionId);

    long countByElectionId(Long electionId);

    void deleteAllByElectionId(Long electionId);

}

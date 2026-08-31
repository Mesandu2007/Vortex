package com.example.Backend.repository;

import com.example.Backend.model.ElectionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ElectionParticipantRepository extends JpaRepository<ElectionParticipant, Long> {

    Optional<ElectionParticipant> findByUserIdAndElectionId(Long userId, Long electionId);

    boolean existsByUserIdAndElectionId(Long userId, Long electionId);

    List<ElectionParticipant> findByElectionId(Long electionId);

    List<ElectionParticipant> findByUserId(Long userId);


    long countByElectionId(Long electionId);

    void deleteAllByElectionId(Long electionId);

}
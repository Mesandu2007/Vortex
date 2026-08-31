package com.example.Backend.service;

import com.example.Backend.model.*;
import com.example.Backend.repository.CandidateRepository;
import com.example.Backend.repository.ElectionParticipantRepository;
import com.example.Backend.repository.ElectionRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.repository.VoteRepository;
import com.example.Backend.dto.VoteDTO;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;


@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final ElectionParticipantRepository electionParticipantRepository;


    public VoteService(
            VoteRepository voteRepository,
            ElectionRepository electionRepository,
            CandidateRepository candidateRepository,
            UserRepository userRepository,
            ElectionParticipantRepository electionParticipantRepository
    ) {

        this.voteRepository = voteRepository;
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
        this.electionParticipantRepository =
                electionParticipantRepository;
    }




    public VoteDTO.VoteResponse castVote(
            Long userId,
            Long electionId,
            VoteDTO.VoteRequest request
    ) {

        // Find election
        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );



        if (election.getStatus() != ElectionStatus.ACTIVE) {

            throw new RuntimeException(
                    "Election is not active"
            );
        }



        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );



        if (!electionParticipantRepository
                .existsByUserIdAndElectionId(
                        userId,
                        electionId
                )) {

            throw new RuntimeException(
                    "User has not joined this election"
            );
        }


        // Check whether user already voted
        if (voteRepository
                .existsByUserIdAndElectionId(
                        userId,
                        electionId
                )) {

            throw new RuntimeException(
                    "User has already voted in this election"
            );
        }


        // Find candidate
        Candidate candidate =
                candidateRepository.findById(
                                request.getCandidateId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"
                                )
                        );


        if (!candidate.getElection()
                .getId()
                .equals(electionId)) {

            throw new RuntimeException(
                    "Candidate does not belong to this election"
            );
        }



        Vote vote = new Vote();

        vote.setUser(user);
        vote.setElection(election);
        vote.setCandidate(candidate);


        Vote savedVote =
                voteRepository.save(vote);



        VoteDTO.VoteResponse response =
                new VoteDTO.VoteResponse();


        response.setVoteId(
                savedVote.getId()
        );

        response.setMessage(
                "Vote submitted successfully"
        );


        return response;
    }




    public VoteDTO.VotingStatusResponse hasUserVoted(
            Long userId,
            Long electionId
    ) {

        electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Election not found"
                        )
                );


        boolean hasVoted =
                voteRepository
                        .existsByUserIdAndElectionId(
                                userId,
                                electionId
                        );


        VoteDTO.VotingStatusResponse response =
                new VoteDTO.VotingStatusResponse();


        response.setVoted(hasVoted);


        if (hasVoted) {

            response.setMessage(
                    "User has already voted"
            );

        } else {

            response.setMessage(
                    "User has not voted yet"
            );
        }


        return response;
    }



    public List<VoteDTO.VoterResponse> getVoterStatus(
            Long electionId
    ) {

        electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Election not found"
                        )
                );


        List<Vote> votes =
                voteRepository.findByElectionId(
                        electionId
                );


        List<VoteDTO.VoterResponse> responses =
                new ArrayList<>();


        for (Vote vote : votes) {

            User user = vote.getUser();


            VoteDTO.VoterResponse response =
                    new VoteDTO.VoterResponse();


            response.setFullName(
                    user.getFullName()
            );

            response.setEmail(
                    user.getEmail()
            );


            responses.add(response);
        }


        return responses;
    }
}
package com.example.Backend.service;

import com.example.Backend.repository.CandidateRepository;
import com.example.Backend.repository.ElectionRepository;
import com.example.Backend.repository.VoteRepository;
import org.springframework.stereotype.Service;
import com.example.Backend.dto.ResultDTO;
import com.example.Backend.model.Candidate;
import com.example.Backend.model.Election;
import com.example.Backend.model.ElectionStatus;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResultService {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

    public ResultService(ElectionRepository electionRepository, CandidateRepository candidateRepository, VoteRepository voteRepository){

        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;

    }

    public List<ResultDTO.CandidateResultResponse> getCandidateResults(
            Long electionId
    ) {


        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")
                );


        if (election.getStatus() != ElectionStatus.COMPLETED) {

            throw new RuntimeException(
                    "Results are available only after the election is completed"
            );

        }


        List<Candidate> candidates =
                candidateRepository.findByElectionId(electionId);


        List<ResultDTO.CandidateResultResponse> responses =
                new ArrayList<>();

        for (Candidate candidate : candidates) {

            ResultDTO.CandidateResultResponse response =
                    new ResultDTO.CandidateResultResponse();

            response.setCandidateId(candidate.getId());
            response.setCandidateName(candidate.getName());
            response.setIitId(candidate.getIitId());

            int voteCount = (int) voteRepository.countByCandidateId(candidate.getId());

            response.setVoteCount(voteCount);

            responses.add(response);
        }

        return responses;
    }
    public ResultDTO.WinnerResponse getWinner(Long electionId) {


        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")
                );


        if (election.getStatus() != ElectionStatus.COMPLETED) {

            throw new RuntimeException(
                    "Results are available only after the election is completed"
            );

        }


        List<Candidate> candidates =
                candidateRepository.findByElectionId(electionId);

        if (candidates.isEmpty()) {

            throw new RuntimeException("No candidates found");

        }

        Candidate winner = null;
        long highestVotes = -1;


        for (Candidate candidate : candidates) {

            long voteCount =
                    voteRepository.countByCandidateId(candidate.getId());

            if (voteCount > highestVotes) {

                highestVotes = voteCount;
                winner = candidate;

            }

        }

        ResultDTO.WinnerResponse response =
                new ResultDTO.WinnerResponse();

        response.setCandidateId(winner.getId());
        response.setCandidateName(winner.getName());
        response.setIitId(winner.getIitId());
        response.setVoteCount((int) highestVotes);

        return response;
    }



    public ResultDTO.ElectionResultResponse getElectionResults(
            Long electionId
    ) {


        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")
                );


        if (election.getStatus() != ElectionStatus.COMPLETED) {

            throw new RuntimeException(
                    "Results are available only after the election is completed"
            );

        }

        int totalVotes = (int) voteRepository.countByElectionId(electionId);
        ResultDTO.WinnerResponse winner =
                getWinner(electionId);


        List<ResultDTO.CandidateResultResponse> candidates =
                getCandidateResults(electionId);


        ResultDTO.ElectionResultResponse response =
                new ResultDTO.ElectionResultResponse();

        response.setElectionId(election.getId());
        response.setElectionTitle(election.getTitle());
        response.setTotalVotes(totalVotes);
        response.setWinner(winner);
        response.setCandidates(candidates);

        return response;

    }


}

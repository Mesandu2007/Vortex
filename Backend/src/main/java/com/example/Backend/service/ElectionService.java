package com.example.Backend.service;

import com.example.Backend.dto.ElectionDTO;

import com.example.Backend.model.*;

import com.example.Backend.repository.UserRepository;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.repository.CandidateRepository;
import com.example.Backend.repository.ElectionParticipantRepository;
import com.example.Backend.repository.ElectionRepository;
import com.example.Backend.repository.VoteRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;


@Service
public class ElectionService {


    private final ElectionRepository electionRepository;
    private final AdminRepository adminRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;
    private final ElectionParticipantRepository electionParticipantRepository;
    private final UserRepository userRepository;


    public ElectionService(
            ElectionRepository electionRepository,
            AdminRepository adminRepository,
            CandidateRepository candidateRepository,
            VoteRepository voteRepository,
            ElectionParticipantRepository electionParticipantRepository,
            UserRepository userRepository
    ) {

        this.electionRepository = electionRepository;
        this.adminRepository = adminRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
        this.electionParticipantRepository = electionParticipantRepository;
        this.userRepository = userRepository;

    }



    public ElectionDTO.ElectionResponse createElection(
            Long adminId,
            ElectionDTO.CreateElectionRequest request
    ) {

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found")
                );


        Election election = new Election();

        election.setTitle(request.getTitle());
        election.setPositionName(request.getPositionName());
        election.setDescription(request.getDescription());
        election.setStartDate(request.getStartDate());
        election.setEndDate(request.getEndDate());


        String accessCode = UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();


        election.setAccessCode(accessCode);

        election.setStatus(ElectionStatus.DRAFT);

        election.setAdmin(admin);


        Election savedElection =
                electionRepository.save(election);


        ElectionDTO.ElectionResponse response =
                new ElectionDTO.ElectionResponse();


        response.setId(savedElection.getId());
        response.setTitle(savedElection.getTitle());
        response.setPositionName(savedElection.getPositionName());
        response.setDescription(savedElection.getDescription());
        response.setAccessCode(savedElection.getAccessCode());
        response.setStartDate(savedElection.getStartDate());
        response.setEndDate(savedElection.getEndDate());
        response.setStatus(savedElection.getStatus());


        return response;
    }




    public List<ElectionDTO.ElectionResponse> getAdminElections(
            Long adminId
    ) {

        List<Election> elections =
                electionRepository.findByAdminId(adminId);


        List<ElectionDTO.ElectionResponse> responses =
                new ArrayList<>();


        for (Election election : elections) {

            ElectionDTO.ElectionResponse response =
                    new ElectionDTO.ElectionResponse();


            response.setId(election.getId());
            response.setTitle(election.getTitle());
            response.setPositionName(election.getPositionName());
            response.setDescription(election.getDescription());
            response.setAccessCode(election.getAccessCode());
            response.setStartDate(election.getStartDate());
            response.setEndDate(election.getEndDate());
            response.setStatus(election.getStatus());


            responses.add(response);
        }


        return responses;
    }



    public ElectionDTO.ElectionResponse getElectionById(
            Long adminId,
            Long electionId
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }


        ElectionDTO.ElectionResponse response =
                new ElectionDTO.ElectionResponse();


        response.setId(election.getId());
        response.setTitle(election.getTitle());
        response.setPositionName(election.getPositionName());
        response.setDescription(election.getDescription());
        response.setAccessCode(election.getAccessCode());
        response.setStartDate(election.getStartDate());
        response.setEndDate(election.getEndDate());
        response.setStatus(election.getStatus());


        return response;
    }




    public ElectionDTO.ElectionResponse updateElection(
            Long adminId,
            Long electionId,
            ElectionDTO.CreateElectionRequest request
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }


        if (election.getStatus() != ElectionStatus.DRAFT) {

            throw new RuntimeException(
                    "Election cannot be updated after it starts"
            );

        }


        election.setTitle(request.getTitle());
        election.setPositionName(request.getPositionName());
        election.setDescription(request.getDescription());

        election.setStartDate(request.getStartDate());
        election.setEndDate(request.getEndDate());


        Election updatedElection =
                electionRepository.save(election);


        ElectionDTO.ElectionResponse response =
                new ElectionDTO.ElectionResponse();


        response.setId(updatedElection.getId());

        response.setTitle(
                updatedElection.getTitle()
        );

        response.setPositionName(
                updatedElection.getPositionName()
        );

        response.setDescription(
                updatedElection.getDescription()
        );

        response.setAccessCode(
                updatedElection.getAccessCode()
        );

        response.setStartDate(
                updatedElection.getStartDate()
        );

        response.setEndDate(
                updatedElection.getEndDate()
        );

        response.setStatus(
                updatedElection.getStatus()
        );


        return response;
    }




    @Transactional
    public void deleteElection(
            Long adminId,
            Long electionId
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }


        if (election.getStatus() == ElectionStatus.ACTIVE) {

            throw new RuntimeException(
                    "Active elections cannot be deleted"
            );

        }


        voteRepository.deleteAllByElectionId(electionId);

        electionParticipantRepository
                .deleteAllByElectionId(electionId);

        candidateRepository
                .deleteAllByElectionId(electionId);

        electionRepository.delete(election);
    }




    public ElectionDTO.ElectionResponse startElection(
            Long adminId,
            Long electionId
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }


        if (election.getStatus() != ElectionStatus.DRAFT) {

            throw new RuntimeException(
                    "Only draft elections can be started"
            );

        }


        long candidateCount =
                candidateRepository.countByElectionId(
                        electionId
                );


        if (candidateCount < 2) {

            throw new RuntimeException(
                    "An election must have at least 2 candidates"
            );

        }


        election.setStatus(ElectionStatus.ACTIVE);


        Election startedElection =
                electionRepository.save(election);


        ElectionDTO.ElectionResponse response =
                new ElectionDTO.ElectionResponse();


        response.setId(startedElection.getId());
        response.setTitle(startedElection.getTitle());
        response.setPositionName(
                startedElection.getPositionName()
        );
        response.setDescription(
                startedElection.getDescription()
        );
        response.setAccessCode(
                startedElection.getAccessCode()
        );
        response.setStartDate(
                startedElection.getStartDate()
        );
        response.setEndDate(
                startedElection.getEndDate()
        );
        response.setStatus(
                startedElection.getStatus()
        );


        return response;
    }




    public ElectionDTO.ElectionResponse endElection(
            Long adminId,
            Long electionId
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }


        if (election.getStatus() != ElectionStatus.ACTIVE) {

            throw new RuntimeException(
                    "Only active elections can be ended"
            );

        }


        election.setStatus(
                ElectionStatus.COMPLETED
        );


        Election endedElection =
                electionRepository.save(election);


        ElectionDTO.ElectionResponse response =
                new ElectionDTO.ElectionResponse();


        response.setId(endedElection.getId());
        response.setTitle(endedElection.getTitle());
        response.setPositionName(
                endedElection.getPositionName()
        );
        response.setDescription(
                endedElection.getDescription()
        );
        response.setAccessCode(
                endedElection.getAccessCode()
        );
        response.setStartDate(
                endedElection.getStartDate()
        );
        response.setEndDate(
                endedElection.getEndDate()
        );
        response.setStatus(
                endedElection.getStatus()
        );


        return response;
    }



    public ElectionDTO.ElectionStatsResponse getElectionStats(
            Long adminId,
            Long electionId
    ) {


        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );



        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException(
                    "Access denied"
            );

        }



        long totalCandidates =
                candidateRepository.countByElectionId(
                        electionId
                );



        long totalParticipants =
                electionParticipantRepository
                        .countByElectionId(
                                electionId
                        );


        // Count total votes
        long totalVotes =
                voteRepository.countByElectionId(
                        electionId
                );


        // Create response
        ElectionDTO.ElectionStatsResponse response =
                new ElectionDTO.ElectionStatsResponse();


        response.setElectionId(
                election.getId()
        );

        response.setTitle(
                election.getTitle()
        );

        response.setStatus(
                election.getStatus()
        );

        response.setTotalCandidates(
                totalCandidates
        );

        response.setTotalParticipants(
                totalParticipants
        );

        response.setTotalVotes(
                totalVotes
        );



        List<Candidate> candidates =
                candidateRepository.findByElectionId(
                        electionId
                );


        List<ElectionDTO.CandidateVoteResponse> candidateResults =
                new ArrayList<>();


        for (Candidate candidate : candidates) {

            long voteCount =
                    voteRepository.countByCandidateId(
                            candidate.getId()
                    );


            ElectionDTO.CandidateVoteResponse result =
                    new ElectionDTO.CandidateVoteResponse();


            result.setCandidateId(
                    candidate.getId()
            );

            result.setCandidateName(
                    candidate.getName()
            );

            result.setImageUrl(
                    candidate.getPhoto()
            );

            result.setVoteCount(
                    voteCount
            );


            candidateResults.add(result);
        }


        response.setCandidateResults(
                candidateResults
        );


        return response;
    }

    public ElectionDTO.UserElectionResponse joinElection(
            Long userId,
            String accessCode
    ) {

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        Election election =
                electionRepository
                        .findByAccessCode(accessCode)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid election access code"
                                )
                        );


        if (election.getStatus() != ElectionStatus.DRAFT &&
                election.getStatus() != ElectionStatus.ACTIVE) {

            throw new RuntimeException(
                    "Cannot access a completed election"
            );
        }


        boolean alreadyJoined =
                electionParticipantRepository
                        .findByUserIdAndElectionId(
                                userId,
                                election.getId()
                        )
                        .isPresent();


        if (!alreadyJoined) {

            ElectionParticipant participant =
                    new ElectionParticipant();

            participant.setUser(user);
            participant.setElection(election);

            electionParticipantRepository.save(
                    participant
            );

        }


        List<Candidate> candidates =
                candidateRepository.findByElectionId(
                        election.getId()
                );


        List<ElectionDTO.CandidateResponse>
                candidateResponses =
                new ArrayList<>();


        for (Candidate candidate : candidates) {

            ElectionDTO.CandidateResponse candidateResponse =
                    new ElectionDTO.CandidateResponse();


            candidateResponse.setId(
                    candidate.getId()
            );

            candidateResponse.setName(
                    candidate.getName()
            );

            candidateResponse.setIitId(
                    candidate.getIitId()
            );

            candidateResponse.setDepartment(
                    candidate.getDepartment()
            );

            candidateResponse.setYear(
                    candidate.getYear()
            );

            candidateResponse.setPhoto(
                    candidate.getPhoto()
            );

            candidateResponse.setBiography(
                    candidate.getBiography()
            );

            candidateResponse.setManifesto(
                    candidate.getManifesto()
            );


            candidateResponses.add(
                    candidateResponse
            );

        }


        ElectionDTO.UserElectionResponse response =
                new ElectionDTO.UserElectionResponse();


        response.setId(
                election.getId()
        );

        response.setTitle(
                election.getTitle()
        );

        response.setPositionName(
                election.getPositionName()
        );

        response.setDescription(
                election.getDescription()
        );

        response.setAccessCode(
                election.getAccessCode()
        );

        response.setStartDate(
                election.getStartDate()
        );

        response.setEndDate(
                election.getEndDate()
        );

        response.setStatus(
                election.getStatus()
        );

        response.setCandidates(
                candidateResponses
        );


        return response;
    }



    public List<ElectionDTO.ParticipantResponse> getParticipants(
            Long adminId,
            Long electionId
    ) {

        Election election =
                electionRepository.findById(electionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Election not found"
                                )
                        );


        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException(
                    "Access denied"
            );

        }


        List<Vote> votes =
                voteRepository.findByElectionId(
                        electionId
                );


        List<ElectionDTO.ParticipantResponse> responses =
                new ArrayList<>();


        for (Vote vote : votes) {

            User user =
                    vote.getUser();


            ElectionDTO.ParticipantResponse response =
                    new ElectionDTO.ParticipantResponse();


            response.setUserId(
                    user.getId()
            );

            response.setFullName(
                    user.getFullName()
            );

            response.setEmail(
                    user.getEmail()
            );


            responses.add(
                    response
            );

        }


        return responses;
    }

























    public ElectionDTO.DashboardResponse getAdminDashboard(
            Long adminId
    ) {



        List<Election> elections =
                electionRepository.findByAdminId(adminId);


        // Count elections

        long totalElections =
                elections.size();


        long activeElections =
                elections.stream()
                        .filter(election ->
                                election.getStatus()
                                        == ElectionStatus.ACTIVE
                        )
                        .count();


        long draftElections =
                elections.stream()
                        .filter(election ->
                                election.getStatus()
                                        == ElectionStatus.DRAFT
                        )
                        .count();


        long completedElections =
                elections.stream()
                        .filter(election ->
                                election.getStatus()
                                        == ElectionStatus.COMPLETED
                        )
                        .count();



        List<Election> recentElections =
                electionRepository
                        .findTop5ByAdminIdOrderByIdDesc(
                                adminId
                        );




        List<ElectionDTO.ElectionResponse>
                recentElectionResponses =
                new ArrayList<>();


        for (Election election : recentElections) {

            ElectionDTO.ElectionResponse response =
                    new ElectionDTO.ElectionResponse();


            response.setId(
                    election.getId()
            );

            response.setTitle(
                    election.getTitle()
            );

            response.setPositionName(
                    election.getPositionName()
            );

            response.setDescription(
                    election.getDescription()
            );

            response.setAccessCode(
                    election.getAccessCode()
            );

            response.setStartDate(
                    election.getStartDate()
            );

            response.setEndDate(
                    election.getEndDate()
            );

            response.setStatus(
                    election.getStatus()
            );


            recentElectionResponses.add(response);
        }




        ElectionDTO.DashboardResponse response =
                new ElectionDTO.DashboardResponse();


        response.setTotalElections(
                totalElections
        );

        response.setActiveElections(
                activeElections
        );

        response.setDraftElections(
                draftElections
        );

        response.setCompletedElections(
                completedElections
        );

        response.setRecentElections(
                recentElectionResponses
        );


        return response;
    }



}

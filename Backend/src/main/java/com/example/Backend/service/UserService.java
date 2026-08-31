
package com.example.Backend.service;

import com.example.Backend.dto.UserDashboardDTO;
import com.example.Backend.model.Election;
import com.example.Backend.model.ElectionParticipant;
import com.example.Backend.model.ElectionStatus;
import com.example.Backend.model.User;
import com.example.Backend.model.Vote;
import com.example.Backend.repository.ElectionParticipantRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.repository.VoteRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final ElectionParticipantRepository electionParticipantRepository;
    private final VoteRepository voteRepository;


    public UserService(
            UserRepository userRepository,
            ElectionParticipantRepository electionParticipantRepository,
            VoteRepository voteRepository
    ) {

        this.userRepository = userRepository;
        this.electionParticipantRepository =
                electionParticipantRepository;
        this.voteRepository =
                voteRepository;

    }


    public UserDashboardDTO.DashboardResponse getUserDashboard(
            String email
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        List<ElectionParticipant> participants =
                electionParticipantRepository
                        .findByUserId(user.getId());


        List<UserDashboardDTO.JoinedElectionResponse>
                joinedElections =
                new ArrayList<>();


        int activeElections = 0;

        int completedElections = 0;


        for (ElectionParticipant participant : participants) {

            Election election =
                    participant.getElection();


            UserDashboardDTO.JoinedElectionResponse
                    response =
                    new UserDashboardDTO.JoinedElectionResponse();


            response.setId(
                    election.getId()
            );


            response.setTitle(
                    election.getTitle()
            );


            response.setPositionName(
                    election.getPositionName()
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


            if (election.getStatus()
                    == ElectionStatus.ACTIVE) {

                activeElections++;

            }


            if (election.getStatus()
                    == ElectionStatus.COMPLETED) {

                completedElections++;

            }


            Optional<Vote> vote =
                    voteRepository.findByUserIdAndElectionId(
                            user.getId(),
                            election.getId()
                    );


            if (vote.isPresent()) {

                response.setHasVoted(true);


                response.setVotedCandidateName(
                        vote.get()
                                .getCandidate()
                                .getName()
                );

            } else {

                response.setHasVoted(false);

                response.setVotedCandidateName(
                        null
                );

            }


            joinedElections.add(
                    response
            );

        }


        UserDashboardDTO.DashboardResponse dashboard =
                new UserDashboardDTO.DashboardResponse();


        dashboard.setFullName(
                user.getFullName()
        );


        dashboard.setEmail(
                user.getEmail()
        );


        dashboard.setTotalJoinedElections(
                joinedElections.size()
        );


        dashboard.setActiveElections(
                activeElections
        );


        dashboard.setCompletedElections(
                completedElections
        );


        dashboard.setJoinedElections(
                joinedElections
        );


        return dashboard;

    }


    public User getUserProfile(
            String email
    ) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

    }

}


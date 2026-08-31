package com.example.Backend.controller;

import com.example.Backend.dto.VoteDTO;
import com.example.Backend.model.User;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.service.VoteService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/votes")
public class VoteController {


    private final VoteService voteService;
    private final UserRepository userRepository;


    public VoteController(
            VoteService voteService,
            UserRepository userRepository
    ) {

        this.voteService = voteService;
        this.userRepository = userRepository;

    }




    @PostMapping("/election/{electionId}")
    public ResponseEntity<VoteDTO.VoteResponse> castVote(

            @PathVariable Long electionId,

            @RequestBody VoteDTO.VoteRequest request,

            Authentication authentication

    ) {


        Long userId = getUserId(authentication);


        VoteDTO.VoteResponse response =
                voteService.castVote(
                        userId,
                        electionId,
                        request
                );


        return ResponseEntity.ok(response);

    }




    @GetMapping("/election/{electionId}/status")
    public ResponseEntity<VoteDTO.VotingStatusResponse>
    hasUserVoted(

            @PathVariable Long electionId,

            Authentication authentication

    ) {


        Long userId = getUserId(authentication);


        VoteDTO.VotingStatusResponse response =
                voteService.hasUserVoted(
                        userId,
                        electionId
                );


        return ResponseEntity.ok(response);

    }




    @GetMapping("/election/{electionId}/voters")
    public ResponseEntity<List<VoteDTO.VoterResponse>>
    getVoterStatus(

            @PathVariable Long electionId

    ) {


        List<VoteDTO.VoterResponse> voters =
                voteService.getVoterStatus(
                        electionId
                );


        return ResponseEntity.ok(voters);

    }




    private Long getUserId(
            Authentication authentication
    ) {


        String email = authentication.getName();


        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        return user.getId();

    }

}
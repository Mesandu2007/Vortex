
package com.example.Backend.controller;

import com.example.Backend.dto.ElectionDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.model.User;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.service.ElectionService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/elections")
public class ElectionController {


    private final ElectionService electionService;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;


    public ElectionController(
            ElectionService electionService,
            AdminRepository adminRepository,
            UserRepository userRepository
    ) {

        this.electionService = electionService;
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;

    }



    @PostMapping
    public ResponseEntity<ElectionDTO.ElectionResponse> createElection(
            @RequestBody ElectionDTO.CreateElectionRequest request,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionResponse response =
                electionService.createElection(
                        adminId,
                        request
                );


        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );

    }



    @GetMapping
    public ResponseEntity<List<ElectionDTO.ElectionResponse>> getElections(
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        List<ElectionDTO.ElectionResponse> elections =
                electionService.getAdminElections(adminId);


        return ResponseEntity.ok(elections);

    }




    @GetMapping("/{id}")
    public ResponseEntity<ElectionDTO.ElectionResponse> getElectionById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionResponse response =
                electionService.getElectionById(
                        adminId,
                        id
                );


        return ResponseEntity.ok(response);

    }




    @PutMapping("/{id}")
    public ResponseEntity<ElectionDTO.ElectionResponse> updateElection(
            @PathVariable Long id,
            @RequestBody ElectionDTO.CreateElectionRequest request,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionResponse response =
                electionService.updateElection(
                        adminId,
                        id,
                        request
                );


        return ResponseEntity.ok(response);

    }




    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteElection(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        electionService.deleteElection(
                adminId,
                id
        );


        return ResponseEntity.ok(
                "Election deleted successfully"
        );

    }



    @PostMapping("/{id}/start")
    public ResponseEntity<ElectionDTO.ElectionResponse> startElection(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionResponse response =
                electionService.startElection(
                        adminId,
                        id
                );


        return ResponseEntity.ok(response);

    }




    @PostMapping("/{id}/complete")
    public ResponseEntity<ElectionDTO.ElectionResponse> completeElection(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionResponse response =
                electionService.endElection(
                        adminId,
                        id
                );


        return ResponseEntity.ok(response);

    }



    @PostMapping("/join")
    public ResponseEntity<ElectionDTO.UserElectionResponse> joinElection(
            @RequestParam String accessCode,
            Authentication authentication
    ) {

        Long userId = getUserId(authentication);


        ElectionDTO.UserElectionResponse response =
                electionService.joinElection(
                        userId,
                        accessCode
                );


        return ResponseEntity.ok(response);
    }









    @GetMapping("/{id}/participants")
    public ResponseEntity<List<ElectionDTO.ParticipantResponse>> getParticipants(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        List<ElectionDTO.ParticipantResponse> participants =
                electionService.getParticipants(
                        adminId,
                        id
                );


        return ResponseEntity.ok(participants);

    }




    @GetMapping("/{id}/stats")
    public ResponseEntity<ElectionDTO.ElectionStatsResponse> getElectionStats(
            @PathVariable Long id,
            Authentication authentication
    ) {

        Long adminId = getAdminId(authentication);


        ElectionDTO.ElectionStatsResponse response =
                electionService.getElectionStats(
                        adminId,
                        id
                );


        return ResponseEntity.ok(response);

    }



    @GetMapping("/dashboard")
    public ResponseEntity<ElectionDTO.DashboardResponse> getAdminDashboard(Authentication authentication){


        Long adminId = getAdminId(authentication);

        ElectionDTO.DashboardResponse response =
                electionService.getAdminDashboard(
                        adminId
                );

        return ResponseEntity.ok(response);

    }





    private Long getAdminId(
            Authentication authentication
    ) {

        String email = authentication.getName();


        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Admin not found"
                        )
                );


        return admin.getId();

    }




    private Long getUserId(
            Authentication authentication
    ) {

        String email = authentication.getName();


        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        return user.getId();

    }

}


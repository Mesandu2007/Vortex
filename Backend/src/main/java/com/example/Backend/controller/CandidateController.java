package com.example.Backend.controller;

import com.example.Backend.dto.CandidateDTO;
import com.example.Backend.model.Admin;
import com.example.Backend.repository.AdminRepository;
import com.example.Backend.service.CandidateService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;
    private final AdminRepository adminRepository;

    public CandidateController(
            CandidateService candidateService,
            AdminRepository adminRepository
    ) {

        this.candidateService = candidateService;
        this.adminRepository = adminRepository;

    }




    @PostMapping(
            value = "/election/{electionId}",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<CandidateDTO.CandidateResponse> addCandidate(

            @PathVariable Long electionId,

            @RequestPart("candidate")
            CandidateDTO.CreateCandidateRequest request,

            @RequestPart(value = "image", required = false)
            MultipartFile image,

            Authentication authentication

    ) {

        Long adminId = getAdminId(authentication);

        CandidateDTO.CandidateResponse response =
                candidateService.addCandidate(
                        adminId,
                        electionId,
                        request,
                        image
                );

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }




    @GetMapping("/election/{electionId}")
    public ResponseEntity<List<CandidateDTO.CandidateSummaryResponse>>
    getCandidatesByElection(
            @PathVariable Long electionId
    ) {

        List<CandidateDTO.CandidateSummaryResponse> candidates =
                candidateService.getCandidatesByElection(
                        electionId
                );

        return ResponseEntity.ok(candidates);
    }




    @GetMapping(
            "/election/{electionId}/candidate/{candidateId}"
    )
    public ResponseEntity<CandidateDTO.CandidateResponse>
    getCandidateById(
            @PathVariable Long electionId,
            @PathVariable Long candidateId
    ) {

        CandidateDTO.CandidateResponse response =
                candidateService.getCandidateById(
                        electionId,
                        candidateId
                );

        return ResponseEntity.ok(response);
    }




    @PutMapping(
            value = "/election/{electionId}/candidate/{candidateId}",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<CandidateDTO.CandidateResponse>
    updateCandidate(

            @PathVariable Long electionId,

            @PathVariable Long candidateId,

            @RequestPart("candidate")
            CandidateDTO.UpdateCandidateRequest request,

            @RequestPart(value = "image", required = false)
            MultipartFile image,

            Authentication authentication

    ) {

        Long adminId = getAdminId(authentication);

        CandidateDTO.CandidateResponse response =
                candidateService.updateCandidate(
                        adminId,
                        electionId,
                        candidateId,
                        request,
                        image
                );

        return ResponseEntity.ok(response);
    }



    @DeleteMapping(
            "/election/{electionId}/candidate/{candidateId}"
    )
    public ResponseEntity<String> deleteCandidate(

            @PathVariable Long electionId,

            @PathVariable Long candidateId,

            Authentication authentication

    ) {

        Long adminId = getAdminId(authentication);

        candidateService.deleteCandidate(
                adminId,
                electionId,
                candidateId
        );

        return ResponseEntity.ok(
                "Candidate deleted successfully"
        );
    }




    private Long getAdminId(
            Authentication authentication
    ) {

        String email = authentication.getName();

        Admin admin =
                adminRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found"
                                )
                        );

        return admin.getId();
    }

}
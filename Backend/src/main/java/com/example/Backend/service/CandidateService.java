package com.example.Backend.service;

import com.example.Backend.dto.CandidateDTO;
import com.example.Backend.model.Candidate;
import com.example.Backend.model.Election;
import com.example.Backend.model.ElectionStatus;
import com.example.Backend.repository.CandidateRepository;
import com.example.Backend.repository.ElectionRepository;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class CandidateService {


    private final CandidateRepository candidateRepository;
    private final ElectionRepository electionRepository;
    private final CloudinaryService cloudinaryService;


    public CandidateService(
            CandidateRepository candidateRepository,
            ElectionRepository electionRepository,
            CloudinaryService cloudinaryService
    ) {

        this.candidateRepository = candidateRepository;
        this.electionRepository = electionRepository;
        this.cloudinaryService = cloudinaryService;

    }




    public CandidateDTO.CandidateResponse addCandidate(
            Long adminId,
            Long electionId,
            CandidateDTO.CreateCandidateRequest request,
            MultipartFile image
    ) {



        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")
                );




        if (!election.getAdmin().getId().equals(adminId)) {

            throw new RuntimeException("Access denied");

        }




        if (election.getStatus() != ElectionStatus.DRAFT) {

            throw new RuntimeException(
                    "Candidates can only be added before election starts"
            );

        }




        String imageUrl =
                cloudinaryService.uploadImage(image);




        Candidate candidate = new Candidate();


        candidate.setName(request.getName());
        candidate.setIitId(request.getIitId());
        candidate.setDepartment(request.getDepartment());
        candidate.setYear(request.getYear());
        candidate.setBiography(request.getBiography());
        candidate.setManifesto(request.getManifesto());



        candidate.setPhoto(imageUrl);




        candidate.setElection(election);




        Candidate savedCandidate =
                candidateRepository.save(candidate);




        CandidateDTO.CandidateResponse response =
                new CandidateDTO.CandidateResponse();


        response.setId(savedCandidate.getId());
        response.setName(savedCandidate.getName());
        response.setIitId(savedCandidate.getIitId());
        response.setDepartment(savedCandidate.getDepartment());
        response.setYear(savedCandidate.getYear());
        response.setPhoto(savedCandidate.getPhoto());
        response.setBiography(savedCandidate.getBiography());
        response.setManifesto(savedCandidate.getManifesto());


        return response;

    }

    public List<CandidateDTO.CandidateSummaryResponse> getCandidatesByElection(Long electionId){

        electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")


                );



        List<Candidate> candidates = candidateRepository.findByElectionId(electionId);


        List<CandidateDTO.CandidateSummaryResponse> responses= new ArrayList<>();



        for (Candidate candidate : candidates) {


            CandidateDTO.CandidateSummaryResponse response =
                    new CandidateDTO.CandidateSummaryResponse();


            response.setId(candidate.getId());

            response.setName(candidate.getName());

            response.setDepartment(candidate.getDepartment());

            response.setPhoto(candidate.getPhoto());

            response.setYear(candidate.getYear());

            response.setBiography(candidate.getBiography());

            response.setManifesto(candidate.getManifesto());







            responses.add(response);

        }


        return responses;
    }

    public CandidateDTO.CandidateResponse getCandidateById(Long electionId, Long candidateId){


        electionRepository.findById(electionId)
                .orElseThrow(() ->

                        new RuntimeException("Election not found")

                );


        Candidate candidate=
                candidateRepository.findById(candidateId)
                        .orElseThrow(() ->
                                new RuntimeException("Candidate not found")

                        );


        if(!candidate.getElection().getId().equals(electionId)){

            throw new RuntimeException(
                    "Candidate does not belong to this election"
            );

        }

        CandidateDTO.CandidateResponse response= new CandidateDTO.CandidateResponse();


        response.setId(candidate.getId());
        response.setName(candidate.getName());
        response.setIitId(candidate.getIitId());
        response.setDepartment(candidate.getDepartment());
        response.setYear(candidate.getYear());
        response.setPhoto(candidate.getPhoto());
        response.setBiography(candidate.getBiography());
        response.setManifesto(candidate.getManifesto());

        return response;


    }

    public CandidateDTO.CandidateResponse updateCandidate(Long adminId, Long electionId, Long candidateId, CandidateDTO.UpdateCandidateRequest request, MultipartFile image){


        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->

                        new RuntimeException("Election not found")

                );


        if(!election.getAdmin().getId().equals(adminId)){

            throw new RuntimeException("Access denied");
        }

        if(election.getStatus() != ElectionStatus.DRAFT){
            throw new RuntimeException("Candidate can only be updated before election starts");
        }


        Candidate candidate =
                candidateRepository.findById(candidateId)
                        .orElseThrow(() ->
                                new RuntimeException("Candidate not found")
                        );




        if(!candidate.getElection().getId().equals(electionId)){


            throw new RuntimeException("Candidate does not belong to this election");
        }

        candidate.setName(request.getName());
        candidate.setDepartment(request.getDepartment());
        candidate.setYear(request.getYear());
        candidate.setBiography(request.getBiography());
        candidate.setManifesto(request.getManifesto());


        if (image != null && !image.isEmpty()) {


            String imageUrl =
                    cloudinaryService.uploadImage(image);


            candidate.setPhoto(imageUrl);

        }
        Candidate updatedCandidate =
                candidateRepository.save(candidate);




        CandidateDTO.CandidateResponse response =
                new CandidateDTO.CandidateResponse();


        response.setId(updatedCandidate.getId());
        response.setName(updatedCandidate.getName());
        response.setIitId(updatedCandidate.getIitId());
        response.setDepartment(updatedCandidate.getDepartment());
        response.setYear(updatedCandidate.getYear());
        response.setPhoto(updatedCandidate.getPhoto());
        response.setBiography(updatedCandidate.getBiography());
        response.setManifesto(updatedCandidate.getManifesto());



        return response;



    }

    public void deleteCandidate(Long adminId, Long electionId, Long candidateId){


        Election election = electionRepository.findById(electionId)
                .orElseThrow(() ->
                        new RuntimeException("Election not found")
                );


        if(!election.getAdmin().getId().equals(adminId)){
            throw new RuntimeException("Acsess denied");
        }

        if(election.getStatus() != ElectionStatus.DRAFT){

            throw new RuntimeException("Candidate can only be deleted before election starts");
        }


        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() ->
                        new RuntimeException("Candidate not found")
                );


        if (!candidate.getElection().getId().equals(electionId)) {

            throw new RuntimeException(
                    "Candidate does not belong to this election"
            );

        }


        candidateRepository.delete(candidate);



    }

}
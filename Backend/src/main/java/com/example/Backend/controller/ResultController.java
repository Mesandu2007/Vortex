package com.example.Backend.controller;

import com.example.Backend.dto.ResultDTO;
import com.example.Backend.service.ResultService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/results")
public class ResultController {


    private final ResultService resultService;


    public ResultController(
            ResultService resultService
    ) {

        this.resultService = resultService;

    }




    @GetMapping("/election/{electionId}")
    public ResponseEntity<ResultDTO.ElectionResultResponse>
    getElectionResults(

            @PathVariable Long electionId

    ) {


        ResultDTO.ElectionResultResponse response =
                resultService.getElectionResults(
                        electionId
                );


        return ResponseEntity.ok(response);

    }

}
package com.example.Backend.dto;

import java.util.List;

public class ResultDTO {




    public static class ElectionResultResponse {

        private Long electionId;
        private String electionTitle;
        private int totalVotes;
        private WinnerResponse winner;
        private List<CandidateResultResponse> candidates;


        public Long getElectionId() {
            return electionId;
        }


        public void setElectionId(Long electionId) {
            this.electionId = electionId;
        }


        public String getElectionTitle() {
            return electionTitle;
        }


        public void setElectionTitle(String electionTitle) {
            this.electionTitle = electionTitle;
        }


        public int getTotalVotes() {
            return totalVotes;
        }


        public void setTotalVotes(int totalVotes) {
            this.totalVotes = totalVotes;
        }


        public WinnerResponse getWinner() {
            return winner;
        }


        public void setWinner(WinnerResponse winner) {
            this.winner = winner;
        }


        public List<CandidateResultResponse> getCandidates() {
            return candidates;
        }


        public void setCandidates(List<CandidateResultResponse> candidates) {
            this.candidates = candidates;
        }
    }




    public static class CandidateResultResponse {

        private Long candidateId;
        private String candidateName;
        private String iitId;
        private int voteCount;


        public Long getCandidateId() {
            return candidateId;
        }


        public void setCandidateId(Long candidateId) {
            this.candidateId = candidateId;
        }


        public String getCandidateName() {
            return candidateName;
        }


        public void setCandidateName(String candidateName) {
            this.candidateName = candidateName;
        }


        public String getIitId() {
            return iitId;
        }


        public void setIitId(String iitId) {
            this.iitId = iitId;
        }


        public int getVoteCount() {
            return voteCount;
        }


        public void setVoteCount(int voteCount) {
            this.voteCount = voteCount;
        }
    }





    public static class WinnerResponse {

        private Long candidateId;
        private String candidateName;
        private String iitId;
        private int voteCount;


        public Long getCandidateId() {
            return candidateId;
        }


        public void setCandidateId(Long candidateId) {
            this.candidateId = candidateId;
        }


        public String getCandidateName() {
            return candidateName;
        }


        public void setCandidateName(String candidateName) {
            this.candidateName = candidateName;
        }


        public String getIitId() {
            return iitId;
        }


        public void setIitId(String iitId) {
            this.iitId = iitId;
        }


        public int getVoteCount() {
            return voteCount;
        }


        public void setVoteCount(int voteCount) {
            this.voteCount = voteCount;
        }
    }

}
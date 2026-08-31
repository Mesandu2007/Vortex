package com.example.Backend.dto;

import java.time.LocalDateTime;

public class VoteDTO {


    // =====================================================
    // VOTE REQUEST
    // =====================================================

    public static class VoteRequest {

        private Long candidateId;


        public Long getCandidateId() {
            return candidateId;
        }


        public void setCandidateId(Long candidateId) {
            this.candidateId = candidateId;
        }
    }


    // =====================================================
    // VOTE RESPONSE
    // =====================================================

    public static class VoteResponse {

        private Long voteId;
        private String message;
        private LocalDateTime votedAt;


        public Long getVoteId() {
            return voteId;
        }


        public void setVoteId(Long voteId) {
            this.voteId = voteId;
        }


        public String getMessage() {
            return message;
        }


        public void setMessage(String message) {
            this.message = message;
        }


        public LocalDateTime getVotedAt() {
            return votedAt;
        }


        public void setVotedAt(LocalDateTime votedAt) {
            this.votedAt = votedAt;
        }
    }


    // =====================================================
    // VOTER RESPONSE
    // =====================================================

    public static class VoterResponse {

        private String fullName;
        private String email;
        private LocalDateTime votedAt;


        public String getFullName() {
            return fullName;
        }


        public void setFullName(String fullName) {
            this.fullName = fullName;
        }


        public String getEmail() {
            return email;
        }


        public void setEmail(String email) {
            this.email = email;
        }


        public LocalDateTime getVotedAt() {
            return votedAt;
        }


        public void setVotedAt(LocalDateTime votedAt) {
            this.votedAt = votedAt;
        }
    }


    // =====================================================
    // VOTING STATUS RESPONSE
    // =====================================================

    public static class VotingStatusResponse {

        private boolean voted;
        private String message;


        public boolean isVoted() {
            return voted;
        }


        public void setVoted(boolean voted) {
            this.voted = voted;
        }


        public String getMessage() {
            return message;
        }


        public void setMessage(String message) {
            this.message = message;
        }
    }

}

package com.example.Backend.dto;

import com.example.Backend.model.ElectionStatus;

import java.time.LocalDateTime;
import java.util.List;


public class UserDashboardDTO {


    public static class DashboardResponse {

        private String fullName;
        private String email;

        private int totalJoinedElections;
        private int activeElections;
        private int completedElections;

        private List<JoinedElectionResponse> joinedElections;


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


        public int getTotalJoinedElections() {
            return totalJoinedElections;
        }

        public void setTotalJoinedElections(
                int totalJoinedElections
        ) {
            this.totalJoinedElections =
                    totalJoinedElections;
        }


        public int getActiveElections() {
            return activeElections;
        }

        public void setActiveElections(
                int activeElections
        ) {
            this.activeElections =
                    activeElections;
        }


        public int getCompletedElections() {
            return completedElections;
        }

        public void setCompletedElections(
                int completedElections
        ) {
            this.completedElections =
                    completedElections;
        }


        public List<JoinedElectionResponse> getJoinedElections() {
            return joinedElections;
        }

        public void setJoinedElections(
                List<JoinedElectionResponse> joinedElections
        ) {
            this.joinedElections =
                    joinedElections;
        }

    }


    public static class JoinedElectionResponse {

        private Long id;
        private String title;
        private String positionName;

        private LocalDateTime startDate;
        private LocalDateTime endDate;

        private ElectionStatus status;

        private boolean hasVoted;
        private String votedCandidateName;


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }


        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }


        public String getPositionName() {
            return positionName;
        }

        public void setPositionName(String positionName) {
            this.positionName = positionName;
        }


        public LocalDateTime getStartDate() {
            return startDate;
        }

        public void setStartDate(
                LocalDateTime startDate
        ) {
            this.startDate = startDate;
        }


        public LocalDateTime getEndDate() {
            return endDate;
        }

        public void setEndDate(
                LocalDateTime endDate
        ) {
            this.endDate = endDate;
        }


        public ElectionStatus getStatus() {
            return status;
        }

        public void setStatus(
                ElectionStatus status
        ) {
            this.status = status;
        }


        public boolean isHasVoted() {
            return hasVoted;
        }

        public void setHasVoted(
                boolean hasVoted
        ) {
            this.hasVoted = hasVoted;
        }


        public String getVotedCandidateName() {
            return votedCandidateName;
        }

        public void setVotedCandidateName(
                String votedCandidateName
        ) {
            this.votedCandidateName =
                    votedCandidateName;
        }

    }

}

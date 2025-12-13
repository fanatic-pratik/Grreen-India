package com.green_india.repository;

import com.green_india.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    // Custom query to find all challenges marked as 'daily'
    List<Challenge> findByDaily(boolean daily);
}

package com.jobseeker.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobseeker.backend.model.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByUserId(int userId);
    Optional<Application> findByUserIdAndJobId(int userId, int jobId);
    boolean existsByUserIdAndJobId(int userId, int jobId);
}
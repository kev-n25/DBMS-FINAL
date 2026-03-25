package com.jobseeker.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jobseeker.backend.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    @Query("SELECT DISTINCT j FROM Job j JOIN JobSkill js ON j.id = js.jobId WHERE js.skillId IN :skillIds")
    List<Job> findJobsBySkillIds(@Param("skillIds") List<Integer> skillIds);
}
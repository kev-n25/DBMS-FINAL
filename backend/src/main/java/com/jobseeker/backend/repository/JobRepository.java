package com.jobseeker.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jobseeker.backend.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    // Match jobs by skills only (fallback if no location set)
    @Query("SELECT DISTINCT j FROM Job j JOIN JobSkill js ON j.id = js.jobId WHERE js.skillId IN :skillIds")
    List<Job> findJobsBySkillIds(@Param("skillIds") List<Integer> skillIds);

    // Match jobs by both skills AND location
    @Query("SELECT DISTINCT j FROM Job j JOIN JobSkill js ON j.id = js.jobId WHERE js.skillId IN :skillIds AND j.location = :location")
    List<Job> findJobsBySkillIdsAndLocation(@Param("skillIds") List<Integer> skillIds, @Param("location") String location);

    // Find all jobs in a location (fallback if no skills set)
    List<Job> findByLocation(String location);
}
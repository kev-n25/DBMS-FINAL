package com.jobseeker.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobseeker.backend.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
}
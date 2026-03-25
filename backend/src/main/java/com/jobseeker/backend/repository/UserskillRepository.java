package com.jobseeker.backend.repository;

import com.jobseeker.backend.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Integer> {
    List<UserSkill> findByUserId(int userId);
    
    @Transactional
    void deleteByUserId(int userId);
}
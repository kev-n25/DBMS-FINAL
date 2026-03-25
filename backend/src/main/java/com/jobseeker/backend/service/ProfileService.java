package com.jobseeker.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobseeker.backend.model.UserSkill;
import com.jobseeker.backend.repository.UserRepository;
import com.jobseeker.backend.repository.UserSkillRepository;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    public String saveProfile(String username, List<Integer> skillIds) {
        // Get user id
        int userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();

        // Delete existing skills
        userSkillRepository.deleteByUserId(userId);

        // Save new skills
        for (int skillId : skillIds) {
            UserSkill userSkill = new UserSkill();
            userSkill.setUserId(userId);
            userSkill.setSkillId(skillId);
            userSkillRepository.save(userSkill);
        }

        return "Profile saved successfully!";
    }
}
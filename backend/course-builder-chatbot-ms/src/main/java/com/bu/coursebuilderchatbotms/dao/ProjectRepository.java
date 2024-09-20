package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Projects, Long> {
    // You can add custom queries here if needed
}
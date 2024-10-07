package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserDAOTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserDAO userDAO;

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setAuthId("auth123");
        user.setEmail("test@example.com");
        user.setFName("Test");
        user.setLName("User");
        user.setPasswordHash("hash");
        user.setProgramCode("TEST123");

        userDAO.createUser(user);
        User retrievedUser = userDAO.getUserByUsername("auth123");
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    public void testGetUserById() {
        User user = new User();
        user.setUserId(1);
        user.setAuthId("auth123");
        user.setEmail("test@example.com");

        entityManager.persist(user);
        entityManager.flush();

        User foundUser = userDAO.getUserById(1);
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getEmail()).isEqualTo("test@example.com");
    }
}
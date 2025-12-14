package com.green_india.repository;



import com.green_india.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // <-- Import Optional

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Cleaner method for existence check
    boolean existsByEmail(String email);

}

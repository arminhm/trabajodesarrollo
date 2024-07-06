package cl.ucm.coffee.persitence.repository;

import cl.ucm.coffee.persitence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUsername(String username);
}

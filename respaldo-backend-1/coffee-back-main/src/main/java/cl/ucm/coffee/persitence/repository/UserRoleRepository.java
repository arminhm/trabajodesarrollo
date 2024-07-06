package cl.ucm.coffee.persitence.repository;

import cl.ucm.coffee.persitence.entity.UserRoleEntity;
import cl.ucm.coffee.persitence.entity.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, UserRoleId> {
}

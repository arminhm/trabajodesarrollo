package cl.ucm.coffee.persitence.repository;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CoffeeRepository extends JpaRepository<CoffeeEntity, Integer> {
    CoffeeEntity findByName(String name);
    List<CoffeeEntity> findByNameStartingWith(String name);
}
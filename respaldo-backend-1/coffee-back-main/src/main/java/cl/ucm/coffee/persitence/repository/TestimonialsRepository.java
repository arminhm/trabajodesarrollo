package cl.ucm.coffee.persitence.repository;

import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TestimonialsRepository extends CrudRepository<TestimonialsEntity, Integer> {
    List<TestimonialsEntity> findByCoffee_IdCoffee(int idCoffee);

    @Modifying
    @Transactional
    @Query("DELETE FROM TestimonialsEntity t WHERE t.coffee.idCoffee = ?1")
    void deleteByCoffeeId(int idCoffee);
}

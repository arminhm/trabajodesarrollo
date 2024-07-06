package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.TestimonialsEntity;
import org.springframework.http.ResponseEntity;

public interface ITestimonialsService {
    ResponseEntity<?> create(TestimonialsEntity testimonialsEntity);
    ResponseEntity<?> findByCoffeeId(int coffeeId);
    void deleteByCoffeeId(int idCoffee);
}

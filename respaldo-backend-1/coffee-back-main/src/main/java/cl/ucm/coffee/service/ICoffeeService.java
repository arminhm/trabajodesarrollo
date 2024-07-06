package cl.ucm.coffee.service;

import cl.ucm.coffee.persitence.entity.CoffeeEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICoffeeService {
    ResponseEntity<?> create(String name, int price, String description, String foto);
    ResponseEntity<?> findByName(String name);
    ResponseEntity<?> coffeeList();
    ResponseEntity<?> updateCoffee(CoffeeEntity coffeeEntity);
    ResponseEntity<?> deleteCoffee(int idCoffee);
}

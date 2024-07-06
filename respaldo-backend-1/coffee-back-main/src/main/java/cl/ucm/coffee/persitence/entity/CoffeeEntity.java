package cl.ucm.coffee.persitence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Table(name = "coffee")
@Getter
@Setter
@NoArgsConstructor
public class CoffeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_coffee", nullable = false)
    private int idCoffee;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false, length = 200)
    private String description;

    @Column(nullable = false)
    private int price;

    @Lob
    @Column(name = "image64", columnDefinition = "TEXT")
    private String image64;

    @OneToMany(mappedBy = "coffee", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<TestimonialsEntity> testimonials;
}

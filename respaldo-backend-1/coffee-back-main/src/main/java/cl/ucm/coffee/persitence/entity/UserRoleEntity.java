package cl.ucm.coffee.persitence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.sql.Timestamp;

@Entity
@Table(name = "user_role", uniqueConstraints = {@UniqueConstraint(columnNames = {"username", "role"})})
@Getter
@Setter
@NoArgsConstructor
public class UserRoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String role;

    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    @JsonBackReference
    private UserEntity user;

    @Column(nullable = false)
    private Timestamp grantedDate;
}

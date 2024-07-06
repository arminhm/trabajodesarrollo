package cl.ucm.coffee.persitence.entity;

import java.io.Serializable;
import java.util.Objects;

public class UserRoleId implements Serializable {
    private String username;
    private String role;

    // Getters, Setters, hashCode and equals methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRoleId that = (UserRoleId) o;
        return Objects.equals(username, that.username) &&
                Objects.equals(role, that.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, role);
    }
}

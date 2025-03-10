package cl.ucm.coffee.web.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "Ucm-c0ff33";
    private static final Algorithm ALGORITHM = Algorithm.HMAC256(SECRET_KEY);

    public String create(String username, String fullname, String role) {
        return JWT.create()
                .withSubject(username)
                .withClaim("fullname", fullname)
                .withClaim("role", role)
                .withIssuer("ucm-coffee")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(15)))
                .sign(ALGORITHM);
    }

    public boolean isValid(String jwt) {
        try {
            JWT.require(ALGORITHM)
                    .build()
                    .verify(jwt);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    public String getUsername(String jwt) {
        return JWT.require(ALGORITHM)
                .build()
                .verify(jwt)
                .getSubject();
    }

    public String getRole(String jwt) {
        return JWT.require(ALGORITHM)
                .build()
                .verify(jwt)
                .getClaim("role").asString();
    }

    public String getFullname(String jwt) {
        return JWT.require(ALGORITHM)
                .build()
                .verify(jwt)
                .getClaim("fullname").asString();
    }
}

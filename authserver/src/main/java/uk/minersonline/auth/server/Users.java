package uk.minersonline.auth.server;

import io.vertx.ext.auth.jwt.JWTAuth;
import uk.minersonline.auth.server.impl.DefaultUser;
import uk.minersonline.auth.serverapi.Server;
import uk.minersonline.auth.serverapi.game.Game;
import uk.minersonline.auth.serverapi.user.Profile;
import uk.minersonline.auth.serverapi.user.User;
import uk.minersonline.auth.serverapi.user.property.StringProperty;

import java.util.List;
import java.util.UUID;

public class Users implements Server {
  private final JWTAuth JWTProvider;

  public Users(JWTAuth JWTProvider) {
    this.JWTProvider = JWTProvider;
  }

  @Override
  public User findUserWithEmail(String email) {
    if (email.equals("samueh2005@example.com")) {
      DefaultUser user = new DefaultUser(
        UUID.fromString("c3e994d7-7699-4264-a3a7-5f0342a961dc"),
        "example.com",
        "password"
      );
      user.getProperties().add(new StringProperty("preferredLanguage", "en-gb"));
      user.getProperties().add(new StringProperty("registrationCountry", "GB"));
      return user;
    }
    return null;
  }

  @Override
  public List<Profile> getProfilesForUser(User user, Game game) {
    if (game.getName().equals("Minecraft")) {
      if (user.getEmail().equals("samueh2005@example.com")) {
        return List.of(
          new Profile(
            UUID.fromString("c3e994d7-7699-4264-a3a7-5f0342a961dc"),
            "samuelh2005",
            new Game("Minecraft")
          )
        );
      }
    }
    return null;
  }

  @Override
  public User authenticateUser(String email, String password) {
    User user = findUserWithEmail(email);
    if (user instanceof DefaultUser dUser) {
      if (dUser.getPassword().equals(password)) {
        return user;
      }
    }
    return null;
  }

  @Override
  public JWTAuth getJWTProvider() {
    return this.JWTProvider;
  }
}

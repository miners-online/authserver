package uk.minersonline.auth.serverapi;

import io.vertx.ext.auth.jwt.JWTAuth;
import uk.minersonline.auth.serverapi.game.Game;
import uk.minersonline.auth.serverapi.user.Profile;
import uk.minersonline.auth.serverapi.user.User;

import java.util.List;

public interface Server {
  User findUserWithEmail(String email);
  List<Profile> getProfilesForUser(User user, Game game);
  User authenticateUser(String email, String password);
  JWTAuth getJWTProvider();
}

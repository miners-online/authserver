package uk.minersonline.auth.MinecraftSupport;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.auth.JWTOptions;
import io.vertx.ext.web.Router;
import org.pf4j.Extension;
import uk.minersonline.auth.MinecraftSupport.messages.AuthenticateRequest;
import uk.minersonline.auth.serverapi.HTTPService;
import uk.minersonline.auth.serverapi.Server;
import uk.minersonline.auth.serverapi.game.Game;
import uk.minersonline.auth.serverapi.user.Profile;
import uk.minersonline.auth.serverapi.user.User;
import uk.minersonline.auth.serverapi.user.property.Property;

import java.util.List;

@Extension
public class MinecraftAuthServer implements HTTPService {
  @Override
  public void getHandler(Router router, Server server) {
    router.post("/authenticate").produces("*/json").handler(req ->{
      JsonObject JReg = req.body().asJsonObject();
      AuthenticateRequest request = AuthenticateRequest.fromJson(JReg);

      User user = server.authenticateUser(request.getUsername(), request.getPassword());
      if (user == null) {
        JsonObject json = new JsonObject()
          .put("error", "ForbiddenOperationException")
          .put("errorMessage", "Invalid credentials. Invalid username or password.");
        req.response()
          .setStatusCode(401)
          .putHeader("Content-Type", "application/json; charset=UTF8")
          .end(json.encode());
        return;
      }

      JsonObject resp = new JsonObject();
      if (request.isRequestUser()) {
        JsonObject JUser = new JsonObject();
        JUser.put("username", user.getEmail());
        JsonArray properties = new JsonArray();
        for (Property<?> property : user.getProperties()) {
          properties.add(property.toJson());
        }
        JUser.put("id", user.getId().toString().replace("-", ""));
      }

      if (request.getClientToken() != null) {
        resp.put("clientToken", request.getClientToken());
      }
      String accessToken = server.getJWTProvider().generateToken(
        new JsonObject()
          .put("clientToken", request.getClientToken())
          .put("id", user.getId()), new JWTOptions());
      resp.put("accessToken", accessToken);

      JsonArray JProfiles = new JsonArray();
      List<Profile> profiles = server.getProfilesForUser(user, new Game("Minecraft"));
      for (Profile profile : profiles) {
        JsonObject JProfile = new JsonObject();
        JProfile.put("name", profile.getDisplayName());
        JProfile.put("id", profile.getId().toString().replace("-", ""));
        JProfiles.add(JProfile);
      }
      resp.put("availableProfiles", JProfiles);

      JsonObject JProfile = new JsonObject();
      JProfile.put("name", profiles.getFirst().getDisplayName());
      JProfile.put("id", profiles.getFirst().getId().toString().replace("-", ""));
      JProfiles.add(JProfile);
      resp.put("selectedProfile", JProfile);

      req.response()
        .putHeader("Content-Type", "application/json; charset=UTF8")
        .end(resp.encode());
    });
  }

  @Override
  public int getPort() {
    return 8888;
  }
}

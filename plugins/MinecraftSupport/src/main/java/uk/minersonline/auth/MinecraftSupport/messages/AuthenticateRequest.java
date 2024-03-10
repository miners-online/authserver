package uk.minersonline.auth.MinecraftSupport.messages;

import io.vertx.core.json.JsonObject;
import uk.minersonline.auth.serverapi.game.Agent;
import uk.minersonline.auth.serverapi.game.Game;

public class AuthenticateRequest {
  private final Agent agent;
  private final String username;
  private final String password;
  private final String clientToken;
  private final boolean requestUser;

  public AuthenticateRequest(Agent agent, String username, String password, String clientToken, boolean requestUser) {
    this.agent = agent;
    this.username = username;
    this.password = password;
    this.clientToken = clientToken;
    this.requestUser = requestUser;
  }

  public Agent getAgent() {
    return agent;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public String getClientToken() {
    return clientToken;
  }

  public boolean isRequestUser() {
    return requestUser;
  }

  public static AuthenticateRequest fromJson(JsonObject object) {
    JsonObject JAgent = object.getJsonObject("agent");
    String name = JAgent.getString("name");
    int version = JAgent.getInteger("version");
    Agent agent = new Agent(new Game(name), version);

    String username = object.getString("username");
    String password = object.getString("password");
    String clientToken = object.getString("clientToken", null);
    boolean requestUser = object.getBoolean("requestUser", false);

    return new AuthenticateRequest(agent, username, password, clientToken, requestUser);
  }
}

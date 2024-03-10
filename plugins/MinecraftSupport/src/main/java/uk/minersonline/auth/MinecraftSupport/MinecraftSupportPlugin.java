package uk.minersonline.auth.MinecraftSupport;

import io.vertx.core.http.HttpServerResponse;
import org.pf4j.Extension;
import org.pf4j.Plugin;
import uk.minersonline.auth.serverapi.Agent;
import uk.minersonline.auth.serverapi.AuthResponseBuilder;

@Extension
public class MinecraftSupportPlugin extends Plugin implements AuthResponseBuilder {
  @Override
  public void buildResponse(HttpServerResponse response, Agent agent) {
    if (agent.name.equals("Minecraft") && agent.apiVersion > 0) {
      System.out.println("Minecraft found");
      response.putHeader("content-type", "text/plain");
      response.end("Hello from Minecraft!");
    } else {
      response.putHeader("content-type", "text/plain");
      response.end("Hello from not Minecraft!");
    }
  }
}

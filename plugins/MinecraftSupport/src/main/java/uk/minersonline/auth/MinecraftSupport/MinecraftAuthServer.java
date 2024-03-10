package uk.minersonline.auth.MinecraftSupport;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerRequest;
import org.pf4j.Extension;
import uk.minersonline.auth.serverapi.AuthResponseBuilder;

@Extension
public class MinecraftAuthServer implements AuthResponseBuilder {
  @Override
  public Handler<HttpServerRequest> getHandler() {
    return (req) -> {
      req.response()
      .putHeader("content-type", "text/plain")
      .end("Hello from Minecraft!");
    };
  }

  @Override
  public int getPort() {
    return 8888;
  }
}

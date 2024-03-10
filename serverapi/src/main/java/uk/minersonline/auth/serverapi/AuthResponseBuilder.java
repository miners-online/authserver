package uk.minersonline.auth.serverapi;

import io.vertx.core.Handler;
import io.vertx.core.http.HttpServerRequest;
import org.pf4j.ExtensionPoint;

public interface AuthResponseBuilder extends ExtensionPoint {
  Handler<HttpServerRequest> getHandler();
  int getPort();
}

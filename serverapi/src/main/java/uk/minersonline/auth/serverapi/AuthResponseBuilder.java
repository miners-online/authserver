package uk.minersonline.auth.serverapi;

import io.vertx.core.http.HttpServerResponse;
import org.pf4j.ExtensionPoint;

public interface AuthResponseBuilder extends ExtensionPoint {
  void buildResponse(HttpServerResponse response, Agent agent);
}

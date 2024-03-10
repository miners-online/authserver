package uk.minersonline.auth.serverapi;

import io.vertx.ext.web.Router;
import org.pf4j.ExtensionPoint;

public interface HTTPService extends ExtensionPoint {
  void getHandler(Router router, Server server);
  int getPort();
}

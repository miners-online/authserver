package uk.minersonline.auth.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.auth.KeyStoreOptions;
import io.vertx.ext.auth.jwt.JWTAuth;
import io.vertx.ext.auth.jwt.JWTAuthOptions;
import io.vertx.ext.web.Router;
import org.pf4j.*;
import uk.minersonline.auth.serverapi.HTTPService;

import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;


public class MainVerticle extends AbstractVerticle {

  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    // create the plugin manager
    final PluginManager pluginManager = getPluginManager();
    pluginManager.startPlugins();
    System.out.println(pluginManager.getPlugins());
    List<HTTPService> responseBuilders = pluginManager.getExtensions(HTTPService.class);

    // create jwt provider
    JWTAuthOptions config = new JWTAuthOptions()
      .setKeyStore(new KeyStoreOptions()
        .setPath("keystore.jceks")
        .setPassword("secret"));
    JWTAuth provider = JWTAuth.create(vertx, config);

    Users users = new Users(provider);

    AtomicInteger startCount = new AtomicInteger(0);
    for (HTTPService builder : responseBuilders) {
      HttpServer server = vertx.createHttpServer();
      Router router = Router.router(vertx);
      builder.getHandler(router, users);
      server.listen(builder.getPort(), http -> {
        if (http.succeeded()) {
          startCount.incrementAndGet();
          if (startCount.get() >= responseBuilders.size() ) {
            startPromise.complete();
          }
          System.out.println("HTTP server started on port "+builder.getPort());
        } else {
          startPromise.fail(http.cause());
        }
      });
    }
  }

  private static PluginManager getPluginManager() {
    Path pluginDir = Path.of(System.getProperty("user.dir"), "plugins");
    final PluginManager pluginManager = new DefaultPluginManager(pluginDir);
    // start and load all plugins of application
    pluginManager.loadPlugins();
    return pluginManager;
  }
}

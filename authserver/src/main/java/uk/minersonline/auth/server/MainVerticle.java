package uk.minersonline.auth.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import org.pf4j.*;
import uk.minersonline.auth.serverapi.AuthResponseBuilder;

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
    List<AuthResponseBuilder> responseBuilders = pluginManager.getExtensions(AuthResponseBuilder.class);

    AtomicInteger startCount = new AtomicInteger(0);
    for (AuthResponseBuilder builder : responseBuilders) {
      vertx.createHttpServer().requestHandler(
        builder.getHandler()
      ).listen(builder.getPort(), http -> {
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

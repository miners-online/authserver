package uk.minersonline.auth.server;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServerResponse;
import org.pf4j.*;
import uk.minersonline.auth.serverapi.Agent;
import uk.minersonline.auth.serverapi.AuthResponseBuilder;

import java.nio.file.Path;
import java.util.List;


public class MainVerticle extends AbstractVerticle {

  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    // create the plugin manager
    final PluginManager pluginManager = getPluginManager();
    pluginManager.startPlugins();
    System.out.println(pluginManager.getPlugins());
    List<AuthResponseBuilder> responseBuilders = pluginManager.getExtensions(AuthResponseBuilder.class);

    vertx.createHttpServer().requestHandler(req -> {
      HttpServerResponse response = req.response();
      System.out.println(responseBuilders);
      for (AuthResponseBuilder builder : responseBuilders) {
        builder.buildResponse(response, new Agent("Minecraft", 1));
      }
    }).listen(8888, http -> {
      if (http.succeeded()) {
        startPromise.complete();
        System.out.println("HTTP server started on port 8888");
      } else {
        startPromise.fail(http.cause());
      }
    });
  }

  private static PluginManager getPluginManager() {
    Path pluginDir = Path.of(System.getProperty("user.dir"), "plugins");
    final PluginManager pluginManager = new DefaultPluginManager(pluginDir);
    // start and load all plugins of application
    pluginManager.loadPlugins();
    return pluginManager;
  }
}

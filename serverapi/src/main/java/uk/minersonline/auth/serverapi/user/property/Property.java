package uk.minersonline.auth.serverapi.user.property;

import io.vertx.core.json.JsonObject;

public abstract class Property<T> {
  public abstract String getName();
  public abstract T getValue();
  public abstract void setValue(T value);
  public final JsonObject toJson() {
    JsonObject result = new JsonObject();
    result.put("name", this.getName());
    result.put("value", this.getValue());
    return result;
  }
}

package uk.minersonline.auth.serverapi.user.property;

import io.vertx.core.json.JsonObject;

public class StringProperty extends Property<String> {
  private final String name;
  private String value;

  public StringProperty(String name, String value) {
    this.name = name;
    this.value = value;
  }

  @Override
  public String getName() {
    return this.name;
  }

  @Override
  public String getValue() {
    return this.value;
  }

  @Override
  public void setValue(String value) {
    this.value = value;
  }
}

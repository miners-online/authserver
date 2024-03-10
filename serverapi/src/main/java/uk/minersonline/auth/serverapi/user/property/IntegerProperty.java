package uk.minersonline.auth.serverapi.user.property;

import io.vertx.core.json.JsonObject;

public class IntegerProperty extends Property<Integer> {
  private final String name;
  private int value;

  public IntegerProperty(String name, int value) {
    this.name = name;
    this.value = value;
  }

  @Override
  public String getName() {
    return this.name;
  }

  @Override
  public Integer getValue() {
    return this.value;
  }

  @Override
  public void setValue(Integer value) {
    this.value = value;
  }
}

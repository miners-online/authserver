package uk.minersonline.auth.server.impl;

import uk.minersonline.auth.serverapi.user.property.Property;
import uk.minersonline.auth.serverapi.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class DefaultUser implements User {
  private final UUID id;
  private final String email;
  private final String password;
  private final List<Property<?>> properties;

  public DefaultUser(UUID id, String email, String password) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.properties = new ArrayList<>();
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String getEmail() {
    return this.email;
  }

  @Override
  public UUID getId() {
    return this.id;
  }

  @Override
  public List<Property<?>> getProperties() {
    return this.properties;
  }
}

package uk.minersonline.auth.serverapi.user;

import uk.minersonline.auth.serverapi.user.property.Property;

import java.util.List;
import java.util.UUID;

public interface User {
  String getEmail();
  UUID getId();
  List<Property<?>> getProperties();
}

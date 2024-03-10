package uk.minersonline.auth.serverapi.user;

import java.util.UUID;

public interface Profile {
  String getDisplayName();
  UUID getId();
}

package uk.minersonline.auth.serverapi.user;

import uk.minersonline.auth.serverapi.game.Game;

import java.util.UUID;

public class Profile {
  private final UUID id;
  private final String displayName;
  private final Game game;

  public Profile(UUID id, String displayName, Game game) {
    this.id = id;
    this.displayName = displayName;
    this.game = game;
  }

  public UUID getId() {
    return id;
  }

  public String getDisplayName() {
    return displayName;
  }

  public Game getGame() {
    return game;
  }
}

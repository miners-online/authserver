package uk.minersonline.auth.serverapi.game;

public class Agent {
  public Game game;
  public int apiVersion;

	public Agent(Game game, int apiVersion) {
    this.game = game;
    this.apiVersion = apiVersion;
	}
}

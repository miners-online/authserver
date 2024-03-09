package uk.minersonline.authserver.types;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.util.Objects;
import java.util.UUID;

@Entity
public class Agent {
	@Id
	@UuidGenerator
	private String id;
	private Game game;
	private int apiVersion;

	public Agent() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public int getApiVersion() {
		return apiVersion;
	}

	public void setApiVersion(int apiVersion) {
		this.apiVersion = apiVersion;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Agent agent = (Agent) o;
		return apiVersion == agent.apiVersion && Objects.equals(id, agent.id) && Objects.equals(game, agent.game);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, game, apiVersion);
	}

	@Override
	public String toString() {
		return "Agent{" +
				"id=" + id +
				", game=" + game +
				", apiVersion=" + apiVersion +
				'}';
	}
}

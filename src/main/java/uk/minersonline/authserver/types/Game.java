package uk.minersonline.authserver.types;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Game {
	@Id
	private String id;
	private String name;

	public Game() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Game game = (Game) o;
		return Objects.equals(id, game.id) && Objects.equals(name, game.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public String toString() {
		return "Game{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}

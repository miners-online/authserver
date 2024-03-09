package uk.minersonline.authserver.types;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.util.Objects;

@Entity
public class Profile {
	@Id
	@UuidGenerator
	private String id;
	@ManyToOne
	private Game game;
	private String name;

	public Profile() {
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
		Profile profile = (Profile) o;
		return Objects.equals(id, profile.id) && Objects.equals(game, profile.game) && Objects.equals(name, profile.name);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, game, name);
	}

	@Override
	public String toString() {
		return "Profile{" +
				"id=" + id +
				", game=" + game +
				", name='" + name + '\'' +
				'}';
	}
}

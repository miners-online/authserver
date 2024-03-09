package uk.minersonline.authserver.types;


import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.Objects;

@Entity
public class UserProperty {
	@Id
	@UuidGenerator
	private String id;
	private String name;
	private String value;

	public UserProperty() {
	}

	public UserProperty(String name, String value) {
		this.name = name;
		this.value = value;
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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		UserProperty that = (UserProperty) o;
		return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(value, that.value);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, value);
	}

	@Override
	public String toString() {
		return "UserProperty{" +
				"id=" + id +
				", name='" + name + '\'' +
				", value='" + value + '\'' +
				'}';
	}
}

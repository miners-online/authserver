package uk.minersonline.authserver.types;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
public class User {
	@Id
	@UuidGenerator
	private String id;
	private String email;
	private String password;
	private List<Profile> profiles;
	private Map<Game, Profile> selectedProfile;
	private List<UserProperty> properties;

	public User() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Profile> getProfiles() {
		return profiles;
	}

	public void setProfiles(List<Profile> profiles) {
		this.profiles = profiles;
	}

	public Map<Game, Profile> getSelectedProfile() {
		return selectedProfile;
	}

	public void setSelectedProfile(Map<Game, Profile> selectedProfile) {
		this.selectedProfile = selectedProfile;
	}

	public List<UserProperty> getProperties() {
		return properties;
	}

	public void setProperties(List<UserProperty> properties) {
		this.properties = properties;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(id, user.id) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(profiles, user.profiles) && Objects.equals(selectedProfile, user.selectedProfile) && Objects.equals(properties, user.properties);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, email, password, profiles, selectedProfile, properties);
	}

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", email='" + email + '\'' +
				", password='" + password + '\'' +
				", profiles=" + profiles +
				", selectedProfile=" + selectedProfile +
				", properties=" + properties +
				'}';
	}
}

package uk.minersonline.authserver;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import uk.minersonline.authserver.repositories.GameRepository;
import uk.minersonline.authserver.types.Game;

import java.util.*;

@Configuration
class LoadDatabase {

	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

	@Bean
	CommandLineRunner initDatabase(GameRepository games) {//, ProfileRepository profiles, UserRepository users) {
//		User testAccount = new User();
//		Profile profile = new Profile();
//		profile.setGame(game);
//		profile.setName("test");
//		testAccount.setEmail("test@example.com");
//		testAccount.setPassword("oh no!!");
//		testAccount.setProfiles(new ArrayList<>(List.of(profile)));
//		Map<Game, Profile> selectedProfile = new HashMap<>();
//		selectedProfile.put(game, profile);
//		testAccount.setSelectedProfile(selectedProfile);

		return args -> {
			Game game = new Game();
			game.setName("Demo game");
			game.setId(UUID.randomUUID().toString());

			System.out.println("AAAA");
//			var g = games.save(game);
			System.out.println("BBBB");
//			var p = profiles.save(profile);
			System.out.println("CCCC");
//			var u = users.save(testAccount);
			System.out.println("DDDD");
//			log.info("Preloading " + g  + p + u);
		};
	}
}
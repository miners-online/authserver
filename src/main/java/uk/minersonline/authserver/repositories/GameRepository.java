package uk.minersonline.authserver.repositories;

import org.springframework.data.repository.CrudRepository;
import uk.minersonline.authserver.types.Game;

public interface GameRepository extends CrudRepository<Game, String> {
}

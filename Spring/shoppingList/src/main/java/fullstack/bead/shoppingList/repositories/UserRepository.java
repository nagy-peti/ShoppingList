package fullstack.bead.shoppingList.repositories;

import fullstack.bead.shoppingList.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}

package fullstack.bead.shoppingList.repositories;

import fullstack.bead.shoppingList.models.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends CrudRepository<Item, Integer> {
}

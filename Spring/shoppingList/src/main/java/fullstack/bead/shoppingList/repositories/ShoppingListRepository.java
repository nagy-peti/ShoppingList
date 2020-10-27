package fullstack.bead.shoppingList.repositories;

import fullstack.bead.shoppingList.models.ShoppingList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListRepository extends CrudRepository<ShoppingList, Integer> {
}

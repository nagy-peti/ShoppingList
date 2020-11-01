package fullstack.bead.shoppingList.repositories;

import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
//    @Query(value="select * from shopping_list where owner_id=:owner_id",nativeQuery=true)
//    Iterable<ShoppingList> getUserShoppingLists(@Param("owner_id") Integer owner_id);


}

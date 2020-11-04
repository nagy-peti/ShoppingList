package fullstack.bead.shoppingList.repositories;

import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query(value="select u.id, u.username from friends f join users u on f.id_2 = u.id where f.id_1=:id UNION " +
            "select u.id, u.username from friends f join users u on f.id_1 = u.id where f.id_2=:id",nativeQuery=true)
    Iterable<Object[]> getFriends(@Param("id") Integer id);

    @Query(value="select s.id, s.owner_id,s.name,s.shared_with_friends " +
            "from shopping_list s join " +
            "(select u.id, u.username from friends f join users u on f.id_2 = u.id where f.id_1=:id UNION select u.id, u.username from friends f join users u on f.id_1 = u.id where f.id_2=:id) uniontable " +
            "on s.owner_id=uniontable.id where  s.shared_with_friends LIKE concat('%',:id,'%')",nativeQuery=true)
    Iterable<Object[]> getSharedShoppingLists(@Param("id") Integer id);
}

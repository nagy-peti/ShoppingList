package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
import fullstack.bead.shoppingList.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

//    @GetMapping("/{id}/shoppinglists")
//    public ResponseEntity<Iterable<ShoppingList>> showUserShoppinglists(@PathVariable Integer id){
//        Optional<User> oUser =  userRepository.findById(id);
//        if (oUser.isPresent()){
//            return ResponseEntity.ok(userRepository.getUserShoppingLists(id));
//        }else{
//
//            return ResponseEntity.notFound().build();
//        }
//    }
}

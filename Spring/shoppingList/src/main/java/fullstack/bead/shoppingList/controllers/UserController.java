package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.Recipe;
import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
import fullstack.bead.shoppingList.repositories.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<User>> getAll(){
        return ResponseEntity.ok(userRepository.findAll());

    }
    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id){
        Optional<User> oUser =  userRepository.findById(id);
        if (oUser.isPresent()){
            return ResponseEntity.ok(oUser.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Integer> create(@RequestBody registeringUser user){
        try {
            Optional<User> oCompany = userRepository.findByUsername(user.getUsername());
            if (oCompany.isPresent()) {
                return ResponseEntity.ok(-1);
            } else {
                User userObject = new User();
                userObject.setUsername(user.getUsername());
                userObject.setPassword(user.getPassword());
                User savedUser = userRepository.save(userObject);
                return ResponseEntity.ok(savedUser.getId());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/{id}/shoppinglists")
    public ResponseEntity<Iterable<ShoppingList>> getShoppinglists(@PathVariable Integer id){
        Optional<User> oUser =  userRepository.findById(id);
        if (oUser.isPresent()){
            return ResponseEntity.ok(oUser.get().getShoppingLists());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/sharedShoppingLists")
    public ResponseEntity<Iterable<Object[]>> getSharedShoppingLists(@PathVariable Integer id){
        Optional<User> oUser =  userRepository.findById(id);
        if (oUser.isPresent()){
            return ResponseEntity.ok(userRepository.getSharedShoppingLists(id));
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/friends")
    public ResponseEntity<Iterable<Object[]>> getFriends(@PathVariable Integer id){
        Optional<User> oUser =  userRepository.findById(id);
        if (oUser.isPresent()){
            return ResponseEntity.ok(userRepository.getFriends(id));
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/{id}/addFriend")
    public ResponseEntity<User> addFriend(@PathVariable Integer id, @RequestBody int newFriendId){
        Optional<User> oUser =  userRepository.findById(id);
        Optional<User> friend =  userRepository.findById(newFriendId);
        if (oUser.isPresent() && friend.isPresent()){
            List<User> allFriends = oUser.get().getFriends();
            allFriends.add(friend.get());
            oUser.get().setFriends(allFriends);
            return ResponseEntity.ok(userRepository.save(oUser.get()));
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/auth")
    private ResponseEntity<Integer> getValiadtion(@RequestParam String username, @RequestParam String password) {
        User foundCompany = userRepository.findValidUser(username, password);
        if (foundCompany != null) {
            return ResponseEntity.ok(foundCompany.getId());
        } else {
            return ResponseEntity.ok().build();
        }
    }
}

@Data
class registeringUser{
    private String username;
    private String password;
}

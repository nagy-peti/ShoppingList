package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.Item;
import fullstack.bead.shoppingList.models.Recipe;
import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.repositories.ItemRepository;
import fullstack.bead.shoppingList.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shopping_list")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;


    @PostMapping("")
    public ResponseEntity<ShoppingList> store(@RequestBody ShoppingList shoppingList){
        return ResponseEntity.ok(shoppingListRepository.save(shoppingList));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ShoppingList> update(@PathVariable Integer id, @RequestBody ShoppingList shoppingList){
        Optional<ShoppingList> oShoppingList =  shoppingListRepository.findById(id);
        if (oShoppingList.isPresent()){
            shoppingList.setId(id);
            return ResponseEntity.ok(shoppingListRepository.save(shoppingList));
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/addrecipe")
    public ResponseEntity<ShoppingList> addRecipe(@PathVariable Integer id, @RequestBody Recipe newRecipe){
        Optional<ShoppingList> oShoppingList =  shoppingListRepository.findById(id);
        if (oShoppingList.isPresent()){
            List<Recipe> allrecipes = new ArrayList<>();
            allrecipes.addAll(oShoppingList.get().getRecipes());
            allrecipes.add(newRecipe);
            oShoppingList.get().setRecipes(allrecipes);
            return ResponseEntity.ok(shoppingListRepository.save(oShoppingList.get()));
        }else{
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ShoppingList> delete(@PathVariable Integer id){
        Optional<ShoppingList> oShoppingList =  shoppingListRepository.findById(id);
        if (oShoppingList.isPresent()){
            shoppingListRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }



}

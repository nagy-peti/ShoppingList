package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.Item;
import fullstack.bead.shoppingList.models.Recipe;
import fullstack.bead.shoppingList.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipesController {
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Recipe>> getAll(){
        return ResponseEntity.ok(recipeRepository.findAll());
    }

    @GetMapping("/{id}/items")
    public ResponseEntity<Iterable<Item>> getItems(@PathVariable Integer id){
        Optional<Recipe> oRecipe =  recipeRepository.findById(id);
        if (oRecipe.isPresent()){
            Iterable<Item> items = oRecipe.get().getItems();
            return ResponseEntity.ok(items);
        }else{

            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<Recipe> create(@RequestBody Recipe recipe){
        return ResponseEntity.ok(recipeRepository.save(recipe));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> update(@PathVariable Integer id, @RequestBody Recipe recipe){
        Optional<Recipe> oRecipe =  recipeRepository.findById(id);
        if (oRecipe.isPresent()){
            recipe.setId(id);
            return ResponseEntity.ok(recipeRepository.save(recipe));
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Recipe> delete(@PathVariable Integer id){
        Optional<Recipe> oRecipe =  recipeRepository.findById(id);
        if (oRecipe.isPresent()){
            recipeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}

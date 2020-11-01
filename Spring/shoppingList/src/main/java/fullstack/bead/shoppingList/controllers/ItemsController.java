package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.Item;
import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemsController {
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("")
    public ResponseEntity<Iterable<Item>> showAll(){
        return ResponseEntity.ok(itemRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Item> show(@PathVariable Integer id){
        Optional<Item> oItem =  itemRepository.findById(id);
        if (oItem.isPresent()){
            return ResponseEntity.ok(oItem.get());
        }else{

            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("")
    public ResponseEntity<Item> store(@RequestBody Item item){
        return ResponseEntity.ok(itemRepository.save(item));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Integer id, @RequestBody Item item){
        Optional<Item> oItem =  itemRepository.findById(id);
        if (oItem.isPresent()){
            item.setId(id);
            return ResponseEntity.ok(itemRepository.save(item));
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Item> delete(@PathVariable Integer id){
        Optional<Item> oItem =  itemRepository.findById(id);
        if (oItem.isPresent()){
            itemRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}

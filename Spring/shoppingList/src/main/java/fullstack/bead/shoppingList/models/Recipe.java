package fullstack.bead.shoppingList.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name="recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;


    @OneToMany(mappedBy="recipe", cascade = CascadeType.ALL)
    private List<Item> items;

    @ManyToMany
    @JsonIgnore
    @JoinTable(name="Shopping_list_for_recipes",
            joinColumns=@JoinColumn(name="recipe_id"),
            inverseJoinColumns=@JoinColumn(name="shopping_list_id")
    )
    private List<ShoppingList> shoppingLists;


}

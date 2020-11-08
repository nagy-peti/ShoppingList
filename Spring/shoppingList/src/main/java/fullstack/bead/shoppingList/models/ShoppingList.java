package fullstack.bead.shoppingList.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity(name="shopping_list")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer owner_id;

    @Column
    private String name;

    @Column
    private String shared_with_friends;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="owner_id",insertable = false, updatable = false)
    private User user;

    @ManyToMany
    @JoinTable(name="Shopping_list_for_recipes",
            joinColumns=@JoinColumn(name="shopping_list_id"),
            inverseJoinColumns=@JoinColumn(name="recipe_id")
    )
    private List<Recipe> recipes;


    @OneToMany(mappedBy="shoppingList", cascade = CascadeType.ALL)
    private List<Item> items;
}

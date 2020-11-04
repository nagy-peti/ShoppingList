package fullstack.bead.shoppingList.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity(name="items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer shopping_list_id;

    @Column
    private Integer recipe_id;

    @Column
    private Integer quantity;

    @Column
    private String quantity_type;

    @Column
    private String name;


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="recipe_id",insertable = false, updatable = false)
    private Recipe recipe;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="shopping_list_id",insertable = false, updatable = false)
    private ShoppingList shoppingList;


}
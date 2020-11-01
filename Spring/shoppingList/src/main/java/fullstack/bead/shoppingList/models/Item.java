package fullstack.bead.shoppingList.models;

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
    private Integer quantity;

    @Column
    private String quantity_type;

    @Column
    private String name;



    public void setId(int id){
        this.id = id;
    }
}

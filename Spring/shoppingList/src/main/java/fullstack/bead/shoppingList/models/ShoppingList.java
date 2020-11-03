package fullstack.bead.shoppingList.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Boolean shared_with_friends;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="owner_id")
    private User user;
}

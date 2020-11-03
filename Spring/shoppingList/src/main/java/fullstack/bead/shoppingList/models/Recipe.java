package fullstack.bead.shoppingList.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name="recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

}

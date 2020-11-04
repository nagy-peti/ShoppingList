package fullstack.bead.shoppingList.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String username;

    @Column
    private String password;

    @OneToMany(mappedBy="user")
    private List<ShoppingList> shoppingLists;

    @ManyToMany
    @JoinTable(name="friends",
            joinColumns=@JoinColumn(name="id_1"),
            inverseJoinColumns=@JoinColumn(name="id_2")
    )
    private List<User> friends;
//
//    @ManyToMany
//    @JoinTable(name="friends",
//            joinColumns=@JoinColumn(name="id_2"),
//            inverseJoinColumns=@JoinColumn(name="id_1")
//    )
//    private List<User> friendOf;
}

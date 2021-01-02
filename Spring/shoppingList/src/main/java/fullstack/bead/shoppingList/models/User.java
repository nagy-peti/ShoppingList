package fullstack.bead.shoppingList.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name="users")
@Getter
@Setter
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

    @ManyToMany
    @JsonIgnore
    @JoinTable(name="friends",
            joinColumns=@JoinColumn(name="id_2"),
            inverseJoinColumns=@JoinColumn(name="id_1")
    )
    private List<User> friendOf;
}

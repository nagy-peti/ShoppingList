package fullstack.bead.shoppingList.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWithoutPassword {
    private int id;
    private String username;

    public UserWithoutPassword(int id,String username){
        this.id=id;
        this.username=username;
    }
}

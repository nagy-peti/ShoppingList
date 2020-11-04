package fullstack.bead.shoppingList.models;

import javax.persistence.Column;

public class ShoppingListForRecipes {


    @Column
    private Integer recipe_id;
    @Column
    private Integer shopping_list_id;
}

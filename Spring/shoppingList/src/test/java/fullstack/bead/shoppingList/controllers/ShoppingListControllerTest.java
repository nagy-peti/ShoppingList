package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.ShoppingList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ShoppingListControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldSavePostedShoppingList() throws Exception {
        ShoppingList newElement = new ShoppingList();
        newElement.setOwner_id(1);
        newElement.setName("new");
        ResponseEntity<ShoppingList> responsePost =
                restTemplate.
                        postForEntity("http://localhost:" + port + "/shopping_list",
                                newElement,
                                ShoppingList.class);
        assertThat(responsePost.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responsePost.getBody().getId()).isNotNull();
        assertThat(responsePost.getBody().getId()).isEqualTo(6);
        assertThat(responsePost.getBody().getOwner_id()).isEqualTo(1);
        assertThat(responsePost.getBody().getName()).isEqualTo("new");

    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldModifyShoppingList() throws Exception {
        ShoppingList newElement = new ShoppingList();
        newElement.setOwner_id(1);
        newElement.setName("new");

        HttpEntity<ShoppingList> requestUpdate = new HttpEntity<>(newElement);
        ResponseEntity<ShoppingList> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/shopping_list/1",
                        HttpMethod.PUT, requestUpdate, new ParameterizedTypeReference<ShoppingList>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getName()).isEqualTo("new");


    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldDeleteShoppingList() throws Exception {
        ResponseEntity<List<ShoppingList>> responseBefore =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/1/shoppinglists", HttpMethod.GET, null, new ParameterizedTypeReference<List<ShoppingList>>() {});
        assertThat(responseBefore.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseBefore.getBody().size()).isEqualTo(4);



        restTemplate.delete("http://localhost:" + port + "/shopping_list/1");


        ResponseEntity<List<ShoppingList>> responseAfter =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/1/shoppinglists", HttpMethod.GET, null, new ParameterizedTypeReference<List<ShoppingList>>() {});
        assertThat(responseAfter.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseAfter.getBody().size()).isEqualTo(4);
    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldAddRecipeToShoppingList() throws Exception {

        ResponseEntity<ShoppingList> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/shopping_list/3/addRecipe/1",
                        HttpMethod.PUT, null, new ParameterizedTypeReference<ShoppingList>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getRecipes().size()).isEqualTo(1);
    }

}
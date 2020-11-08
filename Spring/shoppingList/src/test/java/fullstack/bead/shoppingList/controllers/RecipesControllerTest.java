package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.Item;
import fullstack.bead.shoppingList.models.Recipe;
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
class RecipesControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    //
//
    @Test
    public void shouldReturnAllRecipes() throws Exception {
        ResponseEntity<List<Recipe>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);
    }

    @Test
    public void shouldReturnAllItemsOfARecipe() throws Exception {
        ResponseEntity<List<Recipe>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes/1/items", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);
        response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes/2/items", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(1);
    }


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldSavePostedRecipe() throws Exception {
        ResponseEntity<List<Recipe>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);


        Recipe newElement = new Recipe();
        newElement.setName("new");
        ResponseEntity<Recipe> responsePost =
                restTemplate.
                        postForEntity("http://localhost:" + port + "/recipes", newElement, Recipe.class);
        assertThat(responsePost.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responsePost.getBody().getId()).isNotNull();
        assertThat(responsePost.getBody().getId()).isEqualTo(3);
        assertThat(responsePost.getBody().getName()).isEqualTo("new");

        ResponseEntity<List<Recipe>> responseAfter =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(responseAfter.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseAfter.getBody().size()).isEqualTo(3);

    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldModifyRecipe() throws Exception {
        Recipe newElement = new Recipe();
        newElement.setName("new");
        newElement.setItems(null);

        HttpEntity<Recipe> requestUpdate = new HttpEntity<>(newElement);
        ResponseEntity<Recipe> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes/1",
                        HttpMethod.PUT, requestUpdate, new ParameterizedTypeReference<Recipe>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getName()).isEqualTo("new");
        assertThat(response.getBody().getItems()).isEqualTo(null);
        assertThat(response.getBody().getId()).isEqualTo(1);


    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldDeleteARecipe() throws Exception {
        ResponseEntity<List<Recipe>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);

        restTemplate.delete("http://localhost:" + port + "/recipes/1");



        ResponseEntity<List<Recipe>> responseAfter =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(responseAfter.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responseAfter.getBody().size()).isEqualTo(1);

    }

}
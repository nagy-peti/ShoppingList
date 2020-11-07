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
class ItemsControllerTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldSavePostedItem() throws Exception {
        Item newElement = new Item();
        newElement.setQuantity_type("type");
        newElement.setQuantity(1);
        newElement.setShopping_list_id(1);
        newElement.setName("new");
        ResponseEntity<Item> responsePost =
                restTemplate.
                        postForEntity("http://localhost:" + port + "/items",
                                newElement,
                                Item.class);

        assertThat(responsePost.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(responsePost.getBody().getId()).isNotNull();
        assertThat(responsePost.getBody().getId()).isEqualTo(7);
        assertThat(responsePost.getBody().getName()).isEqualTo("new");
        assertThat(responsePost.getBody().getQuantity()).isEqualTo(1);
        assertThat(responsePost.getBody().getShopping_list_id()).isEqualTo(1);
        assertThat(responsePost.getBody().getQuantity_type()).isEqualTo("type");


    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldModifyItem() throws Exception {
        Item newElement = new Item();
        newElement.setName("new");
        newElement.setQuantity(1000);
        newElement.setQuantity_type("newtype");
        newElement.setShopping_list_id(4);

        HttpEntity<Item> requestUpdate = new HttpEntity<>(newElement);
        ResponseEntity<Item> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/items/1",
                        HttpMethod.PUT, requestUpdate, new ParameterizedTypeReference<Item>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getName()).isEqualTo("new");
        assertThat(response.getBody().getId()).isEqualTo(1);
        assertThat(response.getBody().getQuantity_type()).isEqualTo("newtype");
        assertThat(response.getBody().getQuantity()).isEqualTo(1000);
        assertThat(response.getBody().getShopping_list_id()).isEqualTo(4);
    }


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldDeleteAnItem() throws Exception {

        restTemplate.delete("http://localhost:" + port + "/items/6");
        ResponseEntity<List<Recipe>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/recipes/2/items", HttpMethod.GET, null, new ParameterizedTypeReference<List<Recipe>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(0);

    }
}
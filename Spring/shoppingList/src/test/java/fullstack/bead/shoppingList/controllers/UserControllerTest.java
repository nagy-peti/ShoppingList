package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
import fullstack.bead.shoppingList.models.UserWithoutPassword;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldAddNewUser() throws Exception {
        User newUser = new User();
        newUser.setUsername("username_new");
        newUser.setPassword("password");
        ResponseEntity<Integer> responsePost =
                restTemplate.
                        postForEntity("http://localhost:" + port + "/users/register",
                                newUser,
                                Integer.class);

        assertThat(responsePost.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responsePost.getBody() != -1).isTrue();
    }

    @Test
    public void shouldReturnUserShoppingLists() throws Exception {
        ResponseEntity<List<ShoppingList>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/3/shoppinglists", HttpMethod.GET, null, new ParameterizedTypeReference<List<ShoppingList>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);
    }
    @Test
    public void shouldReturnUserFriends() throws Exception {

        ResponseEntity<List<UserWithoutPassword>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/4/friends", HttpMethod.GET, null, new ParameterizedTypeReference<List<UserWithoutPassword>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(1);


        response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/1/friends", HttpMethod.GET, null, new ParameterizedTypeReference<List<UserWithoutPassword>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);


    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    public void shouldSaveUserNewFriend() throws Exception {

        ResponseEntity<User> responsePost =
                restTemplate.
                        postForEntity("http://localhost:" + port + "/users/4/addFriend",
                                2,
                                User.class);
        assertThat(responsePost.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(responsePost.getBody().getId()).isNotNull();
        assertThat(responsePost.getBody().getId()).isEqualTo(4);


        ResponseEntity<List<UserWithoutPassword>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/4/friends", HttpMethod.GET, null, new ParameterizedTypeReference<List<UserWithoutPassword>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(2);
    }
}
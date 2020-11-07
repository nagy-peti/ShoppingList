package fullstack.bead.shoppingList.controllers;

import fullstack.bead.shoppingList.models.ShoppingList;
import fullstack.bead.shoppingList.models.User;
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
    public void shouldReturnUserShoppingLists() throws Exception {
        ResponseEntity<List<ShoppingList>> response =
                restTemplate.exchange(
                        "http://localhost:" + port + "/users/1/shoppinglists", HttpMethod.GET, null, new ParameterizedTypeReference<List<ShoppingList>>() {});
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().size()).isEqualTo(4);
    }
    @Test
    public void shouldReturnUserSharedShoppingLists() throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:" + port + "/users/2/sharedShoppingLists", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        //JSONAssert.assertEquals("[[1,\"sharedList1\",\" 2\"],[1,\"sharedList2\",\" 2 3\"]]", response.getBody(), false);
        assertThat(response.getBody()).isEqualTo("[[4,1,\"sharedList1\",\" 2\"],[5,1,\"sharedList2\",\"2 3\"]]");
    }
    @Test
    public void shouldReturnUserFriends() throws Exception {
        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:" + port + "/users/2/friends", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("[[1,\"user1\"]]");

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

        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:" + port + "/users/4/friends", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo("[[2,\"user2\"],[3,\"user3\"]]");
    }
}
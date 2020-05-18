<template>
  <div id="app" class="container-fluid">
    <div id="header">
      <div id="greeter">
        <p>
          Hey
          <br />
          <strong>{{this.$store.state.username}}!</strong>
        </p>
      </div>

      <div id="account-buttons">
        <md-button
          v-show="!this.$store.state.userId"
          class="md-primary md-dense"
          v-on:click="Login"
        >
          Login
          <Login />
        </md-button>
        <md-button
          v-show="!this.$store.state.userId"
          class="md-accent md-dense"
          v-on:click="Register"
        >
          Register
          <Register />
        </md-button>
        <md-button
          v-show="this.$store.state.userId"
          class="md-dense md-accent"
          v-on:click="Logout"
        >Logout</md-button>
      </div>
    </div>

    <div id="logo">
      <h3 id="logo">books kodi</h3>
    </div>

    <div id="content">
      <md-tabs class="md-transparent" md-alignment="fixed" md-sync-route>
        <md-tab id="tab-products" md-label="All Items" md-icon="group" to="/" exact></md-tab>
        <md-tab
          v-if="this.$store.state.userId"
          id="tab-user"
          md-label="Your Items"
          md-icon="person"
          to="/userproducts"
        ></md-tab>
        <md-tab id="lost-found" md-label="Lost N Found" md-icon="live_help" to="/lostfound"></md-tab>
      </md-tabs>
      <!-- 
      Content render here
      -->
      <router-view />
    </div>

    <div id="footer">You have reached the bottom!</div>

    <!-- 
    FAB
    -->
    <md-button
      v-show="this.$store.state.userId"
      class="md-fab md-fab-bottom-right md-primary md-fixed"
      v-on:click="AddProduct"
    >
      <md-icon>
        add
        <AddProduct />
      </md-icon>
    </md-button>
  </div>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";

export default {
  name: "products-list",
  data() {
    return {
      products: {}
    };
  },
  components: {
    Login,
    Register,
    AddProduct
  },
  methods: {
    Login() {
      this.$store.state.login = true;
    },
    Register() {
      this.$store.state.register = true;
    },
    AddProduct() {
      this.$store.state.addproduct = true;
    },
    Logout() {
      this.$store.commit("Logout");
      location.reload();
    }
  }
};
</script> 

<style scoped>
#app {
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(10px, 1fr) minmax(200px, 960px) minmax(
      10px,
      1fr
    );
  grid-template-rows: 80px 240px auto 40px;
}

#header {
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
}

#greeter {
  justify-self: start;
}

#account-buttons {
  justify-self: end;
  display: flex;
  flex-direction: row;
}

#content {
  grid-column: 2/3;
  grid-row: 3/4;
}

#greeter p {
  margin-top: 10px;
  font-size: 18px;
}

#logo {
  grid-column: 2/3;
  grid-row: 2/3;
  font-size: calc(40px + (72 - 40) * ((100vw - 300px) / (1600 - 300)));
  line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)));
  justify-self: center;
}

#footer {
  grid-column: 2/3;
  grid-row: 4/5;
  justify-self: center;
  margin: 10px;
}
</style>
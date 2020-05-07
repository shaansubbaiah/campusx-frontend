<template>
  <div id="app" class="container-fluid">
    <div id="header">
      <div id="greeter">
        <p>Hey {{this.$store.state.username}}!</p>
      </div>
      <div id="account-buttons">
        <md-button v-show="!this.$store.state.userId" class="md-dense md-raised">
          <router-link to="/login">Login</router-link>
        </md-button>
        <md-button v-show="!this.$store.state.userId" class="md-dense md-primary">
          <router-link to="/register">Register</router-link>
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
      <md-tabs
        class="md-transparent"
        v-show="this.$store.state.userId"
        md-alignment="fixed"
        md-sync-route
      >
        <md-tab id="tab-products" md-label="All Items" md-icon="group" to="/" exact></md-tab>
        <md-tab id="tab-user" md-label="Your Items" md-icon="person" to="/userproducts"></md-tab>
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
    >
      <router-link to="/add">
        <md-icon>add</md-icon>
      </router-link>
    </md-button>
  </div>
</template>

<script>
export default {
  name: "products-list",
  data() {
    return {
      products: {}
    };
  },
  methods: {
    Logout() {
      this.$store.commit("Logout");
    }
  }
};
</script> 

<style scoped>
@font-face {
  font-family: "archiaregular";
  src: url("assets/fonts/archia-regular-webfont.eot");
  src: url("assets/fonts/archia-regular-webfont.eot?#iefix")
      format("embedded-opentype"),
    url("assets/fonts/archia-regular-webfont.woff2") format("woff2"),
    url("assets/fonts/archia-regular-webfont.woff") format("woff"),
    url("assets/fonts/archia-regular-webfont.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "archiaregular" !important;
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
}

#content {
  grid-column: 2/3;
  grid-row: 3/4;
}

#greeter p {
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
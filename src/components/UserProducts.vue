<template>
  <div>
    <div
      class="container"
      v-masonry="masonryId"
      transition-duration="0.3s"
      item-selector=".item"
      fit-width="true"
      id="centered-masonry"
    >
      <div v-masonry-tile="masonryId" class="item" v-for="(product,index) in products" :key="index">
        <div class="card-button-container">
          <div class="button-box">
            <md-button class="md-accent" v-on:click="deleteProduct(product.id)">Delete</md-button>
            <md-button class="md-primary" v-on:click="update(product.id)">Edit</md-button>
          </div>
          <!-- 
          Book card layout
          -->
          <div v-if="product.book">
            <md-card class="rounded-card">
              <md-ripple>
                <md-card-media>
                  <a :href="'/product/' + product.id">
                    <img
                      v-bind:src="'http://localhost:8080/'+product.book.image"
                      alt="product.title"
                    />
                  </a>
                </md-card-media>

                <md-card-header>
                  <div class="md-title">
                    {{product.title | capitalize}}
                    <md-chip class="donation-chip md-primary" v-if="product.donation">D</md-chip>
                  </div>
                  <div class="md-subhead">by {{product.book.author | capitalize}}</div>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-chip>{{product.sem}}</md-chip>
                    <md-chip>{{product.branch}}</md-chip>
                  </div>
                  Published by {{product.book.publisher | capitalize}}
                  <br />
                  Contact: {{product.book.phone}}
                  <br />
                  Posted at: {{product.createdAt | datestring}}
                </md-card-content>

                <md-card-actions>
                  <md-chip>{{product.book.phone}}</md-chip>
                </md-card-actions>
              </md-ripple>
            </md-card>
          </div>

          <!-- 
          Drive card layout
          -->
          <div v-if="product.drive">
            <md-card class="rounded-card">
              <md-ripple>
                <md-card-header>
                  <a :href="'/product/' + product.id">
                    <div class="md-title">{{product.title | capitalize}}</div>
                    <div class="md-subhead">{{product.drive.description | capitalize}}</div>
                  </a>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-chip>{{product.sem}}</md-chip>
                    <md-chip>{{product.branch}}</md-chip>
                  </div>
                  Posted at: {{product.createdAt | datestring}}
                  <br />
                </md-card-content>

                <md-card-actions>
                  <md-chip>Open Link</md-chip>
                </md-card-actions>
              </md-ripple>
            </md-card>
          </div>

          <!-- 
          Other card layout
          -->
          <div v-if="product.other">
            <md-card class="rounded-card">
              <md-ripple>
                <md-card-media>
                  <a :href="'/product/' + product.id">
                    <img
                      v-bind:src="'http://localhost:8080/'+product.other.image"
                      alt="product.title"
                    />
                  </a>
                </md-card-media>

                <md-card-header>
                  <div class="md-title">
                    {{product.title | capitalize}}
                    <md-chip class="donation-chip md-primary" v-if="product.donation">D</md-chip>
                  </div>

                  <div class="md-subhead">{{product.other.description | capitalize}}</div>
                </md-card-header>

                <md-card-content>
                  <div>
                    <md-chip>{{product.sem}}</md-chip>
                    <md-chip>{{product.branch}}</md-chip>
                  </div>
                  Posted at: {{product.createdAt | datestring}}
                  <br />
                </md-card-content>

                <md-card-actions>
                  <md-chip>{{product.other.phone}}</md-chip>
                </md-card-actions>
              </md-ripple>
            </md-card>
          </div>
        </div>
      </div>
    </div>

    <div v-if="edit">
      <UpdateProduct />
    </div>

    <div v-if="alert">
      <Alert />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UpdateProduct from "./UpdateThing";
import Alert from "./Alert";
export default {
  name: "user-products",
  data() {
    return {
      alert: false,
      edit: false,
      products: {}
    };
  },
  components: {
    UpdateProduct,
    Alert
  },
  methods: {
    userProducts() {
      axios
        .get(
          "http://localhost:8080/api/users/" +
            this.$store.state.userId +
            "/things"
        )
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteProduct(id) {
      axios
        .delete("http://localhost:8080/api/things/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(response => {
          this.$store.state.message = response.data.message;
          this.alert = true;
        });
    },
    update(id) {
      axios
        .get("http://localhost:8080/api/things/" + id)
        .then(response => {
          this.$store.state.pid = response.data;
          console.log(this.$store.state.pid);
          this.edit = true;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.userProducts();
  }
};
</script> 

<style scoped>
.container {
  margin-top: 40px;
}
.button-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.card-button-container {
  display: block;
  border-radius: 25px;
  box-shadow: 0 7px 45px -10px rgba(68, 138, 255, 0.6);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(68, 138, 255, 1) 100%
  );
  margin: 10px 5px 10px 5px;
}
</style>
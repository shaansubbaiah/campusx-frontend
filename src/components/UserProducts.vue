<template>
  <div>
    <div class="top-text">
      Your
      <span style="color:rgba(68, 138, 255, 1)">Products</span> and
      <span style="color:rgba(239, 76, 121, 1)">LostnFound</span>
      items
    </div>
    <div
      class="container"
      v-masonry="masonryId"
      transition-duration="0.3s"
      item-selector=".item"
      fit-width="true"
      id="centered-masonry"
    >
      <!-- 
      User things
      -->
      <div v-masonry-tile="masonryId" class="item" v-for="(product,index) in products" :key="index">
        <div class="card-button-container blue-border">
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
                    <div class="md-title" id="drive-title">{{product.title | capitalize}}</div>
                    <div
                      class="md-subhead"
                      id="drive-desc"
                    >{{product.drive.description | capitalize}}</div>
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
      <!-- 
      User lost found items 
      -->
      <div
        v-masonry-tile="masonryId"
        class="item"
        v-for="(lostfound,index) in lostfounds"
        :key="index"
      >
        <!-- 
        LostFound card layout
        -->
        <div class="card-button-container pink-border">
          <div class="button-box">
            <md-button class="md-accent" v-on:click="deleteLostfound(lostfound.id)">Delete</md-button>
          </div>
          <div>
            <md-card class="rounded-card">
              <md-ripple>
                <md-card-media>
                  <img v-bind:src="'http://localhost:8080/'+lostfound.image" alt="lostfound.title" />
                </md-card-media>

                <md-card-header>
                  <div class="md-title">{{lostfound.title | capitalize}}</div>
                  <div class="md-subhead">Found at: {{lostfound.location | capitalize}}</div>
                </md-card-header>

                <md-card-content>
                  Located at: {{lostfound.description | capitalize}}
                  <br />
                  Posted at: {{lostfound.createdAt | datestring}}
                  <br />
                </md-card-content>

                <md-card-actions>
                  <div>
                    <md-chip>{{lostfound.phone}}</md-chip>
                  </div>
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
import http from "../http-common";
import UpdateProduct from "./UpdateThing";
import Alert from "./Alert";

export default {
  name: "user-products",
  data() {
    return {
      alert: false,
      edit: false,
      products: {},
      lostfounds: {}
    };
  },
  components: {
    UpdateProduct,
    Alert
  },
  methods: {
    userProducts() {
      http
        .get("/users/" + this.$store.state.userId + "/things")

        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteProduct(id) {
      http
        .delete("/things/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(response => {
          this.$store.state.message = response.data.message;
          this.alert = true;
        });
    },
    update(id) {
      http
        .get("/things/" + id)
        .then(response => {
          this.$store.state.product = response.data;
          console.log(this.$store.state.product);
          this.edit = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    userLostfounds() {
      http
        .get("/users/" + this.$store.state.userId + "/lostfounds")
        .then(response => {
          this.lostfounds = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteLostfound(id) {
      http
        .delete("/lostfound/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.token }
        })
        .then(response => {
          this.$store.state.message = response.data.message;
          this.alert = true;
        });
    }
  },
  mounted() {
    this.userProducts();
    this.userLostfounds();
  }
};
</script> 

<style scoped>
.top-text {
  margin: 30px;
  text-align: center;
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
  margin: 10px 5px 10px 5px;
}
.pink-border {
  box-shadow: 0 7px 45px -10px rgba(239, 76, 121, 0.6);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(239, 76, 121, 1) 100%
  );
}
.blue-border {
  box-shadow: 0 7px 45px -10px rgba(68, 138, 255, 0.6);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(68, 138, 255, 1) 100%
  );
}
</style>
<template>
  <div>
    <md-dialog :md-active="true">
      <md-dialog-content class="md-scrollbar">
        <md-dialog-title>{{product.title | capitalize}}</md-dialog-title>

        <div v-if="product.book">
          <div class="card">
            <div class="image">
              <md-card-media>
                <img v-bind:src="'http://localhost:8080/'+product.book.image" />
              </md-card-media>
            </div>
            <div class="info">
              <div>
                <md-chip>{{product.sem}}</md-chip>
                <md-chip>{{product.branch}}</md-chip>
                <md-chip class="md-primary" v-if="product.donation">Donation</md-chip>
              </div>
              <div>
                Authored by
                <strong>{{product.book.author | capitalize}}</strong>
                <br />Published by
                <strong>{{product.book.publisher | capitalize}}</strong>
                <br />Posted at:
                <strong>{{product.createdAt | datestring}}</strong>
              </div>
              <md-button class="md-raised md-primary" v-on:click="toggleContact">{{contactMessage}}</md-button>
            </div>
          </div>
        </div>

        <div v-if="product.drive">
          <div class="info">
            <div>
              <md-chip>{{product.sem}}</md-chip>
              <md-chip>{{product.branch}}</md-chip>
            </div>
            <div>
              Description:
              <strong>{{product.drive.description | capitalize}}</strong>
              <br />Links to:
              <strong>
                <a>{{product.drive.url}}</a>
              </strong>
              <br />Posted at:
              <strong>{{product.createdAt | datestring}}</strong>
            </div>
          </div>
        </div>

        <div v-if="product.other">
          <div class="card">
            <div class="image">
              <md-card-media>
                <img v-bind:src="'http://localhost:8080/'+product.other.image" />
              </md-card-media>
            </div>
            <div class="info">
              <div>
                <md-chip>{{product.sem}}</md-chip>
                <md-chip>{{product.branch}}</md-chip>
                <md-chip class="md-primary" v-if="product.donation">Donation</md-chip>
              </div>
              <div>
                Description:
                <strong>{{product.other.description}}</strong>
                <br />Posted at:
                <strong>{{product.createdAt | datestring}}</strong>
              </div>
              <md-button class="md-raised md-primary" v-on:click="toggleContact">{{contactMessage}}</md-button>
            </div>
          </div>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" v-on:click="copyLink">{{shareMessage}}</md-button>
        <md-button class="md-accent" to="/">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "product",
  data() {
    return {
      contactMessage: "Show Contact",
      shareMessage: "Share",
      product: {
        id: 0,
        title: "",
        author: "",
        sem: null,
        branch: "",
        publisher: "",
        image: "",
        description: "",
        link: ""
      }
    };
  },
  methods: {
    retrieveProduct() {
      let pid = this.$route.params.id;
      http
        .get("/things/" + pid)
        .then(response => {
          this.product = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    toggleContact() {
      if (this.contactMessage == "Show Contact") {
        if (this.product.book) {
          this.contactMessage = this.product.book.phone;
        } else if (this.product.other) {
          this.contactMessage = this.product.other.phone;
        }
      } else {
        this.contactMessage = "Show Contact";
      }
    },
    copyLink() {
      this.$copyText(`http://localhost:8081/product/${this.product.id}`).then(
        e => {
          this.shareMessage = "Copied!";
          console.log(e);
        }
      );
    }
  },
  mounted() {
    this.retrieveProduct();
  }
};
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.info,
.image {
  margin: 10px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

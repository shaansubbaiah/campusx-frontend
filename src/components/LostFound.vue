<template>
  <div
    class="container"
    v-masonry="masonryId"
    transition-duration="0.3s"
    item-selector=".item"
    fit-width="true"
    id="centered-masonry"
  >
    <div
      v-masonry-tile="masonryId"
      class="item"
      v-for="(lostfound,index) in lostfounds"
      :key="index"
    >
      <!-- 
        LostFound card layout
      -->
      <md-card class="rounded-card">
        <md-ripple>
          <md-card-media>
            <img v-bind:src="'http://localhost:8080/'+lostfound.image" alt="lostfound.title" />
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{lostfound.title}}</div>
            <div class="md-subhead">found at {{lostfound.location}}</div>
          </md-card-header>

          <md-card-content>
            Located at: {{lostfound.description}}
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
</template>

<script>
import http from "../http-common";

export default {
  name: "LostFound",
  data() {
    return {
      lostfounds: {}
    };
  },
  methods: {
    retrieveLostandFound() {
      http
        .get("/lostfound/all")
        .then(response => {
          this.lostfounds = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveLostandFound();
  }
};
</script>

<style scoped>
.container {
  margin-top: 40px;
}
</style>

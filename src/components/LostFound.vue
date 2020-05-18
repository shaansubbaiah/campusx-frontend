<template>
  <div class="container" v-masonry="masonryId" transition-duration="0.3s" item-selector=".item">
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

          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <div>
                <md-chip>{{lostfound.phone}}</md-chip>
              </div>
              <md-card-expand-trigger>
                <md-button class="md-icon-button">
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>
                Located at: {{lostfound.description}}
                <br />
                Posted at: {{lostfound.createdAt}}
                <br />
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
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
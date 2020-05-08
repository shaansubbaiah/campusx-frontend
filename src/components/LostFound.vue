<template>
  <div>
    <div class="container">
      <div v-for="(lostfound,index) in lostfounds" :key="index">
        <!-- 
        LostFound card layout
        -->
        <md-card class="thing-card">
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
.card-expansion {
  height: 480px;
}

.md-toolbar {
  box-shadow: 0 7px 45px -10px rgba(67, 137, 255, 1) !important;
  border-radius: 20px !important;
  margin: 25px !important;
}

.md-card {
  width: 300px;
  margin: 10px 5px 10px 5px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.6) !important;
}

.md-card:hover {
  transform: scale(1.02);
  transition-duration: 1s !important;
  box-shadow: 0 7px 45px -10px rgba(150, 170, 180, 0.7) !important;
}

img,
.thing-card,
.thing-card .md-card-media {
  border-radius: 20px !important;
}

.thing-card .md-card-expand {
  border-radius: 0px 0px 20px 20px;
}
</style>
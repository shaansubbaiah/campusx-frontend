<template>
  <div>Lost Found</div>
</template>

<script>
import http from "../http-common";

export default {
  name: "LostFound",
  data() {
    return {};
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
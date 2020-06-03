<template>
  <div>

  <md-dialog :md-active.sync="active">
      <p>{{this.$store.state.message}}</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="onConfirm">Sweet!</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>

</template>

<script>
export default {
  name: "Alert",
  data: () => ({
    active: true
  }),
  methods: {
    onConfirm() {
      this.active = false;
      this.$store.state.alert = false;
      this.$store.state.message = "";
      this.$router.push("/");
      location.reload();
    }
  }
};
</script>

<style>
  p{
    text-align: center;
    margin: 40px 20px 10px 20px;
    font-size: 1.2em;
  }
</style>
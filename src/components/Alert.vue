<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      :md-content="this.$store.state.message"
      md-confirm-text="Sweet!"
      md-cancel-text
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
export default {
  name: "DialogConfirm",
  data: () => ({
    active: true
  }),
  methods: {
    onConfirm() {
      this.$store.state.alert = false;
      this.$store.state.message = "";
      this.$router.push("/");
      location.reload();
    }
  }
};
</script>
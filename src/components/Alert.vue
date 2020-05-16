<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="active"
      :md-content="this.$store.state.message"
      md-confirm-text="Cool!"
      md-cancel-text=""
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
  export default {
    name: 'DialogConfirm',
    data: () => ({
      active: true,
    }),
    methods: {
      onConfirm () {
        this.$router.push("/");
        location.reload();
      }
    }
  }
</script>
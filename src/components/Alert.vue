<template>
  <div>
    <md-dialog-alert
      :md-active.sync="show"
      :md-content="this.$store.state.message"
      md-cancel-text="Cool!"
      @close="confirm" > 
    </md-dialog-alert>
  </div>
</template>

<script>
export default {
  data() {
    return{
      show: true
    }
  },
  methods: {
    confirm() {
      this.$store.state.message = "";
      location.reload();
    }
  }
}
</script>
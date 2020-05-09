<template>
  <div>
    <md-dialog :md-active="true">
      <md-dialog-content>
        <form>
          <div v-if="!submitted">
            <md-field class="form-data">
              <label for="email">Email</label>
              <md-input
                name="email"
                id="email"
                v-model="user.email"
                v-validate="'required|email|max:50'"
              ></md-input>
              <div v-if="errors.has('email')">{{errors.first('email')}}</div>
            </md-field>

            <md-field class="form-data">
              <label for="password">Password</label>
              <md-input
                name="password"
                id="password"
                v-model="user.password"
                v-validate="'required|min:8|max:20'"
              ></md-input>
              <div v-if="errors.has('password')">{{errors.first('password')}}</div>
            </md-field>

            <md-dialog-actions>
              <md-button v-on:click="login" class="md-raised md-primary">Login</md-button>
              <md-button class="md-accent" to="/">Cancel</md-button>
            </md-dialog-actions>
          </div>
        </form>

        <div v-if="message">{{message}}</div>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "Login",
  data() {
    return {
      message: "",
      submitted: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.submitted = true;
      this.$validator.validate().then(async isValid => {
        if (isValid) {
          var data = {
            email: this.user.email,
            password: this.user.password
          };
          try {
            await http
              .post("/users/login", data)
              .then(response => {
                this.message = response.data.message;
                if (response.status) {
                  var persisted_state = {
                    name: response.data.name,
                    id: response.data.id,
                    tk: response.data.token
                  };
                  this.$store.commit("Login", persisted_state);
                }
              })
              .catch(e => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
          //this.$router.push('/');
        }
      });
    }
  }
};
</script>
<style scoped>
</style>

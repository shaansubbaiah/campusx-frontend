<template>
  <div>
    <md-dialog :md-active="true">
      <md-dialog-content>
        <form>
          <div v-if="!submitted">
            <md-field class="form-data">
              <label for="name">Username</label>
              <md-input
                name="name"
                id="name"
                v-model="user.name"
                v-validate="'required|min:3|max:20'"
              ></md-input>
              <div v-if="errors.has('name')">{{errors.first('name')}}</div>
            </md-field>

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
          </div>
        </form>

        <div v-if="message">{{message}}</div>
        <md-dialog-actions>
          <md-button v-on:click="register" class="md-raised md-primary">Register</md-button>
          <md-button class="md-accent" to="/">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "Register",
  data() {
    return {
      message: "",
      submitted: false,
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$validator.validate().then(async isValid => {
        if (isValid) {
          var data = {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          };
          try {
            await http
              .post("/users/register", data)
              .then(response => {
                if (response.data.message == `Email has already registered.`) {
                  this.message = response.data.message;
                } else {
                  this.message = "Successful..Login to continue";
                }
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
        }
      });
    }
  }
};
</script>

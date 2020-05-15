<template>
  <div>
    <md-dialog :md-active="this.$store.state.login">
      <md-dialog-content>
        <form>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" v-model="user.email"></md-input>
            <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">PASSWORD</label>
            <md-input type="password" name="password" id="password" v-model="user.password"></md-input>
            <span class="md-error" v-if="!$v.user.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.user.password.minLength">Atleast 8 characters</span>
          </md-field>

            <md-dialog-actions>
            <md-button v-on:click="validateLogin" class="md-raised md-primary">Login</md-button>
            <md-button v-on:click="cancel" class="md-accent">Cancel</md-button>
          </md-dialog-actions>
        </form>
       
      </md-dialog-content>
    </md-dialog>

    <div v-if="alert">
      <Alert />
    </div>

  </div>
</template>

<script>
import http from "../http-common";
import { validationMixin } from "vuelidate";
import Alert from "./Alert";

import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      alert :false,
      message: "",
      user: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  components: {
    Alert
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login();
      }
    },
    login() {
      var data = {
        email: this.user.email,
        password: this.user.password
      };
      http
        .post("/users/login", data)
        .then(response => {
          this.$store.state.message = response.data.message;
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
      this.alert = true;
      this.$store.state.login = false;
    },
    cancel() {
      this.$store.state.login = false;
    }
  }
};
</script>
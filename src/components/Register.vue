<template>
  <div>
    <md-dialog :md-active="this.$store.state.register">
      <md-dialog-content>
        <form>
          <md-field :class="getValidationClass('name')">
            <label for="name">Username</label>
            <md-input type="name" v-model="user.name"></md-input>
            <span class="md-error" v-if="!$v.user.name.required">Required field</span>
            <span class="md-error" v-else-if="!$v.user.name.minLength">Atleast 3 characters</span>
          </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" v-model="user.email"></md-input>
            <span class="md-error" v-if="!$v.user.email.required">Required field</span>
            <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" v-model="user.password"></md-input>
            <span class="md-error" v-if="!$v.user.password.required">Required field</span>
            <span class="md-error" v-else-if="!$v.user.password.minLength">Atleast 8 characters</span>
          </md-field>

          <md-dialog-actions>
            <md-button v-on:click="validateRegister" class="md-raised md-primary">Register</md-button>
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
  name: "Register",
  mixins: [validationMixin],
  data() {
    return {
      alert: false,
      message: "",
      user: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  components: {
    Alert
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(3)
      },
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
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateRegister() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.register();
      }
    },
    register() {
      var data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      };
      http
        .post("/users/register", data)
        .then(response => {
          if (response.data.message == `Email has already registered.`) {
            this.$store.state.message = response.data.message;
          } else {
            this.$store.state.message = "Successful..Login to continue";
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.alert = true;
      this.$store.state.register = false;
    },
    cancel() {
      this.$store.state.register = false;
    }
  }
};
</script>

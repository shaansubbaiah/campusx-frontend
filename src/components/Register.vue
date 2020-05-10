<template>
  <div>
    <md-dialog :md-active="true">
      <md-dialog-content>
        <form>
          <div v-if="!submitted">

            <md-field :class="getValidationClass('name')">
              <label for="name">USERNAME</label>
              <md-input
                type="name"
                name="name"
                id="name"
                v-model="user.name"
              ></md-input>
              <span class="md-error" v-if="!$v.user.name.required">The username is required</span>
              <span class="md-error" v-else-if="!$v.user.name.minLength">Atleast 3 characters</span>
            </md-field>

            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                v-model="user.email"
              ></md-input>
              <span class="md-error" v-if="!$v.user.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.user.email.email">Invalid email</span>
            </md-field>

            <md-field :class="getValidationClass('password')">
              <label for="password">PASSWORD</label>
              <md-input
                type="password"
                name="password"
                id="password"
                v-model="user.password"
              ></md-input>
              <span class="md-error" v-if="!$v.user.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.user.password.minLength">Atleast 8 characters</span>
            </md-field>

          </div>
        </form>

        <div v-if="message">{{message}}</div>
        <md-dialog-actions>
          <md-button v-on:click="validateRegister" class="md-raised md-primary">Register</md-button>
          <md-button class="md-accent" to="/">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import http from "../http-common";
import { validationMixin } from 'vuelidate'

import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'


export default {
  name: "Register",
  mixins: [validationMixin],
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
    const field = this.$v.user[fieldName]

    if (field) {
      return {
        'md-invalid': field.$invalid && field.$dirty
      }
    }
  },
  validateRegister() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.register()
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
              this.message = response.data.message;
            } else {
              this.message = "Successful..Login to continue";
            }
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        this.submitted = true;
    }
  }
};
</script>

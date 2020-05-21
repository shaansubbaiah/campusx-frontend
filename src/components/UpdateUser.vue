<template>
  <div>
    <md-dialog :md-active="this.$store.state.updateuser">
      <md-dialog-content>
        <form>
          <md-field :class="getValidationClass('name')">
            <label for="name">NEW USERNAME</label>
            <md-input type="name" v-model="user.name"></md-input>
            <span class="md-error" v-if="!$v.user.name.minLength">Atleast 3 characters</span>
          </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">NEW EMAIL</label>
            <md-input type="email" v-model="user.email"></md-input>
            <span class="md-error" v-if="!$v.user.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('oldpassword')">
            <label for="oldpassword">OLD PASSWORD</label>
            <md-input type="password" v-model="user.oldpassword"></md-input>
            <span class="md-error" v-if="!$v.user.oldpassword.required">Old password required</span>
            <span class="md-error" v-if="!$v.user.oldpassword.minLength">Atleast 8 characters</span>
          </md-field>

          <md-field :class="getValidationClass('newpassword')">
            <label for="newpassword">NEW PASSWORD</label>
            <md-input type="password" v-model="user.newpassword"></md-input>
            <span class="md-error" v-if="!$v.user.newpassword.minLength">Atleast 8 characters</span>
          </md-field>

          <md-dialog-actions>
            <md-button v-on:click="validateUpdate" class="md-raised md-primary">Update</md-button>
            <md-button v-on:click="cancel" class="md-accent">Cancel</md-button>
          </md-dialog-actions>
        </form>
      </md-dialog-content>
    </md-dialog>

    <div v-if="alert">
      <Alert />
    </div>

    <md-dialog-confirm
      :md-active.sync="successalert"
      :md-content="this.$store.state.message"
      md-confirm-text="Logout"
      md-cancel-text
      @md-confirm="Logout"
    />
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
      successalert: false,
      message: "",
      user: {
        oldpassword: "",
        newpassword: ""
      }
    };
  },
  components: {
    Alert
  },
  validations: {
    user: {
      name: {
        minLength: minLength(3)
      },
      email: {
        email
      },
      oldpassword: {
        required,
        minLength: minLength(8)
      },
      newpassword: {
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

    validateUpdate() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.update();
      }
    },

    update() {
      var data = {
        name: this.user.name,
        email: this.user.email,
        pass: this.user.oldpassword,
        newpass: this.user.newpassword
      };
      http
        .put("/users/" + this.$store.state.userId, data, {
          headers: {
            "content-type": undefined,
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(response => {
          if (response.data.message == `User updated successfully`) {
            this.$store.state.message = response.data.message;
            this.successalert = true;
          } else {
            this.$store.state.message = response.data.message;
            this.alert = true;
          }
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      this.$store.state.updateuser = false;
    },

    Logout() {
      this.$store.commit("Logout");
      location.reload();
    },

    cancel() {
      this.$store.state.updateuser = false;
    }
  }
};
</script>

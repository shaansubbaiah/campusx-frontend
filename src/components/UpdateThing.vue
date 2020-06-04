<template>
  <div>
    <md-dialog :md-active="show">
      <md-dialog-content class="md-scrollbar">

        <md-dialog-title>EDIT AD!</md-dialog-title>

        <div v-if="product.book">
          <form @submit.prevent="validateBook(product.id)">

            <md-field :class="{'md-invalid' : $v.product.title.$error}">
              <label for="title">TITLE</label>
              <md-input v-model="$v.product.title.$model"></md-input>
              <span class="md-error" v-if="!$v.product.title.required">Required field</span>
            </md-field>

            <md-field :class="{'md-invalid' : $v.product.book.author.$error}">
              <label for="author">AUTHOR</label>
              <md-input v-model="$v.product.book.author.$model"></md-input>
              <span class="md-error" v-if="!$v.product.book.author.required">Required field</span>
              <span class="md-error" v-else-if="!$v.product.book.author.alphabet">Invalid characters</span>
            </md-field>

            <md-field :class="{'md-invalid' : $v.product.book.publisher.$error}">
              <label for="publisher">PUBLISHER</label>
              <md-input v-model="$v.product.book.publisher.$model"></md-input>
              <span class="md-error" v-if="!$v.product.book.publisher.required">Required field</span>
            </md-field>

            <md-field>
              <label for="sem">SEM</label>
              <md-select v-model="product.sem">
                <md-option
                  v-for="semester in semesters"
                  :value="semester"
                  :key="semester"
                >{{semester}}</md-option>
              </md-select>
            </md-field>

            <md-field>
              <label for="branch">BRANCH</label>
              <md-select v-model="product.branch">
                <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
              </md-select>
            </md-field>

            <md-field>
              <label for="donation">TYPE</label>
              <md-select v-model="product.donation">
                <md-option value=true>Donation</md-option>
                <md-option value=false>Trade</md-option>
              </md-select>
            </md-field>

            <md-field :class="{'md-invalid' : $v.product.book.phone.$error}">
              <label for="phone">CONTACT</label>
              <md-input v-model="$v.product.book.phone.$model"></md-input>
              <span class="md-error" v-if="!$v.product.book.phone.required">Required field</span>
              <span class="md-error" v-else-if="!$v.product.book.phone.number">Invalid contact</span>
            </md-field>

            <span>
              <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
              <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
            </span>

          </form>
        </div>

        <div v-if="product.drive">
          <form @submit.prevent="validateDrive(product.id)">

          <md-field :class="{'md-invalid' : $v.product.title.$error}">
            <label for="title">TITLE</label>
            <md-input v-model="$v.product.title.$model"></md-input>
            <span class="md-error" v-if="!$v.product.title.required">Required field</span>
          </md-field>

          <md-field :class="{'md-invalid' : $v.product.drive.url.$error}">
            <label for="url">LINK</label>
            <md-input v-model="$v.product.drive.url.$model"></md-input>
            <span class="md-error" v-if="!$v.product.drive.url.required">Required field</span>
            <span class="md-error" v-else-if="!$v.product.drive.url.url">Invalid URL</span>
          </md-field>

          <md-field :class="{'md-invalid' : $v.product.drive.description.$error}">
            <label for="description">DESCRIPTION</label>
            <md-input v-model="$v.product.drive.description.$model"></md-input>
            <span class="md-error" v-if="!$v.product.drive.description.required">Required field</span>
          </md-field>

          <md-field>
            <label for="sem">SEM</label>
            <md-select v-model="product.sem">
              <md-option
                v-for="semester in semesters"
                :value="semester"
                :key="semester"
              >{{semester}}</md-option>
            </md-select>
          </md-field>

          <md-field>
            <label for="branch">BRANCH</label>
            <md-select v-model="product.branch">
              <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
            </md-select>
          </md-field>

          <span>
            <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
            <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
          </span>

          </form>
        </div>

        <div v-if="product.other">
        <form @submit.prevent="validateOther(product.id)">

          <md-field :class="{'md-invalid' : $v.product.title.$error}">
            <label for="title">TITLE</label>
            <md-input v-model="$v.product.title.$model"></md-input>
            <span class="md-error" v-if="!$v.product.title.required">Required field</span>
          </md-field>

          <md-field :class="{'md-invalid' : $v.product.other.description.$error}">
            <label for="description">DESCRIPTION</label>
            <md-input v-model="$v.product.other.description.$model"></md-input>
            <span class="md-error" v-if="!$v.product.other.description.required">Required field</span>
          </md-field>

          <md-field>
            <label for="sem">SEM</label>
            <md-select v-model="product.sem">
              <md-option
                v-for="semester in semesters"
                :value="semester"
                :key="semester"
              >{{semester}}</md-option>
            </md-select>
          </md-field>

          <md-field>
            <label for="branch">BRANCH</label>
            <md-select v-model="product.branch">
              <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
            </md-select>
          </md-field>

          <md-field>
            <label for="donation">TYPE</label>
            <md-select v-model="product.donation">
              <md-option value=true>Donation</md-option>
              <md-option value=false>Trade</md-option>
            </md-select>
          </md-field>

          <md-field :class="{'md-invalid' : $v.product.other.phone.$error}">
            <label for="phone">CONTACT</label>
            <md-input v-model="$v.product.other.phone.$model"></md-input>
            <span class="md-error" v-if="!$v.product.other.phone.required">Required field</span>
            <span class="md-error" v-else-if="!$v.product.other.phone.number">Invalid contact</span>
          </md-field>

          <span>
            <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
            <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
          </span>

        </form>
      </div>

      </md-dialog-content>
    </md-dialog>

    <div v-if="alert">
      <Alert />
    </div>

  </div>
</template>

<script>
import http from "../http-common";
import Alert from "./Alert";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";

export default {
    name: "updateproduct",
    mixins: [validationMixin],
    data() {
      return {
        product: "",
        alert: false,
        show: true,
        semesters: ["1", "2", "3", "4", "5", "6", "7", "8"],
        branches: [
          "CSE",
          "ISE",
          "ECE",
          "MECH",
          "CIV",
          "BIO",
          "MED",
          "ELEC",
          "ARCH"
        ]
      };
    },
  components: {
    Alert
  },
  validations: {
    product: {
      title: {
        required
      },
      book: {
        author: {
          required,
          alphabet(author) {
            return /^[a-zA-Z ]*$/.test(author);
          }
        },
        publisher: {
          required
        },
        phone: {
          required,
          number(phone) {
            return /^(\+91( )?)?[0-9]{10}$/g.test(phone);
          }
        }
      },
      drive:{
        url: {
          required,
          url
        },
        description:{
           required
        }
      },
      other:{
        description:{
          required
        },
        phone: {
          required,
          number(phone) {
            return /^(\+91( )?)?[0-9]{10}$/g.test(phone);
          }
        }
      }
    }
  },
  methods: {
    validateBook(id) {
      if (!this.$v.product.book.$invalid && !this.$v.product.title.$invalid) {
        this.updateBook(id);
      }
    },
    validateDrive(id) {
      if (!this.$v.product.drive.$invalid && !this.$v.product.title.$invalid) {
        this.updateDrive(id);
      }
    },
    validateOther(id) {
      if (!this.$v.product.other.$invalid && !this.$v.product.title.$invalid) {
        this.updateOther(id);
      }
    },
    updateBook(id){
      var data = {
        title: this.product.title,
        author: this.product.book.author,
        sem: this.product.sem,
        branch: this.product.branch,
        publisher: this.product.book.publisher,
        donation: this.product.donation,
        phone: this.product.book.phone,
        type: 'book'
      }
      http
        .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
        .then(response => {
          this.show = false;
          this.$store.state.message = response.data.message;
        })
        .catch(e => {
            console.log(e);
        })
        this.alert = true;
    },
    updateDrive(id){
      var data = {
        title: this.product.title,
        url: this.product.drive.url,
        sem: this.product.sem,
        branch: this.product.branch,
        description: this.product.drive.description,
        type: 'drive'
      }
      http
        .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
        .then(response => {
          this.show = false;
          this.$store.state.message = response.data.message;
        })
        .catch(e => {
            console.log(e);
        })
        this.alert = true;
    },
    updateOther(id){
      var data = {
        title: this.product.title,
        sem: this.product.sem,
        branch: this.product.branch,
        description: this.product.other.description,
        donation: this.product.donation,
        type: 'other'
      }
      http
        .put("/things/"+id,data,{ headers: { Authorization: 'Bearer ' + this.$store.state.token } })
        .then(response => {
          this.show = false;
          this.$store.state.message = response.data.message;
        })
        .catch(e => {
            console.log(e);
        })
        this.alert = true;
    },
    cancel() {
      location.reload();
    }
  },
  mounted(){
    this.product = this.$store.state.product;
  }
}
</script>

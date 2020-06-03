<template>
  <div>
    <md-dialog :md-active="this.$store.state.addproduct">
      <md-dialog-content>
        <md-dialog-title>POST AN AD!</md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="BOOK">
            <form @submit.prevent="validateBook">
              <md-field :class="getValidationClass('title')">
                <label for="title">TITLE</label>
                <md-input v-model="product.title"></md-input>
                <span class="md-error" v-if="!$v.product.title.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('author')">
                <label for="author">AUTHOR</label>
                <md-input v-model="product.author"></md-input>
                <span class="md-error" v-if="!$v.product.author.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.author.alphabet">Invalid characters</span>
              </md-field>

              <md-field :class="getValidationClass('publisher')">
                <label for="publisher">PUBLISHER</label>
                <md-input v-model="product.publisher"></md-input>
                <span class="md-error" v-if="!$v.product.publisher.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('sem')">
                <label for="sem">SEM</label>
                <md-select v-model="product.sem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.sem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('branch')">
                <label for="branch">BRANCH</label>
                <md-select v-model="product.branch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.branch.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('donation')">
                <label for="donation">TYPE</label>
                <md-select v-model="product.donation">
                  <md-option value="1">Donation</md-option>
                  <md-option value="0">Trade</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.donation.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('phone')">
                <label for="phone">CONTACT</label>
                <md-input v-model="product.phone"></md-input>
                <span class="md-error" v-if="!$v.product.phone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.phone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('selectedFile')">
                <label>IMAGE</label>
                <md-file @change="onFileSelected" accept="image/*" />
                <span class="md-error" v-if="!$v.selectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="LINK">
            <form @submit.prevent="validateLink">
              <md-field :class="getValidationClass('title')">
                <label for="title">TITLE</label>
                <md-input v-model="product.title"></md-input>
                <span class="md-error" v-if="!$v.product.title.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('link')">
                <label for="link">LINK</label>
                <md-input v-model="product.link"></md-input>
                <span class="md-error" v-if="!$v.product.link.required">Required field</span>
                <span class="md-error" v-if="!$v.product.link.url">Invalid URL</span>
              </md-field>

              <md-field :class="getValidationClass('description')">
                <label for="description">DESCRIPTION</label>
                <md-input v-model="product.description"></md-input>
                <span
                  class="md-error"
                  v-if="!$v.product.description.required"
                >The description is required</span>
              </md-field>

              <md-field :class="getValidationClass('sem')">
                <label for="sem">SEM</label>
                <md-select v-model="product.sem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.sem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('branch')">
                <label for="branch">BRANCH</label>
                <md-select v-model="product.branch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.branch.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="OTHER">
            <form @submit.prevent="validateOther">
              <md-field :class="getValidationClass('title')">
                <label for="title">TITLE</label>
                <md-input v-model="product.title"></md-input>
                <span class="md-error" v-if="!$v.product.title.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('description')">
                <label for="description">DESCRIPTION</label>
                <md-input v-model="product.description"></md-input>
                <span class="md-error" v-if="!$v.product.description.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('sem')">
                <label for="sem">SEM</label>
                <md-select v-model="product.sem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.sem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('branch')">
                <label for="branch">BRANCH</label>
                <md-select v-model="product.branch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.branch.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('donation')">
                <label for="donation">TYPE</label>
                <md-select v-model="product.donation">
                  <md-option value="1">Donation</md-option>
                  <md-option value="0">Trade</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.donation.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('phone')">
                <label for="phone">CONTACT</label>
                <md-input v-model="product.phone"></md-input>
                <span class="md-error" v-if="!$v.product.phone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.phone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('selectedFile')">
                <label>IMAGE</label>
                <md-file @change="onFileSelected" accept="image/*" />
                <span class="md-error" v-if="!$v.selectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="LOST N FOUND">
            <form @submit.prevent="validateLost">
              <md-field :class="getValidationClass('title')">
                <label for="title">TITLE</label>
                <md-input v-model="product.title"></md-input>
                <span class="md-error" v-if="!$v.product.title.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('description')">
                <label for="description">DESCRIPTION</label>
                <md-input v-model="product.description"></md-input>
                <span class="md-error" v-if="!$v.product.description.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('location')">
                <label for="location">LOCATION</label>
                <md-input v-model="product.location"></md-input>
                <span class="md-error" v-if="!$v.product.location.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('phone')">
                <label for="phone">CONTACT</label>
                <md-input v-model="product.phone"></md-input>
                <span class="md-error" v-if="!$v.product.phone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.phone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('selectedFile')">
                <label>IMAGE</label>
                <md-file @change="onFileSelected" accept="image/*" />
                <span class="md-error" v-if="!$v.selectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>
          
        </md-tabs>
      </md-dialog-content>
    </md-dialog>

    <div v-if="alert">
      <Alert />
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import Alert from './Alert';

export default {
  name: "add-product",
  mixins: [validationMixin],
  data() {
    return {
      product: {},
      alert: false,
      selectedFile: null,
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
  components:{
    Alert
  },
  validations: {
    selectedFile: {
      required
    },
    product: {
      title: {
        required
      },
      author: {
        required,
        alphabet(author) {
          return /^[a-zA-Z ]*$/.test(author);
        }
      },
      publisher: {
        required
      },
      branch: {
        required
      },
      sem: {
        required
      },
      link: {
        required,
        url
      },
      description: {
        required
      },
      donation: {
        required
      },
      location: {
        required
      },
      phone: {
        required,
        number(phone) {
          return /^(\+91( )?)?[0-9]{10}$/g.test(phone);
        }
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.product[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    getValidationClassImage(fieldName) {
      const field = this.$v[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    onFileSelected(event) {
      console.log("set file");
      console.log(event);
      this.selectedFile = event.target.files[0];
    },

    validateBook() {
      this.$v.product.title.$touch();
      this.$v.product.author.$touch();
      this.$v.product.publisher.$touch();
      this.$v.product.sem.$touch();
      this.$v.product.branch.$touch();
      this.$v.product.donation.$touch();
      this.$v.product.phone.$touch();
      this.$v.selectedFile.$touch();

      if (
        !this.$v.product.title.$invalid &&
        !this.$v.product.author.$invalid &&
        !this.$v.product.publisher.$invalid &&
        !this.$v.product.sem.$invalid &&
        !this.$v.product.branch.$invalid &&
        !this.$v.product.donation.$invalid &&
        !this.$v.product.phone.$invalid &&
        !this.$v.selectedFile.$invalid
      ) {
        this.saveBook();
      }
    },

    validateLink() {
      this.$v.product.title.$touch();
      this.$v.product.link.$touch();
      this.$v.product.description.$touch();
      this.$v.product.sem.$touch();
      this.$v.product.branch.$touch();

      if (
        !this.$v.product.title.$invalid &&
        !this.$v.product.link.$invalid &&
        !this.$v.product.description.$invalid &&
        !this.$v.product.sem.$invalid &&
        !this.$v.product.branch.$invalid
      ) {
        this.saveDrive();
      }
    },

    validateOther() {
      this.$v.product.title.$touch();
      this.$v.product.description.$touch();
      this.$v.product.sem.$touch();
      this.$v.product.branch.$touch();
      this.$v.product.donation.$touch();
      this.$v.product.phone.$touch();
      this.$v.selectedFile.$touch();

      if (
        !this.$v.product.title.$invalid &&
        !this.$v.product.description.$invalid &&
        !this.$v.product.sem.$invalid &&
        !this.$v.product.branch.$invalid &&
        !this.$v.product.donation.$invalid &&
        !this.$v.product.phone.$invalid &&
        !this.$v.selectedFile.$invalid
      ) {
        this.saveOther();
      }
    },

    validateLost() {
      this.$v.product.title.$touch();
      this.$v.product.description.$touch();
      this.$v.product.location.$touch();
      this.$v.product.phone.$touch();

      if (
        !this.$v.product.title.$invalid &&
        !this.$v.product.description.$invalid &&
        !this.$v.product.location.$invalid &&
        !this.$v.product.phone.$invalid &&
        !this.$v.selectedFile.$invalid
      ) {
        this.saveLostfound();
      }
    },

    saveBook() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.selectedFile, this.selectedFile.name);
      // other data
      fd.append("title", this.product.title);
      fd.append("author", this.product.author);
      fd.append("sem", this.product.sem);
      fd.append("branch", this.product.branch);
      fd.append("publisher", this.product.publisher);
      fd.append("donation", this.product.donation);
      fd.append("phone", this.product.phone);
      fd.append("userId", this.$store.state.userId);

      axios
        .post("http://localhost:8080/api/things/upload-book", fd, {
          headers: {
            "content-type": undefined,
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$store.state.message = "Book added successfully!";
        })
        .catch(e => {
          console.log(e);
        });
      this.$store.state.addproduct = false;
      this.alert = true;
    },

    saveDrive() {
      const fd = new FormData();

      fd.append("title", this.product.title);
      fd.append("sem", this.product.sem);
      fd.append("branch", this.product.branch);
      fd.append("url", this.product.link);
      fd.append("description", this.product.description);
      fd.append("userId", this.$store.state.userId);
      
      axios
        .post("http://localhost:8080/api/things/upload-drive", fd, {
          headers: {
            "content-type": undefined,
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$store.state.message = "Link added successfully!";
        })
        .catch(e => {
          console.log(e);
        });
      
      this.$store.state.addproduct = false;
      this.alert = true;
    },

    saveOther() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.selectedFile, this.selectedFile.name);
      // other data
      fd.append("title", this.product.title);
      fd.append("sem", this.product.sem);
      fd.append("branch", this.product.branch);
      fd.append("description", this.product.description);
      fd.append("donation", this.product.donation);
      fd.append("phone", this.product.phone);
      fd.append("userId", this.$store.state.userId);
    
      axios
        .post("http://localhost:8080/api/things/upload-other", fd, {
          headers: {
            "content-type": undefined,
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(response => {
          console.log(response.data);
          this.$store.state.message = "Product added successfully!";
        })
        .catch(e => {
          console.log(e);
        });

      this.$store.state.addproduct = false;
      this.alert = true;
    },

    saveLostfound() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.selectedFile, this.selectedFile.name);
      // other data
      fd.append("title", this.product.title);
      fd.append("description", this.product.description);
      fd.append("location", this.product.location);
      fd.append("phone", this.product.phone);
      fd.append("userId", this.$store.state.userId);
      
      axios
        .post("http://localhost:8080/api/lostfound/post", fd, {
          headers: {
            "content-type": undefined,
            Authorization: "Bearer " + this.$store.state.token
          }
        })
        .then(response => {
          this.$store.state.message = response.data.message;
        })
        .catch(e => {
          console.log(e);
        });

      this.$store.state.addproduct = false;
      this.alert = true;
    },
    cancel() {
      this.$store.state.addproduct = false;
    }
  }
};
</script>
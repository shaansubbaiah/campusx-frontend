<template>
  <div>
    <md-dialog :md-active="this.$store.state.addproduct">
      <md-dialog-content>
        <md-dialog-title>Post something!</md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Book">
            <form @submit.prevent="validateBook">
              <md-field :class="getValidationClass('bookTitle')">
                <label for="title">Title</label>
                <md-input v-model="product.bookTitle"></md-input>
                <span class="md-error" v-if="!$v.product.bookTitle.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('bookAuthor')">
                <label for="author">Author</label>
                <md-input v-model="product.bookAuthor"></md-input>
                <span class="md-error" v-if="!$v.product.bookAuthor.required">Required field</span>
                <span
                  class="md-error"
                  v-else-if="!$v.product.bookAuthor.alphabet"
                >Invalid characters</span>
              </md-field>

              <md-field :class="getValidationClass('bookPublisher')">
                <label for="publisher">Publisher</label>
                <md-input v-model="product.bookPublisher"></md-input>
                <span class="md-error" v-if="!$v.product.bookPublisher.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('bookSem')">
                <label for="sem">Sem</label>
                <md-select v-model="product.bookSem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.bookSem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('bookBranch')">
                <label for="branch">Branch</label>
                <md-select v-model="product.bookBranch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.bookBranch.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('bookDonation')">
                <label for="donation">Type</label>
                <md-select v-model="product.bookDonation">
                  <md-option value="1">Donation</md-option>
                  <md-option value="0">Trade</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.bookDonation.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('bookPhone')">
                <label for="phone">Contact</label>
                <md-input v-model="product.bookPhone"></md-input>
                <span class="md-error" v-if="!$v.product.bookPhone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.bookPhone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('bookSelectedFile')">
                <label>Image</label>
                <md-file @change="onFileSelectedBook" accept="image/*" />
                <span class="md-error" v-if="!$v.bookSelectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">Submit</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="LINK">
            <form @submit.prevent="validateLink">
              <md-field :class="getValidationClass('driveTitle')">
                <label for="title">Title</label>
                <md-input v-model="product.driveTitle"></md-input>
                <span class="md-error" v-if="!$v.product.driveTitle.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('driveLink')">
                <label for="link">Link</label>
                <md-input v-model="product.driveLink"></md-input>
                <span class="md-error" v-if="!$v.product.driveLink.required">Required field</span>
                <span class="md-error" v-if="!$v.product.driveLink.url">Invalid URL</span>
              </md-field>

              <md-field :class="getValidationClass('driveDescription')">
                <label for="description">Description</label>
                <md-input v-model="product.driveDescription"></md-input>
                <span class="md-error" v-if="!$v.product.driveDescription.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('driveSem')">
                <label for="sem">Sem</label>
                <md-select v-model="product.driveSem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.driveSem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('driveBranch')">
                <label for="branch">Branch</label>
                <md-select v-model="product.driveBranch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.driveBranch.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">Submit</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="OTHER">
            <form @submit.prevent="validateOther">
              <md-field :class="getValidationClass('otherTitle')">
                <label for="title">Title</label>
                <md-input v-model="product.otherTitle"></md-input>
                <span class="md-error" v-if="!$v.product.otherTitle.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('otherDescription')">
                <label for="description">Description</label>
                <md-input v-model="product.otherDescription"></md-input>
                <span class="md-error" v-if="!$v.product.otherDescription.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('otherSem')">
                <label for="sem">Sem</label>
                <md-select v-model="product.otherSem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.otherSem.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('otherBranch')">
                <label for="branch">Branch</label>
                <md-select v-model="product.otherBranch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.otherBranch.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('otherDonation')">
                <label for="donation">Type</label>
                <md-select v-model="product.otherDonation">
                  <md-option value="1">Donation</md-option>
                  <md-option value="0">Trade</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.product.otherDonation.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('otherPhone')">
                <label for="phone">Contact</label>
                <md-input v-model="product.otherPhone"></md-input>
                <span class="md-error" v-if="!$v.product.otherPhone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.otherPhone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('otherSelectedFile')">
                <label>Image</label>
                <md-file @change="onFileSelectedOther" accept="image/*" />
                <span class="md-error" v-if="!$v.otherSelectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                <md-button class="md-accent" v-on:click="cancel">Cancel</md-button>
              </span>
            </form>
          </md-tab>

          <md-tab md-label="LOST N FOUND">
            <form @submit.prevent="validateLost">
              <md-field :class="getValidationClass('lostTitle')">
                <label for="title">Title</label>
                <md-input v-model="product.lostTitle"></md-input>
                <span class="md-error" v-if="!$v.product.lostTitle.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('lostDescription')">
                <label for="description">Description</label>
                <md-input v-model="product.lostDescription"></md-input>
                <span class="md-error" v-if="!$v.product.lostDescription.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('lostLocation')">
                <label for="location">Location</label>
                <md-input v-model="product.lostLocation"></md-input>
                <span class="md-error" v-if="!$v.product.lostLocation.required">Required field</span>
              </md-field>

              <md-field :class="getValidationClass('lostPhone')">
                <label for="phone">Contact</label>
                <md-input v-model="product.lostPhone"></md-input>
                <span class="md-error" v-if="!$v.product.lostPhone.required">Required field</span>
                <span class="md-error" v-else-if="!$v.product.lostPhone.number">Invalid contact</span>
              </md-field>

              <md-field :class="getValidationClassImage('lostSelectedFile')">
                <label>Image</label>
                <md-file @change="onFileSelectedLost" accept="image/*" />
                <span class="md-error" v-if="!$v.lostSelectedFile.required">Required field</span>
              </md-field>

              <span>
                <md-button type="submit" class="md-dense md-raised md-primary">Submit</md-button>
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
import http from "../http";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import Alert from "./Alert";

export default {
  name: "add-product",
  mixins: [validationMixin],
  data() {
    return {
      product: {},
      alert: false,
      bookSelectedFile: null,
      otherSelectedFile: null,
      lostSelectedFile: null,
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
    bookSelectedFile: {
      required
    },
    otherSelectedFile: {
      required
    },
    lostSelectedFile: {
      required
    },
    product: {
      bookTitle: {
        required
      },
      bookAuthor: {
        required,
        alphabet(author) {
          return /^[a-zA-Z ]*$/.test(author);
        }
      },
      bookPublisher: {
        required
      },
      bookSem: {
        required
      },
      bookBranch: {
        required
      },
      bookDonation: {
        required
      },
      bookPhone: {
        required,
        number(phone) {
          return /^(\+91( )?)?[6-9][0-9]{9}$/g.test(phone);
        }
      },

      driveTitle: {
        required
      },
      driveLink: {
        required,
        url
      },
      driveDescription: {
        required
      },
      driveSem: {
        required
      },
      driveBranch: {
        required
      },

      otherTitle: {
        required
      },
      otherDescription: {
        required
      },
      otherSem: {
        required
      },
      otherBranch: {
        required
      },
      otherDonation: {
        required
      },
      otherPhone: {
        required,
        number(phone) {
          return /^(\+91( )?)?[6-9][0-9]{9}$/g.test(phone);
        }
      },

      lostTitle: {
        required
      },
      lostDescription: {
        required
      },
      lostLocation: {
        required
      },
      lostPhone: {
        required,
        number(phone) {
          return /^(\+91( )?)?[6-9][0-9]{9}$/g.test(phone);
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

    onFileSelectedBook(event) {
      console.log("set file");
      console.log(event);
      this.bookSelectedFile = event.target.files[0];
    },
    onFileSelectedOther(event) {
      console.log("set file");
      console.log(event);
      this.otherSelectedFile = event.target.files[0];
    },
    onFileSelectedLost(event) {
      console.log("set file");
      console.log(event);
      this.lostSelectedFile = event.target.files[0];
    },

    validateBook() {
      this.$v.product.bookTitle.$touch();
      this.$v.product.bookAuthor.$touch();
      this.$v.product.bookPublisher.$touch();
      this.$v.product.bookSem.$touch();
      this.$v.product.bookBranch.$touch();
      this.$v.product.bookDonation.$touch();
      this.$v.product.bookPhone.$touch();
      this.$v.bookSelectedFile.$touch();

      if (
        !this.$v.product.bookTitle.$invalid &&
        !this.$v.product.bookAuthor.$invalid &&
        !this.$v.product.bookPublisher.$invalid &&
        !this.$v.product.bookSem.$invalid &&
        !this.$v.product.bookBranch.$invalid &&
        !this.$v.product.bookDonation.$invalid &&
        !this.$v.product.bookPhone.$invalid &&
        !this.$v.bookSelectedFile.$invalid
      ) {
        this.saveBook();
      }
    },

    validateLink() {
      this.$v.product.driveTitle.$touch();
      this.$v.product.driveLink.$touch();
      this.$v.product.driveDescription.$touch();
      this.$v.product.driveSem.$touch();
      this.$v.product.driveBranch.$touch();

      if (
        !this.$v.product.driveTitle.$invalid &&
        !this.$v.product.driveLink.$invalid &&
        !this.$v.product.driveDescription.$invalid &&
        !this.$v.product.driveSem.$invalid &&
        !this.$v.product.driveBranch.$invalid
      ) {
        this.saveDrive();
      }
    },

    validateOther() {
      this.$v.product.otherTitle.$touch();
      this.$v.product.otherDescription.$touch();
      this.$v.product.otherSem.$touch();
      this.$v.product.otherBranch.$touch();
      this.$v.product.otherDonation.$touch();
      this.$v.product.otherPhone.$touch();
      this.$v.otherSelectedFile.$touch();

      if (
        !this.$v.product.otherTitle.$invalid &&
        !this.$v.product.otherDescription.$invalid &&
        !this.$v.product.otherSem.$invalid &&
        !this.$v.product.otherBranch.$invalid &&
        !this.$v.product.otherDonation.$invalid &&
        !this.$v.product.otherPhone.$invalid &&
        !this.$v.otherSelectedFile.$invalid
      ) {
        this.saveOther();
      }
    },

    validateLost() {
      this.$v.product.lostTitle.$touch();
      this.$v.product.lostDescription.$touch();
      this.$v.product.lostLocation.$touch();
      this.$v.product.lostPhone.$touch();
      this.$v.lostSelectedFile.$touch();

      if (
        !this.$v.product.lostTitle.$invalid &&
        !this.$v.product.lostDescription.$invalid &&
        !this.$v.product.lostLocation.$invalid &&
        !this.$v.product.lostPhone.$invalid &&
        !this.$v.lostSelectedFile.$invalid
      ) {
        this.saveLostfound();
      }
    },

    saveBook() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.bookSelectedFile, this.bookSelectedFile.name);
      // other data
      fd.append("title", this.product.bookTitle);
      fd.append("author", this.product.bookAuthor);
      fd.append("sem", this.product.bookSem);
      fd.append("branch", this.product.bookBranch);
      fd.append("publisher", this.product.bookPublisher);
      fd.append("donation", this.product.bookDonation);
      fd.append("phone", this.product.bookPhone);
      fd.append("userId", this.$store.state.userId);

      http
        .post("/things/upload-book", fd, {
          headers: {
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

    saveDrive() {
      const fd = new FormData();

      fd.append("title", this.product.driveTitle);
      fd.append("sem", this.product.driveSem);
      fd.append("branch", this.product.driveBranch);
      fd.append("url", this.product.driveLink);
      fd.append("description", this.product.driveDescription);
      fd.append("userId", this.$store.state.userId);

      http
        .post("/things/upload-drive", fd, {
          headers: {
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

    saveOther() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.otherSelectedFile, this.otherSelectedFile.name);
      // other data
      fd.append("title", this.product.otherTitle);
      fd.append("sem", this.product.otherSem);
      fd.append("branch", this.product.otherBranch);
      fd.append("description", this.product.otherDescription);
      fd.append("donation", this.product.otherDonation);
      fd.append("phone", this.product.otherPhone);
      fd.append("userId", this.$store.state.userId);

      http
        .post("/things/upload-other", fd, {
          headers: {
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

    saveLostfound() {
      const fd = new FormData();
      // image stuff
      fd.append("image", this.lostSelectedFile, this.lostSelectedFile.name);
      // other data
      fd.append("title", this.product.lostTitle);
      fd.append("description", this.product.lostDescription);
      fd.append("location", this.product.lostLocation);
      fd.append("phone", this.product.lostPhone);
      fd.append("userId", this.$store.state.userId);

      http
        .post("/lostfound/post", fd, {
          headers: {
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

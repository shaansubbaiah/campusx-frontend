<template>
  <div>
    <md-dialog :md-active="true" class="md-layout-item md-size-50">
      <md-dialog-content class="md-scrollbar">
        <md-dialog-title>
          POST AN AD!
          <md-button class="md-icon-button" id="cancel-btn">
            <router-link to="/">
              <md-icon>cancel</md-icon>
            </router-link>
          </md-button>
        </md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="BOOK">
            <div v-if="!submitted">
              <form @submit.prevent="saveBook('book')" data-vv-scope="book">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input
                    name="title"
                    id="title"
                    v-model="product.title"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('book.title')">{{errors.first('book.title')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="author">AUTHOR</label>
                  <md-input
                    name="author"
                    id="author"
                    v-model="product.author"
                    v-validate="{required:true, regex: /[A-Za-z]+/}"
                  ></md-input>
                  <div v-if="errors.has('book.author')">{{errors.first('book.author')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="publisher">PUBLISHER</label>
                  <md-input
                    name="publisher"
                    id="publisher"
                    v-model="product.publisher"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('book.publisher')">{{errors.first('book.publisher')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="donation">TYPE</label>
                  <md-select v-model="product.donation" name="donation" id="donation">
                    <md-option value="1">Donation</md-option>
                    <md-option value="0">Trade</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="phone">CONTACT</label>
                  <md-input
                    name="phone"
                    id="phone"
                    v-model="product.phone"
                    v-validate="{required:true, regex: /^(\+91( )?)?[0-9]{10}$/}"
                  ></md-input>
                  <div v-if="errors.has('book.phone')">{{errors.first('book.phone')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label>IMAGE</label>
                  <md-input type="file" @change="onFileSelected" accept="image/*" />
                </md-field>

                <span>
                  <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

          <md-tab md-label="LINK">
            <div v-if="!submitted">
              <form @submit.prevent="saveDrive('drive')" data-vv-scope="drive">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input
                    name="title"
                    id="title"
                    v-model="product.title"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('drive.title')">{{errors.first('drive.title')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="url">LINK</label>
                  <md-input
                    name="url"
                    id="url"
                    v-model="product.url"
                    v-validate="{required:true,url: {require_protocol: true }}"
                  ></md-input>
                  <div v-if="errors.has('drive.url')">{{errors.first('drive.url')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="description">DESCRIPTION</label>
                  <md-input
                    name="description"
                    id="description"
                    v-model="product.description"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('drive.description')">{{errors.first('drive.description')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                    <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                  </md-select>
                </md-field>

                <span>
                  <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

          <md-tab md-label="OTHERS">
            <div v-if="!submitted">
              <form @submit.prevent="saveOther('other')" data-vv-scope="other">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input
                    name="title"
                    id="title"
                    v-model="product.title"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('other.title')">{{errors.first('other.title')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="description">DESCRIPTION</label>
                  <md-input
                    name="description"
                    id="description"
                    v-model="product.description"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('other.description')">{{errors.first('other.description')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="sem">SEM</label>
                  <md-select v-model="product.sem" name="sem" id="sem">
                    <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="branch">BRANCH</label>
                  <md-select v-model="product.branch" name="branch" id="branch">
                    <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="donation">TYPE</label>
                  <md-select v-model="product.donation" name="donation" id="donation">
                    <md-option value="1">Donation</md-option>
                    <md-option value="0">Trade</md-option>
                  </md-select>
                </md-field>

                <md-field class="form-data">
                  <label for="phone">CONTACT</label>
                  <md-input
                    name="phone"
                    id="phone"
                    v-model="product.phone"
                    v-validate="{required:true, regex: /^(\+91( )?)?[0-9]{10}$/}"
                  ></md-input>
                  <div v-if="errors.has('other.phone')">{{errors.first('other.phone')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label>IMAGE</label>
                  <md-input type="file" @change="onFileSelected" accept="image/*" />
                </md-field>

                <span>
                  <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

          <md-tab md-label="LOST N FOUND">
            <div v-if="!submitted">
              <form @submit.prevent="saveLostfound('lostfound')" data-vv-scope="lostfound">

                <md-field class="form-data">
                  <label for="title">TITLE</label>
                  <md-input
                    name="title"
                    id="title"
                    v-model="product.title"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('lostfound.title')">{{errors.first('lostfound.title')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="description">DESCRIPTION</label>
                  <md-input
                    name="description"
                    id="description"
                    v-model="product.description"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('lostfound.description')">{{errors.first('lostfound.description')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="location">LOCATION</label>
                  <md-input
                    name="location"
                    id="location"
                    v-model="product.location"
                    v-validate="{required:true}"
                  ></md-input>
                  <div v-if="errors.has('lostfound.location')">{{errors.first('lostfound.location')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label for="phone">CONTACT</label>
                  <md-input
                    name="phone"
                    id="phone"
                    v-model="product.phone"
                    v-validate="{required:true, regex: /^(\+91( )?)?[0-9]{10}$/}"
                  ></md-input>
                  <div v-if="errors.has('lostfound.phone')">{{errors.first('lostfound.phone')}}</div>
                </md-field>

                <md-field class="form-data">
                  <label>IMAGE</label>
                  <md-input type="file" @change="onFileSelected" accept="image/*" />
                </md-field>

                <span>
                  <md-button type="submit" class="md-dense md-raised md-primary">SUBMIT</md-button>
                  <md-button v-on:click="newProduct" class="md-dense md-raised md-primary">CLEAR</md-button>
                </span>

              </form>
            </div>
          </md-tab>

        </md-tabs>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>
 
<script>
import axios from "axios";

export default {
  name: "add-product",
  data() {
    return {
      product: {},
      selectedFile: null,
      submitted: false,
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
  methods: {
    onFileSelected(event) {
      console.log("set file");
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    saveBook(scope) {
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          
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

          try {
            await axios
              .post("http://localhost:8080/api/things/upload-book", fd, {
                headers: {
                  "content-type": undefined,
                  Authorization: "Bearer " + this.$store.state.token
                }
              })
              .then(response => {
                this.book.id = response.data.id;
              })
              .catch(e => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
          this.$router.push("/");
          location.reload();
        }
      });
    },

    saveDrive(scope) {
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          
          const fd = new FormData();
    
          fd.append("title", this.product.title);
          fd.append("sem", this.product.sem);
          fd.append("branch", this.product.branch);
          fd.append("url", this.product.url);
          fd.append("description", this.product.description);
          fd.append("userId", this.$store.state.userId);

          try {
            await axios
              .post("http://localhost:8080/api/things/upload-drive", fd, {
                headers: {
                  "content-type": undefined,
                  Authorization: "Bearer " + this.$store.state.token
                }
              })
              .then(response => {
                alert()
                this.book.id = response.data.id;
              })
              .catch(e => {
                alert(e)
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
          this.$router.push("/");
          location.reload();
        }
      });
    },

    saveOther(scope) {
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          
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

          try {
            await axios
              .post("http://localhost:8080/api/things/upload-other", fd, {
                headers: {
                  "content-type": undefined,
                  Authorization: "Bearer " + this.$store.state.token
                }
              })
              .then(response => {
                this.book.id = response.data.id;
              })
              .catch(e => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
          this.$router.push("/");
          location.reload();
        }
      });
    },

    saveLostfound(scope) {
      this.$validator.validateAll(scope).then(async isValid => {
        if (isValid) {
          
          const fd = new FormData();
          // image stuff
          fd.append("image", this.selectedFile, this.selectedFile.name);
          // other data
          fd.append("title", this.product.title);
          fd.append("description", this.product.description);
          fd.append("location", this.product.location);
          fd.append("phone", this.product.phone);
          fd.append("userId", this.$store.state.userId);

          try {
            await axios
              .post("http://localhost:8080/api/lostfound/post", fd, {
                headers: {
                  "content-type": undefined,
                  Authorization: "Bearer " + this.$store.state.token
                }
              })
              .then(response => {
                this.lostfound.id = response.data.id;
              })
              .catch(e => {
                console.log(e);
              });
          } catch (err) {
            console.log(err);
          }

          this.submitted = true;
          this.$router.push("/");
          location.reload();
        }
      });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>
 
<style>
#cancel-btn {
  float: right;
}
</style>
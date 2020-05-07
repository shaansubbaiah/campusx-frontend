<template>
  <md-card class="search-card">
    <md-card-header>
      <md-field>
        <label for="title">Search..</label>
        <md-input name="title" id="title" v-model="stitle"></md-input>
        <md-button v-on:click="retrieveProducts" class="md-icon-button" id="search-icon">
          <md-icon>search</md-icon>
        </md-button>
      </md-field>
    </md-card-header>

    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        filter
        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          <div class="md-layout-item md-layout md-gutter" id="filters">
            <div class="md-layout-item">
              <md-field id="sem-filter">
                <label for="sem">Semester</label>
                <md-select v-model="ssem" name="sem" id="sem">
                  <md-option
                    v-for="semester in semesters"
                    :value="semester"
                    :key="semester"
                  >{{semester}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-field id="branch-filter">
                <label for="branch">Branch</label>
                <md-select v-model="sbranch" name="branch" id="branch">
                  <md-option v-for="branch in branches" :value="branch" :key="branch">{{branch}}</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-field id="donation-filter">
                <label for="donation">Type</label>
                <md-select v-model="sdonation" name="donation" id="donation">
                  <md-option value="1">Donation</md-option>
                  <md-option value="0">Trade</md-option>
                </md-select>
              </md-field>
            </div>
            <!-- 
          Filter Buttons 
            -->
            <div class="md-layout-item" id="filter-buttons">
              <md-button v-on:click="retrieveProducts" class="md-primary">FILTER</md-button>
              <md-button v-on:click="clearSearch" class="md-accent">CLEAR</md-button>
            </div>
          </div>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>
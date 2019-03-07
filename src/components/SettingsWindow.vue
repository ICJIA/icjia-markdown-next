<template>
  <div>
    
   <v-navigation-drawer
      v-model="settingsWindow"
      absolute
      fixed
      :clipped="false"
      width="320"
      style="z-index: 5000 !important; background: #eee"
      disable-resize-watcher
    >
    
 
    
    <v-layout row >
    <v-flex xs12>
      
        <v-toolbar dense color="teal darken-2" dark>
         
             <!-- <v-icon class="close-icon" @click="toggleSettingsWindow">close</v-icon> -->
          <v-toolbar-title style="font-size: 18px">SETTINGS</v-toolbar-title>
          
          <v-spacer></v-spacer>
          <v-btn icon @click="toggleSettingsWindow">
              <v-icon>chevron_left</v-icon>
            </v-btn>
        
        </v-toolbar>

      Settings here
       
        

      
     
    </v-flex>
  </v-layout>
  

    <!-- <v-list class="pa-1">
       

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list> -->

   
    </v-navigation-drawer>
  </div>
</template>

<script>
import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { store, mutations } from "@/store";
// import config from "@/config";
// import { capitalize } from "@/filters";
export default {
  data() {
    return {
      settingsWindow: false,

      config: store.config
    };
  },
  mounted() {
    EventBus.$on("toggleSettingsWindow", () => {
      this.settingsWindow = !this.settingsWindow;
    });
  },
  methods: {
    toggleSettingsWindow() {
      EventBus.$emit("toggleSettingsWindow");
    }
  },
  computed: {},
  watch: {}
};
</script>

<style>
.lint.heading {
  color: #555;
  margin-bottom: 5px;
  margin-top: 15px;
  text-transform: uppercase;
  font-weight: 900;
}

.lint.text {
  margin-left: 10px;
  color: #666;
}

.close-icon:hover {
  color: #aaa;
}
</style>
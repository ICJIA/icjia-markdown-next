<template>
  <div>
    
   <v-navigation-drawer
      v-model="lintWindow"
      absolute
      fixed
      :clipped="true"
      right
      width="320"
      style="z-index: 1000; background: #eee"
      disable-resize-watcher
    >
    
 
    
    <v-layout row >
    <v-flex xs12>
      
        <v-toolbar dense :class="{red: lintStatus.isError, 'darken-2': lintStatus.isError, green: !lintStatus.isError}" dark>
        
              <v-btn icon @click="toggleLintWindow">
              <v-icon>chevron_right</v-icon>
            </v-btn>
         
           <v-toolbar-title style="font-size: 18px">LINTING ALERTS</v-toolbar-title>
          <v-spacer></v-spacer>
          
        
        </v-toolbar>

       <div v-if="!lintStatus.isError">
           <div class="text-center mt-3" style="font-size: 28px; font-weight: 900; color: green">
              No errors. Woohoo!
           </div>
           </div>
          
          
        <div v-for="(error,index) in lintResults" :key="index" class="mt-3 pl-2 pr-2">
        <v-card >
          <v-card-title style="font-weight: 900; font-size: 18px; color: #fff;" class="red lighten-2">LINE: {{error.lineNumber}}</v-card-title>
          <v-card-text style="margin-top: -10px;">
             <div class="lint heading">Description:</div>
            <div class="lint text">{{error.ruleDescription}}</div>
            <!-- <div class="lint heading">Rule:</div>
            <div class="lint text">{{error.ruleNames}}</div> -->
            <div class="lint heading" v-if="error.errorContext">Context:</div>
            <div class="lint text">{{error.errorContext}}</div>
             <div class="lint heading" v-if="error.errorDetail">Error detail:</div>
            <div class="lint text">{{error.errorDetail}}</div>
            
            </v-card-text>
        </v-card>
       
        </div>
       
        

      
     
    </v-flex>
  </v-layout>
  

   
    </v-navigation-drawer>
  </div>
</template>

<script>
// import config from "@/config";
import { EventBus } from "@/event-bus.js";
import { store, mutations } from "@/store";
// import config from "@/config";
// import { capitalize } from "@/filters";
export default {
  data() {
    return {
      lintWindow: false,
      lintStatus: {},
      config: store.config,
      autoAlert: store.config.lintingAutoAlert
    };
  },
  mounted() {
    EventBus.$on("lintStatus", lintStatus => {
      this.lintStatus = lintStatus;
    });
    EventBus.$on("toggleLintWindow", () => {
      this.lintWindow = !this.lintWindow;
    });
  },
  methods: {
    toggleLintWindow() {
      EventBus.$emit("toggleLintWindow");
    },
    getToolbarColor() {
      if (this.lintStatus.isError) {
        return "red darken-2";
      } else {
        return "green";
      }
    }
  },
  computed: {
    lintResults() {
      if (this.lintStatus.result) {
        return this.lintStatus.result.content;
      } else {
        return {};
      }
    }
  },
  watch: {
    lintStatus() {
      if (store.config.lintingAutoAlert) {
        if (!this.lintStatus.isError) {
          this.lintWindow = false;
        } else {
          this.lintWindow = true;
        }
      }
    },
    autoAlert() {
      let status;
      this.autoAlert ? (status = "ON") : (status = "OFF");
      let msg = `Linting Auto Alert turned ${status}`;
      EventBus.$emit("displayStatus", msg);
      mutations.toggleLintingAutoAlert(this.autoAlert);
    }
  }
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
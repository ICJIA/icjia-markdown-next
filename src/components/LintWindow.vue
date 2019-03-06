<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="lintWindow">
     
      <v-list>
        {{lintStatus}}
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";
// import config from "@/config";
// import { capitalize } from "@/filters";
export default {
  data() {
    return {
      lintWindow: false,
      lintStatus: {}
    };
  },
  mounted() {
    EventBus.$on("lintStatus", lintStatus => {
      this.lintStatus = lintStatus;
    });
    EventBus.$on("toggleLintWindow", () => {
      this.lintWindow = !this.lintWindow;
    });
  }
};
</script>
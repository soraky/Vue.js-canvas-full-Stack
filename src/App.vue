<template>
  <v-app>
    <v-tabs v-model="currentRoute" @change="tabChanged" color="cyan" dark slider-color="red">
      <v-tab ripple>Home</v-tab>
      <v-tab ripple>Create</v-tab>
      <!-- <v-tab ripple>Show</v-tab> -->
    </v-tabs>
    <router-view v-if="appModel.ready" v-bind:model="appModel.currentModel"/>
    <v-content></v-content>
  </v-app>
</template>
<script>
import AppModel from "@/models";
import { observer } from "mobx-vue";
import { setTimeout } from "timers";

const indexToRouteName = ["home", "create", "show", "my"];

export default observer({
  data() {
    const initialRoute = indexToRouteName.indexOf(this.$route.path);

    return {
      changedFromModel: false,
      appModel: new AppModel({
        initialTab: { path: this.$route.name, params: this.$route.params },
        routeChangedFromModel: ((...params) => {
          return this.routeChangedFromModel(...params);
        }).bind(this)
      }),
      currentRoute: initialRoute === -1 ? 0 : initialRoute
    };
  },
  methods: {
    tabChanged(routeIndex) {
      if (!this.changedFromModel) {
        const route = indexToRouteName[routeIndex];
        this.$router.push("/" + route);
        this.appModel.setTab({
          path: this.$route.name,
          params: this.$route.params
        });
      }
    },
    routeChangedFromModel(route) {
      this.changedFromModel = true;
      this.$router.push("/" + route);
      this.currentRoute = indexToRouteName.indexOf(route);
      setTimeout(() => {
        this.changedFromModel = false;
      }, 0);
    }
  }
});
</script>

<template>
  <div class="my">
    <DrawingList
      class="drawings"
      v-bind:drawings="model.drawings"
      @onThumbClick="handleThumbClick"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import DrawingList from "@/components/DrawingList.vue";

export default {
  name: "my",
  components: {
    DrawingList
  },
  props: {
    model: Object
  },
  methods: {
    handleThumbClick(id) {
      this.model.handleThumbClick(id);
    }
  }
};
</script>
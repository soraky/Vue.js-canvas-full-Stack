<template>
  <div class="drawing-list">
    <div class="drawings-container">
      <DrawingThumb
        class="thumbnails"
        v-for="(item, index) in drawings"
        v-bind:key="item.id"
        v-bind:draw="drawings[index]"
        @onClick="$emit('onThumbClick', item.id)"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import DrawingThumb from "@/components/DrawingThumb.vue";

export default {
  name: "DrawingList",
  components: {
    DrawingThumb
  },
  props: {
    drawings: Array,
    onThumbClick: Function
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

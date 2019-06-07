<template>
  <div class="drawing-thumb" v-if="!draw.private">
    {{draw.name}}, by {{draw.creator}} and my ID is {{draw.id}}
    <div class="drawing-thumb-board-container" @click="$emit('onClick')">
      <DrawingBoard v-bind:strokes="draw.content" readonly/>
    </div>
  </div>
</template>

<script>
import DrawingBoard from "src/components/DrawingBoard.vue";

export default {
  name: "DrawingThumb",
  components: {
    DrawingBoard
  },
  props: {
    draw: Object,
    onClick: Function,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawing-thumb-board-container {
  width: 20%;
  transition-duration: 0.5s;
}

.drawing-thumb-board-container:hover {
  width: 30%;
  transition-duration: 0.5s;
}
</style>

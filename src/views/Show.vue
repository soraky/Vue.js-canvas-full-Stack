<template>
  <div class="show">
    <v-flex xs10 sm6 offset-sm3>
      This is '{{this.model.drawing.name}}', by '{{this.model.drawing.creator}}', created on the {{this.model.drawing.date}} and took {{this.calculateTime(this.model.drawing.time)}} seconds to make.
      <DrawingBoard
        ref="drawingBoard"
        class="drawingBoard"
        id="drawingBoard"
        v-bind:strokes="model.drawing.content"
        v-bind:readonly="true"
      />
      {{this.model.drawing.content.length}}
      <v-btn flat icon>
        <v-icon @click="onRedraw">replay</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon @click="onPlay">play_circle_filled</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon @click="onPause">pause_circle_filled</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon @click="onEdit">edit</v-icon>
      </v-btn>
    </v-flex>
    <v-flex sm3 offset-sm3>
      Redrawing speed:
      <vue-slider
        class="slider"
        :marks="marks"
        :adsorb="true"
        :included="true"
        :min="0"
        :max="1"
        ref="speedSlider"
        v-model="sliderValue"
        :interval="0.25"
        v-on:drag-end="handleSpeed"
        @click.native="handleSpeed"
      ></vue-slider>
    </v-flex>
  </div>
</template>


<script>
// @ is an alias to /src
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import DrawingBoard from "@/components/DrawingBoard.vue";
import { observer } from "mobx-vue";

export default {
  name: "show",
  components: {
    DrawingBoard,
    VueSlider
  },
  data() {
    return {
      sliderValue: 1,
      observerModel: this.model,
      marks: [0, 0.25, 0.5, 0.75, 1]
    };
  },
  props: {
    model: Object
  },
  methods: {
    onRedraw() {
      this.model.handleRedraw();
    },
    onPause() {
      this.model.handlePause();
    },
    onPlay() {
      this.model.handlePlay();
    },
    onEdit() {
      this.model.handleEdit();
    },
    handleSpeed() {
      this.model.handleSpeed(this.$refs.speedSlider.getValue() * 1000);
    },
    calculateTime(time) {
      if (time < 60) {
        return time;
      } else {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        if (minutes == 1) {
          return minutes + " minute and " + seconds;
        } else {
          return minutes + " minutes and " + seconds;
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

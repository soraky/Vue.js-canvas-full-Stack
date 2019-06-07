<template>
  <div class="palette">
    <div class="color-container">
      <Color
        v-for="(item, index) in colors"
        v-bind:key="item.id"
        v-bind:color.sync="colors[index]"
        @clicked="onColorChanged"
      />
    </div>
    <!-- <div class="size-container"> -->
    <!-- <v-flex xs9> -->
    <vue-slider
      class="slider"
      :marks="marks"
      :adsorb="true"
      :included="true"
      :min="1"
      :max="50"
      ref="widthSlider"
      v-model="sliderValue"
      v-on:drag-start="handleWidth"
      v-on:dragging="handleWidth"
      v-on:drag-end="handleWidth"
      @click.native="handleWidth"
    ></vue-slider>
    <!-- </v-flex> -->
    <!-- </div> -->
    <!-- <v-flex xs3> -->
    <span
      class="width-circle"
      v-bind:style="{ background: currentColor, width: currentWidth + 'px', height: currentWidth + 'px' }"
    />
    <!-- </v-flex>     -->
  </div>
</template>

<script>
// @ is an alias to /src
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import Color from "src/components/Color.vue";

export default {
  name: "Palette",
  components: {
    Color,
    VueSlider
  },
  props: {
    colors: Array
    // currentWidth: Number
    // currentColor: String
  },
  // computed: {
  //   circleSize: function(){
  //     return {
  //       size: this.currentWidth + "px"
  //     }
  //   }
  // },
  data() {
    return {
      sliderValue: 1,
      currentColor: "#000000",
      currentWidth: 1,
      marks: [1, 5, 10, 20, 30, 40, 50]
    };
  },
  methods: {
    handleWidth() {
      const newWidth = this.$refs.widthSlider.getValue();
      this.currentWidth = newWidth;
      this.$emit("widthUpdate", newWidth);
    },
    onColorChanged(color) {
      this.currentColor = color;
      this.$emit("colorUpdate", color);
    }
    // onDragStart() {
    //   this.handleWidth();
    // },
    // onDragging() {
    //   this.handleWidth();
    // },
    // onDragEnd() {
    //   this.handleWidth();
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.width-circle {
  box-shadow: 1px 5px 5px black;
  height: 30px;
  width: 30px;
  margin-right: 2px;
  /* background-color: #000000; */
  border-radius: 50%;
  display: inline-block;
  transition: 0.3s;
}

</style>
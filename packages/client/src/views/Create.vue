<template>
  <div class="create">
    <!-- <v-layout> -->
    <v-flex xs10 sm6 offset-sm3>
      <!-- v-bind:currentColor.sync="chosenColor" v-bind:currentWidth.sync="chosenWidth" -->
      <!-- v-bind:strokes="drawingStrokes" -->
      <DrawingBoard
        ref="drawingBoard"
        class="drawingBoard"
        id="drawingBoard"
        v-bind:readonly="false"
        v-bind:currentColor.sync="color"
        v-bind:currentWidth.sync="width"
        @timerStopped="onTimerStopped"
        v-bind:strokes="model.drawing.content"
      />
      <Palette
        class="palette"
        v-bind:colors="colors"
        @colorUpdate="onColorChanged"
        @widthUpdate="onChangeWidth"
      />
      <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on }">-->
      <v-btn flat icon>
        <v-icon @click="onClearCanvas">delete_forever</v-icon>
      </v-btn>
      <!-- </template>
      <span>Bottom tooltip</span>
      </v-tooltip>-->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="drawingName"
          :rules="[rules.required, rules.min, rules.max]"
          placeholder="Drawing name"
        ></v-text-field>
      </v-form>
      <v-btn flat icon>
        <v-icon @click="onSaveDrawing">save</v-icon>
      </v-btn>
      <!-- <v-text-field value="${this.time}"></v-text-field> -->
      <v-switch v-model="privateDrawing" :label="`Private drawing: ${privateDrawing.toString()}.`"></v-switch>
      <!-- </DrawingBoard> -->
      <!-- v-bind:currentColor.sync="chosenColor"  v-bind:currentWidth="chosenWidth" -->
    </v-flex>
    <!-- </v-layout> -->
  </div>
</template>


<script>
// @ is an alias to /src
import DrawingBoard from "src/components/DrawingBoard.vue";
import Palette from "src/components/Palette.vue";
import Colors from "src/colors.js";

export default {
  name: "create",
  components: {
    DrawingBoard,
    Palette
  },
  props: {
    // chosenColor: String,
    // chosenWidth: Number,
    // timeToDraw: Number,
    model: Object,
    drawings: Object
  },
  data() {
    return {
      valid: true,
      colors: Colors.data.colors,
      color: this.chosenColor,
      width: this.chosenWidth,
      time: this.timeToDraw,
      privateDrawing: false,
      drawingName: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 3 || "Min 3 characters",
        max: v => v.length <= 20 || "Max 20 characters"
      },
      observerModel: this.model
    };
  },
  mounted() {
    this.color = "#000000";
    this.width = 1;
  },
  methods: {
    onTimerStopped(timeOfDrawing) {
      this.time = timeOfDrawing;
    },
    onSaveDrawing() {
      if (this.$refs.form.validate()) {
        this.$refs.drawingBoard.onStopTimer();
        const today = new Date();
        const date =
          today.getDate() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getFullYear();

        let minutes = today.getMinutes();

        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        let seconds = today.getSeconds();

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        const time = today.getHours() + ":" + minutes + ":" + seconds;
        const dateTime = date + " " + time;

        const creator = "Default";

        const drawing = {
          // id: creator + "," + this.drawingName + "," + date + "," + time,
          // id: Uuid.uuidv4(),
          name: this.drawingName,
          creator: creator,
          private: this.privateDrawing,
          date: dateTime,
          time: this.time,
          content: this.$refs.drawingBoard.drawingStrokes
        };

        this.model.handleSave(drawing);
      }
    },
    onClearCanvas() {
      this.$refs.drawingBoard.onClearCanvas();
    },
    onColorChanged(color) {
      this.color = color;
    },
    onChangeWidth(width) {
      this.width = width;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .create{
  display:flex;
  flex-direction:row;

} */
/* .palette{
  width: 80%;
} */
/* .drawingBoard{
  float: right;
}  */
</style>
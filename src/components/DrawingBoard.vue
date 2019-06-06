<template>
  <canvas
    ref="canvas"
    v-on:mousedown="handleMouseDown"
    v-on:mouseup="handleMouseUp"
    v-on:mousemove="handleMouseMove"
    width="800px"
    height="800px"
  >
    <!-- <div ref="cursor" id="cursor" class="cursor"/>
    <DrawingBoardCursor v-bind:readonly="this.readonly" v-bind:coordinates="this.mouse.current"/>-->
  </canvas>
</template>

<script>
// import DrawingBoardCursor from "@/components/DrawingBoardCursor.vue";

export default {
  name: "DrawingBoard",
  components: {
    // DrawingBoardCursor
  },
  data: function() {
    return {
      mouse: {
        _current: {
          x: 0,
          y: 0
        },
        get current() {
          return this._current;
        },
        set current(value) {
          this._current.x = value.x;
          this._current.y = value.y;
        },
        down: false
      },
      drawingStrokes: JSON.parse(JSON.stringify(this.strokes)),
      firstStrokeBool: false,
      timeToDraw: this.timeOfDrawing,
      timer: ""
    };
  },
  props: {
    strokes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    readonly: Boolean,
    currentColor: String,
    currentWidth: Number,
    firstStroke: Boolean,
    timeOfDrawing: Number
  },
  watch: {
    strokes() {
      this.draw();
    }
  },
  mounted: function() {
    // var c = this.$refs.canvas;
    // var ctx = c.getContext("2d");
    // ctx.translate(0.5, 0.5);
    // ctx.imageSmoothingEnabled= false;
    this.draw();
  },
  methods: {
    onClearCanvas() {
      var c = this.$refs.canvas;

      var ctx = c.getContext("2d");

      ctx.clearRect(0, 0, 800, 800);

      this.drawingStrokes = [];
    },
    getRatio() {
      const canvas = this.$refs.canvas;
      const actualWidth = canvas.getBoundingClientRect().width;
      const canvasWidth = canvas.width;
      return canvasWidth / actualWidth;
    },
    draw: function(event) {
      // requestAnimationFrame(this.draw);
      // if (this.mouse.down )
      // this.readonly;

      var c = this.$refs.canvas;

      var ctx = c.getContext("2d");

      ctx.clearRect(0, 0, 800, 800);

      const drawingStrokes = this.readonly ? this.strokes : this.drawingStrokes;

      drawingStrokes.forEach(draw => {
        ctx.beginPath();

        const [firstCordinate, ...otherCordinates] = draw.coordinates;

        ctx.moveTo(firstCordinate.x, firstCordinate.y);

        otherCordinates.forEach(coordinate => {
          ctx.lineTo(coordinate.x, coordinate.y);

          this.mouse.current = coordinate;
        });

        ctx.strokeStyle = draw.color;
        ctx.lineWidth = draw.width;

        ctx.stroke();
      });
    },
    myTimer() {
      this.timeToDraw += 1;
    },
    onStopTimer() {
      clearInterval(this.timer);
      this.$emit("timerStopped", this.timeToDraw);
    },
    handleMouseDown: function(event) {
      if (!this.readonly) {
        if (!this.firstStrokeBool) {
          this.firstStrokeBool = true;
          this.timeToDraw = 0;
          this.timer = setInterval(this.myTimer, 1000);
        }

        const newStrokes = this.drawingStrokes;
        this.mouse.down = true;

        var c = this.$refs.canvas;

        const ratio = this.getRatio();

        newStrokes.push({
          width: this.currentWidth,
          color: this.currentColor,
          coordinates: [
            {
              x: event.offsetX * ratio,
              y: event.offsetY * ratio
            }
          ]
        });

        this.$emit("update:strokes", newStrokes);
      }
    },
    handleMouseUp: function() {
      if (!this.readonly) {
        this.mouse.down = false;
      }
    },
    handleMouseMove: function(event) {
      // var cursor = document.getElementById("cursor");

      // cursor.style.transform = `translate(${this.mouse.current.x - 10}px, ${this.mouse.current.y - 10}px)`;

      if (!this.readonly && this.mouse.down) {
        const newStrokes = this.drawingStrokes;

        var c = this.$refs.canvas;

        const ratio = this.getRatio();

        newStrokes[newStrokes.length - 1].coordinates.push({
          x: event.offsetX * ratio,
          y: event.offsetY * ratio
        });

        this.$emit("update:strokes", newStrokes);
        this.draw();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  margin-top: 10px;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  /* cursor: none; */
}

</style>

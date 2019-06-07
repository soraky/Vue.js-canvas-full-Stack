<template>
  <!-- <input type="radio" name="color" class="color-item" value="#ff0000"> -->
  <!-- <input type="radio" name="color" class="color-item" v-model="color" v-bind:value="color.id"> -->
  <label class="color-item">
    <input type="radio" name="color" v-bind:value="color.id" visibility: hidden @change="colorChanged">
    <span
      class="circle"
      v-bind:style="{ background: color.id }"
    />
  </label>
</template>

<script>
export default {
  name: "Color",
  //   components: {
  //
  //   },
  props: {
    color: Object
  },
  methods: {
    colorChanged() {
      this.$emit("clicked", this.color.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .color-item {
  height: 30px;
  width: 30px;
  background-color: #000000;
  border-radius: 50%;
  display: inline-block;
}

.color-item:hover {
  height: 50px;
  width: 50px;
  transition: 0.3s;
} */

.circle {
  box-shadow: 1px 5px 5px black;
  height: 30px;
  width: 30px;
  margin-right: 2px;
  /* background-color: #00ff00; */
  border-radius: 50%;
  display: inline-block;
}

.circle:hover {
  height: 35px;
  width: 35px;
  transition: 0.3s;
}
</style>

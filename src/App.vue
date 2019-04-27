<template>
  <div id="app">
    <div class="grid-container">
      <GridView />
    </div>
  </div>
</template>

<script>
import GridView from "./components/GridView.vue";

export default {
  name: "app",
  components: {
    GridView
  }
};
</script>

<style lang="scss">
body {
  background-color: #f5f5f5;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .grid-container {
    display: flex;
    justify-content: center;
  }
}
</style>

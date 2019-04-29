<template>
  <div id="app">
    <div class="grid-view-container">
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

  .grid-view-container {
    display: flex;
    justify-content: center;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #44505d;
    color: #fff;
    font-size: 1.25em;
    font-weight: 600;
    border-radius: 0.3em;
    padding: 0 20px;
    height: 45px;
    cursor: pointer;
    outline: none;

    &--small {
      font-size: 90%;
      padding: 0 10px;
      height: 40px;
    }
  }
}
</style>

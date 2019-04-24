<template>
  <div v-if="grid" class="grid">
    <div class="grid__row" v-for="row in grid.cellMatrix">
      <GridCell v-for="cell in row" :cell="cell" :key="cell.id" />
    </div>
  </div>
</template>

<script>
import GridCell from "./GridCell.vue";
import Grid from "../utilities/grid";

export default {
  name: "GridView",

  components: {
    GridCell
  },

  data() {
    return {
      grid: new Grid(6, 6)
    };
  },

  mounted() {
    this.grid.initRandomCell(2);

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  },

  methods: {
    handleKeyDown(event) {
      if (this.grid.gameOver()) {
        return;
      }

      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        var direction = event.keyCode - 37;
        this.grid.slide(direction);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.grid {
  background-color: #44505d;
  padding: 0.75rem;
  border-radius: 0.3rem;

  &__row {
    display: flex;
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

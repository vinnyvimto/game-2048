<template>
  <div v-if="grid" class="grid">
    <div class="grid__row" v-for="row in grid.cellMatrix">
      <GridCell v-for="cell in row" :cell="cell" :key="cell.id" />
    </div>
    <game-over-overlay v-if="gameOver" :grid="grid" @restart="restart" />
  </div>
</template>

<script>
import Grid from "../utilities/grid";
import GridCell from "./GridCell.vue";
import GameOverOverlay from "./GameOverOverlay.vue";

export default {
  name: "GridView",

  components: {
    GridCell,
    GameOverOverlay
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

  computed: {
    gameOver() {
      return this.grid.hasWon || this.grid.hasLost;
    }
  },

  methods: {
    handleKeyDown(event) {
      if (this.grid.hasWon) {
        return;
      }

      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        var direction = event.keyCode - 37;
        this.grid.slide(direction);
      }
    },
    restart() {
      this.grid = new Grid(6, 6);
      this.grid.initRandomCell(2);
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
  padding: 5px;
  border-radius: 0.3rem;
  position: relative;

  &__row {
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<template>
  <div>
    <div class="header">
      <h1 class="title">2048++</h1>
    </div>

    <div class="grid-header">
      <button class="btn" @click="restart">Restart</button>

      <div class="score">
        <span class="score__title">Score</span>
        <span class="score__value" v-text="grid.score"></span>
      </div>
    </div>

    <div v-if="grid" class="grid">
      <div class="grid__row" v-for="row in grid.cellMatrix">
        <GridCell v-for="cell in row" :cell="cell" :key="cell.id" />
      </div>
      <transition name="fade">
        <game-over-overlay v-if="gameOver" :grid="grid" @restart="restart" />
      </transition>
    </div>
  </div>
</template>

<script>
import Grid from "../utilities/grid";
import GridCell from "./GridCell.vue";
import GameOverOverlay from "./GameOverOverlay.vue";
import WebsocketHandler from "../utilities/websocket";

export default {
  name: "GridView",

  components: {
    GridCell,
    GameOverOverlay
  },

  data() {
    return {
      isMultiplayer: true,
      grid: new Grid(4, 4),
      websocket: new WebsocketHandler()
    };
  },

  mounted() {
    this.grid.initRandomCell(2);
    this.websocket.setupSocket(event => {
      console.log("message from server", event.data);
      this.grid.slide(event.data);
    });

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  },

  computed: {
    gameOver() {
      return this.grid.checkHasWon() || this.grid.checkHasLost();
    }
  },

  methods: {
    handleKeyDown(event) {
      if (this.grid.hasWon) {
        return;
      }

      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault();
        const direction = event.keyCode - 37;

        this.isMultiplayer
          ? this.websocket.submit(direction)
          : this.grid.slide(direction);
      }
    },
    restart() {
      this.grid = new Grid(this.grid.rowLength, this.grid.colLength);
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

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title {
  font-size: 5em;
  margin: 0;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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
}

.score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #44505d;
  padding: 5px 25px;
  font-weight: 600;
  color: #fff;
  border-radius: 0.3rem;

  &__title {
    font-size: 13px;
    text-transform: uppercase;
  }

  &__value {
    font-size: 25px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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

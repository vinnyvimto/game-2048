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

    <div class="grid-wrapper">
      <div v-if="grid" class="grid">
        <!-- eslint-disable-next-line -->
        <div class="grid__row" v-for="row in grid.cellMatrix">
          <GridCell v-for="cell in row" :cell="cell" :key="cell.id" />
        </div>
        <transition name="fade">
          <GameOverOverlay
            v-if="gameOver && timepassed"
            :grid="grid"
            @restart="restart"
          />
        </transition>
      </div>
    </div>

    <div class="chat-container">
      <GameChat v-if="isMultiplayer" :messages="messages" @new-message="post" />
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Grid from "../utilities/grid";
import GridCell from "./GridCell.vue";
import GameChat from "./GameChat.vue";
import GameOverOverlay from "./GameOverOverlay.vue";
import WebsocketHandler from "../utilities/websocket";

export default {
  name: "GridView",

  components: {
    GridCell,
    GameChat,
    GameOverOverlay
  },

  data() {
    return {
      timepassed: false,
      isMultiplayer: false,
      grid: new Grid(6, 6),
      movesocket: new WebsocketHandler(),
      chatsocket: new WebsocketHandler(),
      messages: [{ id: "a", text: "Hello, welcome to 2048++" }]
    };
  },

  mounted() {
    this.pingServer();
    this.grid.initRandomCell(2);

    window.addEventListener("keydown", this.handleKeyDown);

    setTimeout(() => (this.timepassed = true), 200);
  },

  computed: {
    gameOver() {
      return this.grid.checkHasWon() || this.grid.checkHasLost();
    }
  },

  methods: {
    async pingServer() {
      try {
        await Axios.get("http://localhost:4000/api/v1");
      } catch (error) {
        // console.log(error);
        return;
      }

      this.isMultiplayer = true;
      this.movesocket.subscribe("moves").listen(this.handleRemoteMove);
      this.chatsocket.subscribe("chats").listen(this.handleRemoteMsg);
      this.getActiveGame();
    },

    async getActiveGame() {
      try {
        const { data } = await Axios.get("http://localhost:4000/api/v1/games");
        this.grid.init(JSON.parse(data.value_matrix));
        this.grid.score = data.score;
      } catch (error) {
        // console.log(error);
      }
    },

    handleKeyDown(event) {
      if (this.grid.hasWon) {
        return;
      }

      if (event.keyCode < 37 || event.keyCode > 40) {
        // Not an arrow key
        return;
      }

      event.preventDefault();
      const direction = event.keyCode - 37;

      if (this.isMultiplayer) {
        const grid = new Grid(
          this.grid.rowLength,
          this.grid.colLength,
          this.grid.getValueMatrix()
        );
        grid.score = this.grid.score;
        grid.slide(direction);

        const data = {
          direction: direction,
          newValMatrix: grid.getValueMatrix(),
          oldValMatrix: this.grid.getValueMatrix(),
          newValCoord: grid.latestCell.getCoordinates(),
          score: grid.score
        };

        this.movesocket.broadcast(data);
      } else {
        this.grid.slide(direction);
      }
    },

    handleRemoteMove(event) {
      const state = JSON.parse(event.data);
      // Replay the move locally
      const grid = new Grid(
        this.grid.rowLength,
        this.grid.colLength,
        state.oldValMatrix
      );

      grid.slide(state.direction, false);
      grid.score = state.score;
      this.grid = grid;
      const cell = this.grid.getCell(
        state.newValCoord[0],
        state.newValCoord[1]
      );
      // Set new value coordinates
      cell.row = state.newValCoord[0];
      cell.column = state.newValCoord[1];
      cell.oldRow = -1;
      cell.oldColumn = -1;
      cell.value = 1;
    },

    restart() {
      this.grid = new Grid(this.grid.rowLength, this.grid.colLength);
      this.grid.initRandomCell(2);
    },

    post(value) {
      this.chatsocket.broadcast(value);
    },

    handleRemoteMsg(event) {
      const text = JSON.parse(event.data);
      const id = Math.random()
        .toString(36)
        .substr(2, 5);
      this.messages.push({
        id: id,
        text: text
      });
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

.grid-wrapper {
  display: flex;
  justify-content: center;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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

.chat-container {
  margin-top: 30px;
}
</style>

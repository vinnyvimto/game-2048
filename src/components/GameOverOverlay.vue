<template>
  <div class="game-over">
    <p class="message">{{ contents }}</p>
    <button class="tryAgain" @click="restart">Try again</button>
  </div>
</template>

<script>
export default {
  props: {
    grid: {
      type: Object,
      required: true
    }
  },
  computed: {
    contents() {
      if (this.grid.hasWon) {
        return "You Won!";
      } else {
        return "Game Over";
      }
    }
  },
  methods: {
    restart() {
      this.$emit("restart");
    }
  }
};
</script>

<style scoped lang="scss">
.game-over {
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  left: 0px;
  right: 0px;
  font-size: 55px;
  font-weight: bolder;
  background-color: rgba(221, 221, 221, 0.5);
  border-radius: 0.3rem;
}

.tryAgain {
  background-color: #36495d;
  color: #fff;
  height: 40px;
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.overlay .message {
  color: #666;
}
</style>

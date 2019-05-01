<template>
  <div class="chat">
    <transition-group name="slide-fade" tag="div" class="chat__thread">
      <div v-for="{ id, text } in messages" class="message" :key="id">
        <div class="message__body" v-text="text"></div>
      </div>
    </transition-group>
    <div class="chat__input">
      <form class="inline">
        <input
          type="text"
          name="chat"
          class="chatbox"
          autocomplete="off"
          placeholder="type to chat"
        />
        <button class="btn btn--small" @click.prevent="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    submit() {
      const input = document.querySelector('input[name="chat"]');
      this.$emit("new-message", input.value);
      input.value = "";
    }
  }
};
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.chat {
  &__thread {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20px;
    max-height: 200px;
    overflow-y: auto;
  }
}

.message {
  background-color: #c6cad0;
  padding: 6px 18px;
  border-radius: 1em;
  margin: 5px 5px 5px 0;
}

.inline {
  display: flex;
  justify-content: center;

  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.chatbox {
  padding: 0 12px;
  font-size: 0.85em;
  outline: none;
  min-width: 300px;
}
</style>

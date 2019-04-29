<template>
  <div class="cell-wrapper">
    <span :class="classes" v-if="cell.value" v-text="cell.value"></span>
  </div>
</template>

<script>
export default {
  name: "GridCell",
  props: {
    cell: {
      required: true,
      type: Object
    }
  },
  computed: {
    classes() {
      const classes = ["cell cell--full"];

      classes.push(`cell--${this.cell.value}`);

      if (this.cell.isNew()) {
        classes.push("cell--new");
      }

      return classes;
    }
  }
};
</script>

<style scoped lang="scss">
.cell-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 0.3rem;
  background: rgba(238, 228, 218, 0.35);
  margin: 5px;
}

.cell {
  &--full {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    // position: absolute;
    // margin: 5px;
    font-size: 3.5em;
    font-weight: 600;
    border-radius: 0.3rem;
  }

  &--new {
    animation-duration: 0.2s;
    animation-name: newCell;
    animation-fill-mode: forwards;
    animation-delay: 0.15s;
    transform: scale(0);
  }

  @keyframes newCell {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }

  &--0 {
    background-color: #dcb;
  }

  &--1 {
    background-color: #ccc;
  }

  &--2 {
    background-color: #eee;
  }

  &--4 {
    background-color: #eec;
  }

  &--8 {
    color: #ffe;
    background-color: #fb8;
  }

  &--16 {
    color: #ffe;
    background-color: #f108;
  }

  &--32 {
    color: #ffe;
    background-color: #f75;
  }

  &--64 {
    color: #ffe;
    background-color: #f53;
  }

  &--128 {
    color: #ffe;
    background-color: #ec7;
    font-size: 2.5em;
  }

  &--256 {
    color: #ffe;
    background-color: #ec6;
    font-size: 2.5em;
  }

  &--512 {
    color: #ffe;
    background-color: #ec5;
    font-size: 2.5em;
  }

  &--1024 {
    color: #fff;
    background-color: #ec3;
    font-size: 1.5em;
  }

  &--2048 {
    color: #fff;
    background-color: #ec2;
    font-size: 1.5em;
  }
}
</style>

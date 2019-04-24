<template>
  <div class="grid-cell">
    <span
      :class="['grid-cell__full', cellClass]"
      v-if="cell.value"
      v-text="cell.value"
    ></span>
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
    cellClass() {
      return `grid-cell--${this.cell.value}`;
    }
  }
};
</script>

<style scoped lang="scss">
.grid-cell {
  width: 6rem;
  height: 6rem;
  margin-right: 0.75rem;
  border-radius: 0.3rem;
  background: rgba(238, 228, 218, 0.35);

  &:last-child {
    margin-right: 0;
  }

  &__full {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 3.5em;
    font-weight: 600;
    border-radius: 0.3rem;
  }

  &--0 {
    background-color: #dcb;
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
    background-color: #f96;
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

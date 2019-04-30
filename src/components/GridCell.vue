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

      if (this.cell.hasMoved()) {
        classes.push(`cell--row-from-${this.cell.oldRow}-to-${this.cell.row}`);
        classes.push(
          `cell--column-from-${this.cell.oldColumn}-to-${this.cell.column}`
        );
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
  position: absolute;

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

@for $fromRow from 0 through 5 {
  @for $toRow from 0 through 5 {
    $name: cell--row-from-#{$fromRow}-to-#{$toRow};

    @if $fromRow == $toRow {
      .#{$name} {
        top: 110px * $toRow + 10px;
      }
    } @else {
      .#{$name} {
        animation-duration: 0.3s;
        animation-name: $name;
        animation-fill-mode: forwards;
      }

      @keyframes #{$name} {
        from {
          top: 110px * $fromRow + 10px;
        }
        to {
          top: 110px * $toRow + 10px;
        }
      }
    }
  }
}

@for $fromColumn from 0 through 5 {
  @for $toColumn from 0 through 5 {
    $name: cell--column-from-#{$fromColumn}-to-#{$toColumn};

    @if $fromColumn == $toColumn {
      .#{$name} {
        left: 110px * $toColumn + 10px;
      }
    } @else {
      .#{$name} {
        animation-duration: 0.3s;
        animation-name: $name;
        animation-fill-mode: forwards;
      }

      @keyframes #{$name} {
        from {
          left: 110px * $fromColumn + 10px;
        }
        to {
          left: 110px * $toColumn + 10px;
        }
      }
    }
  }
}
</style>

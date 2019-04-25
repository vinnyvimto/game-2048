<template>
  <div class="grid-cell">
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
      const classes = ["grid-cell__full"];

      classes.push(`grid-cell--${this.cell.value}`);

      if (!this.cell.mergedWith) {
        classes.push("position_" + this.cell.row + "_" + this.cell.column);
      }

      if (this.cell.mergedWith) {
        classes.push("merged");
      }

      if (this.cell.isNew()) {
        classes.push("new");
      }

      if (this.cell.hasMoved()) {
        classes.push(
          "row_from_" + this.cell.fromRow() + "_to_" + this.cell.toRow()
        );
        classes.push(
          "column_from_" +
            this.cell.fromColumn() +
            "_to_" +
            this.cell.toColumn()
        );
        classes.push("isMoving");
      }

      return classes;
    }
  }
};
</script>

<style scoped lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.grid-cell {
  width: 100px;
  height: 100px;
  border-radius: 0.3rem;
  background: rgba(238, 228, 218, 0.35);
  margin: 5px;

  &__full {
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

  .new {
    animation-duration: 0.2s;
    animation-name: newTile;
    animation-fill-mode: forwards;
    animation-delay: 0.15s;
    transform: scale(0);
  }

  @keyframes newTile {
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

// @for $row from 0 through 5 {
//   @for $column from 0 through 5 {
//     .position_#{$row}_#{$column}:not(.isMoving) {
//       top: 110px * $row + 5px;
//       left: 110px * $column + 5px;
//     }
//   }
// }

// @for $fromRow from 0 through 5 {
//   @for $toRow from 0 through 5 {
//     $name: row_from_#{$fromRow}_to_#{$toRow};

//     @if $fromRow == $toRow {
//       .#{$name} {
//         top: 110px * $toRow + 5px;
//       }
//     } @else {
//       .#{$name} {
//         animation-duration: 0.2s;
//         animation-name: $name;
//         animation-fill-mode: forwards;
//       }

//       @keyframes #{$name} {
//         from {
//           top: 110px * $fromRow + 5px;
//         }
//         to {
//           top: 110px * $toRow + 5px;
//         }
//       }
//     }
//   }
// }

// @for $fromColumn from 0 through 5 {
//   @for $toColumn from 0 through 5 {
//     $name: column_from_#{$fromColumn}_to_#{$toColumn};

//     @if $fromColumn == $toColumn {
//       .#{$name} {
//         left: 110px * $toColumn + 5px;
//       }
//     } @else {
//       .#{$name} {
//         animation-duration: 0.2s;
//         animation-name: $name;
//         animation-fill-mode: forwards;
//       }

//       @keyframes #{$name} {
//         from {
//           left: 110px * $fromColumn + 5px;
//         }
//         to {
//           left: 110px * $toColumn + 5px;
//         }
//       }
//     }
//   }
// }
</style>

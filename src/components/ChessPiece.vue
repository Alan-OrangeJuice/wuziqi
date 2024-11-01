<template>
  <div
    class="ChessPiece"
    :style="{ backgroundColor: color === 'black' ? 'black' : 'white', border: color === 'white' ? '1px solid #ccc' : 'none' }"
  ></div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// const props = defineProps({
//   color: {
//     type: String,
//     required: true,
//   },
// });
defineProps({
  color: String
});

</script>

<style>
.ChessPiece {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
</style>

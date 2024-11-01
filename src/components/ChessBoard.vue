<!--<template>-->
<!--  <div class="board">-->
<!--    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">-->
<!--      <div-->
<!--        v-for="(cell, cellIndex) in row"-->
<!--        :key="cellIndex"-->
<!--        class="cell"-->
<!--        @click="placePiece(rowIndex, cellIndex)"-->
<!--      >-->
<!--        &lt;!&ndash; 条件渲染棋子 &ndash;&gt;-->
<!--        <Piece v-if="cell" :color="cell" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, reactive } from 'vue';-->
<!--import Piece from './ChessPiece.vue';-->

<!--const currentPlayer = ref('black');-->
<!--const board = reactive(Array.from({ length: 15 }, () => Array(15).fill(null)));-->

<!--// 胜负判断函数（需要进一步完善）-->
<!--function checkWinner(row: number, col: number) {-->
<!--  console.log(`Checking for a winner at row ${row}, column ${col}`);-->
<!--}-->

<!--function placePiece(row: number, col: number) {-->
<!--  if (!board[row][col]) {-->
<!--    board[row][col] = currentPlayer.value; // 放置棋子-->
<!--    currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'; // 切换玩家-->
<!--    checkWinner(row, col); // 检查胜负-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.board {-->
<!--  display: grid;-->
<!--  //grid-auto-columns:auto;-->
<!--  //grid-auto-rows:auto;-->
<!--  //column-gap: 2px;-->
<!--  //row-gap: 2px; /* 为每个棋格增加1px的间隙 */-->
<!--  gap: 2px; /* 棋格之间的间隙 */-->

<!--  grid-template-columns: repeat(15, 40px); /* 每个格子宽度40px */-->
<!--  background-color: #d9a673; /* 设置棋盘的背景颜色，比如木质颜色 */-->
<!--  padding: 5px;-->
<!--  border: 3px solid #333; /* 为棋盘增加边框 */-->
<!--  border-radius: 5px; /* 为棋盘的边缘增加圆角 */-->
<!--}-->
<!--.row {-->
<!--  display: grid;-->
<!--  grid-template-rows: repeat(15, 40px);-->
<!--  gap: 2px;-->
<!--}-->
<!--.cell {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  background-color: #f0d9b5; /* 设定棋格的颜色 */-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  border: 1px solid #333; /* 每个棋格的边框 */-->
<!--  //border-radius: 50%; /* 设置成圆形，如果你希望棋格圆润 */-->
<!--  transition: background-color 0.2s ease; /* 添加一个平滑的过渡效果 */-->
<!--}-->
<!--.cell:hover {-->
<!--  background-color: #d2b898; /* 鼠标悬停时改变棋格的背景色 */-->
<!--}-->
<!--</style>-->




<template>
  <div class="board">
    <div
      v-for="(cell, index) in board.flat()"
      :key="index"
      class="cell"
      @click="placePiece(Math.floor(index / 15), index % 15, currentPlayer)"
    >
      <Piece v-if="cell" :color="cell" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import type {Ref} from 'vue';
import Piece from './ChessPiece.vue';

const currentPlayer: Ref< 'black' | 'white'> = ref('black');
const board = reactive(Array.from({ length: 15 }, () => Array(15).fill(null)));

// 胜负判断函数（需要进一步完善）
// function checkWinner(row: number, col: number) {
//   console.log(`Checking for a winner at row ${row}, column ${col}`);
// }

// async function placePiece2(row:number, col:number, color:'black' | 'white') {
//   try {
//     const response = await fetch('http://localhost:5173/api/place_piece/', {
//       row: row,
//       col: col,
//       color: color,
//     });
//     const data = response.data;
//
//     if (data.winner) {
//       alert(`${data.winner} wins!`);
//     } else {
//       // 更新棋盘的状态
//       board[row][col] = color;
//     }
//   } catch (error) {
//     console.error("Error placing piece:", error);
//   }
// }

async function placePiece(row: number, col: number, color: 'black' | 'white') {

    if (!board[row][col]) {
        board[row][col] = currentPlayer.value; // 放置棋子
        currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'; // 切换玩家
    }

  try {
    //这里放后端的API
    const response = await fetch('http://127.0.0.1:8000/api/place_piece/', {
      method: 'POST', // 使用 POST 方法
      headers: {
        'Content-Type': 'application/json', // 设置请求体的内容类型为 JSON
      },
      body: JSON.stringify({ // 将请求体转为 JSON 字符串
        row: row,
        col: col,
        color: color,
      }),
    });

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // 解析响应体为 JSON

    if (data.winner) {
      alert(`${data.winner} wins!`); // 如果有赢家，弹出提示
    } else {
      // 更新棋盘的状态
      board[row][col] = color;
    }
  } catch (error) {
    console.error("Error placing piece:", error); // 捕获并打印错误
  }
}


// // 胜负判断函数（需要进一步完善）
// function checkWinner(row: number, col: number) {
//   console.log(`Checking for a winner at row ${row}, column ${col}`);
// }
//
// function placePiece(row: number, col: number) {
//   if (!board[row][col]) {
//     board[row][col] = currentPlayer.value; // 放置棋子
//     currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black'; // 切换玩家
//     checkWinner(row, col); // 检查胜负
//   }
// }



</script>

<style>
.board {
  display: grid;
  grid-auto-columns:auto;
  grid-auto-rows:auto;
  gap: 2px; /* 棋格之间的间隙 */
  grid-template-rows: repeat(15, 40px);
  grid-template-columns: repeat(15, 40px); /* 每个格子宽度40px */
  background-color: #d9a673; /* 设置棋盘的背景颜色，比如木质颜色 */
  padding: 5px;
  border: 3px solid #333; /* 为棋盘增加边框 */
  border-radius: 5px; /* 为棋盘的边缘增加圆角 */
}
.cell {
  width: 40px;
  height: 40px;
  background-color: #f0d9b5; /* 设定棋格的颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333; /* 每个棋格的边框 */
  border-radius: 10%; /* 棋格边框曲率 */
  transition: background-color 0.2s ease; /* 添加一个平滑的过渡效果 */
}
.cell:hover {
  background-color: #d2b898; /* 鼠标悬停时改变棋格的背景色 */
}
</style>

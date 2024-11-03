<template>
  <div>
    <div class="settings">
      <label for="game-time">设置对局时间（秒）：</label>
      <input
        id="game-time"
        type="number"
        v-model.number="customGameTime"
        min="10"
        class="game-time-input"
      />
      <button @click="startGame" class="btn start-button">开始游戏</button>
    </div>
    <div class="timer-box">
      <p class="timer-text">当前步耗时: {{ moveTime }} 秒</p>
      <p class="timer-text">对局剩余时间: {{ gameTime }} 秒</p>
    </div>
    <div class="board">
      <div
        v-for="(cell, index) in board.flat()"
        :key="index"
        class="cell"
        @click="placePiece(Math.floor(index / 15), index % 15)"
      >
        <Piece v-if="cell" :color="cell" />
      </div>
    </div>
    <div class="button-group">
      <button @click="undoMove" :disabled="!history.length" class="btn undo-button">悔棋</button>
      <button @click="resetBoard" class="btn reset-button">重置棋局</button>
    </div>
  </div>
</template>

<style scoped>
body {
  background-image: url('/background_mount.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
}

.settings {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.settings label {
  margin-right: 10px;
  font-size: 1.2rem;
}

.game-time-input {
  width: 60px;
  margin-right: 10px;
}

.start-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.timer-box {
  border: 2px solid #333;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
}

.timer-text {
  font-size: 1.2rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(15, 40px);
  grid-template-rows: repeat(15, 40px);
  gap: 2px;
  padding: 5px;
  border: 3px solid #333;
  border-radius: 5px;
}

.cell {
  width: 40px;
  height: 40px;
  background-color: rgba(240, 217, 181, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333;
  border-radius: 10%;
  transition: background-color 0.2s ease;
}

.cell:hover {
  background-color: rgba(210, 184, 152, 0.8);
}

/* 悔棋按钮样式 */
.undo-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  color: #fff;
  background-color: #969b69; /* 设置为蓝色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease; /* 添加过渡 */
  opacity: 0.75; /* 设置按钮的透明度 */
}

.undo-button:hover {
  background-color: #7d8226; /* 设置鼠标悬停时的颜色 */
  opacity: 0.9; /* 鼠标悬停时恢复不透明 */

}

/* 禁用状态样式 */
.undo-button:disabled {
  opacity: 0.5; /* 设置透明度为0.5 */
  cursor: not-allowed; /* 改变鼠标指针样式 */
}

/* 重置棋局按钮样式 */
.reset-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  color: #fff;
  background-color: #924148; /* 设置为红色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease; /* 添加过渡 */
  opacity: 0.75; /* 设置按钮的透明度 */
}

.reset-button:hover {
  background-color: #671e25; /* 设置鼠标悬停时的颜色 */
  opacity: 0.9; /* 鼠标悬停时恢复不透明 */
}
</style>



<script setup lang="ts">
import { reactive, ref,  } from 'vue';
import type { Ref } from 'vue';
import Piece from './ChessPiece.vue';

const currentPlayer: Ref<'black' | 'white'> = ref('black');
const board = reactive(Array.from({ length: 15 }, () => Array(15).fill(null)));
const history: Ref<{ row: number, col: number, color: 'black' | 'white' }[]> = ref([]);
const winner: Ref<'black' | 'white' | null> = ref(null);
const moveTime: Ref<number> = ref(0);
const gameTime: Ref<number> = ref(0);
const customGameTime: Ref<number> = ref(300); // 默认对局时间
const isGameStarted: Ref<boolean> = ref(false); // 游戏是否已开始
let moveTimerId: number | null = null;
let gameTimerId: number | null = null;

function startMoveTimer() {
  clearInterval(moveTimerId!);
  moveTime.value = 0;
  moveTimerId = setInterval(() => {
    moveTime.value += 1;
  }, 1000);
}

// 开始对局总时计时器
function startGameTimer() {
  clearInterval(gameTimerId!);
  gameTime.value = customGameTime.value;
  gameTimerId = setInterval(() => {
    if (gameTime.value > 0) {
      gameTime.value -= 1;
    } else {
      clearInterval(gameTimerId!);
      alert("时间到，游戏结束！");
      resetBoard();
    }
  }, 1000);
}

// 开始游戏按钮点击后调用的函数
function startGame() {
  resetBoard();
  isGameStarted.value = true;  // 游戏标记为已开始
  startGameTimer();
  startMoveTimer();
}

// 落子函数，增加游戏是否已开始的判断
async function placePiece(row: number, col: number) {
  if (!isGameStarted.value) {
    alert("请先设置时间并点击开始游戏");
    return;
  }

  if (!board[row][col] && !winner.value) {
    board[row][col] = currentPlayer.value;
    history.value.push({ row, col, color: currentPlayer.value });
    if (checkWinner(row, col)) {
      winner.value = currentPlayer.value;
      clearInterval(moveTimerId!);
      clearInterval(gameTimerId!);
      setTimeout(() => {
        alert(`${winner.value} wins!`);
      }, 100);
    } else {
      currentPlayer.value = currentPlayer.value === 'black' ? 'white' : 'black';
      startMoveTimer();
    }
  }
}

function checkWinner(row: number, col: number): boolean {
  const directions: [number, number][] = [
    [1, 0], // 横向
    [0, 1], // 纵向
    [1, 1], // 斜向 \
    [1, -1] // 斜向 /
  ];

  for (const [dx, dy] of directions) {
    let count = 1;  // 初始化计数为1，代表当前落下的棋子
    // 向四个方向搜索
    count += countInDirection(row, col, dx, dy);   //从当前位置向指定方向（dx, dy）继续走多远能找到相同颜色的棋子
    count += countInDirection(row, col, -dx, -dy);  //从当前位置向相反方向（-dx, -dy）继续走多远能找到相同颜色的棋子，并一起相加，即总长度

    if (count >= 5) {  //胜利条件：连续5个相同颜色的棋子
      return true; 
    }
  }
  return false; 
}

function countInDirection(row: number, col: number, dx: number, dy: number): number {  // 向指定方向（dx, dy）搜索相同颜色的棋子
  let count = 0;
  let r = row + dx;
  let c = col + dy;

  while (r >= 0 && r < 15 && c >= 0 && c < 15 && board[r][c] === currentPlayer.value) {
    count++;
    r += dx;
    c += dy;
  }
  return count; 
}

function undoMove() {
  const lastMove = history.value.pop();
  if (lastMove) {
    board[lastMove.row][lastMove.col] = null;
    currentPlayer.value = lastMove.color;
    winner.value = null;
    startMoveTimer();  // 恢复步时计时器
  }
}

// 重置棋盘
function resetBoard() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      board[i][j] = null;
    }
  }
  history.value = [];
  currentPlayer.value = 'black';
  winner.value = null;
  moveTime.value = 0;
  gameTime.value = customGameTime.value; // 重置对局时间
  isGameStarted.value = false; // 设置游戏状态为未开始
  clearInterval(moveTimerId!);
  clearInterval(gameTimerId!);
}
</script>

<style>
body {
  /* 或者设置背景图片 */
  background-image: url('/background_mount.jpeg'); 
  background-size: cover; 
   background-repeat: no-repeat; 
}
.board {
  display: grid;
  grid-auto-columns: auto;
  grid-auto-rows: auto;
  gap: 2px; 
  grid-template-rows: repeat(15, 40px);
  grid-template-columns: repeat(15, 40px); 
  padding: 5px;
  border: 3px solid #333; 
  border-radius: 5px; 
}
.cell {
  width: 40px;
  height: 40px;
  background-color: rgba(240, 217, 181, 0.8); /* 设置半透明背景以便看到棋盘背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #333; 
  border-radius: 10%; 
  transition: background-color 0.2s ease; 
}
.cell:hover {
  background-color: rgba(210, 184, 152, 0.8); 
}
</style>
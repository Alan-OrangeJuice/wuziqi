<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
function startGame() {
  router.push('./ChessBoard'); // 假设游戏主页面路径为 /game
}
</script>

<template>
  <div class="welcome">
    <h1 class="title">经典五子棋</h1>
    <button class="start-button" @click="startGame" >开始游戏</button>
    <button  variant="primary" >开始游戏</button>
  </div>
</template>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #d9a673, #f0d9b5);
  text-align: center;
}

.title {
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease;
}

.start-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: #555;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

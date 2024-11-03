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
    <button class="start-button" @click="startGame" >进入游戏</button>
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
  background-color: rgba(217, 166, 115, 0.3); /* 设置为半透明背景色 */
  border-radius: 15px; /* 设置圆角，数值可以根据需要调整 */
  text-align: center;
}

.title {
  font-size: 3rem;
  color: #fff; /* 可以考虑将字体颜色改为白色，以便在背景上更好地显示 */
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease;
}

.start-button {
  padding: 10px 20px;
  font-size: 1.5rem;
  color: #fff;
  background-color: rgba(51, 51, 51, 0.8); /* 增加透明度的黑色，确保按钮清晰可见 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: rgba(85, 85, 85, 0.8);
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>


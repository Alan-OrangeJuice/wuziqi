// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ChessWelcome from '../views/ChessWelcome.vue';
import ChessBoard from '../components/ChessBoard.vue';

const routes = [
  { path: '/', redirect: '/ChessWelcome' },
  { path: '/ChessWelcome', component: ChessWelcome },
  { path: '/ChessBoard', component: ChessBoard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

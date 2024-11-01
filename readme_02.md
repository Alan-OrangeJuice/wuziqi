# 一、主要思路和文件分布
## 项目结构（src文件夹）
- components/：用于存放 Vue 组件，例如 Board.vue（棋盘）和 Piece.vue（棋子）
- views/：用于存放不同页面组件，比如游戏页面 GameView.vue
- store/（可选）：用于管理游戏状态，如果你使用 Vuex 或 Pinia

## 棋盘组件
- 在 components/ 文件夹下创建 Board.vue，用于渲染棋盘
- 使用一个二维数组 board（比如 15x15）来表示棋盘状态。可以在 setup 函数中用 reactive 定义这个数组
- 在模板中使用 v-for 循环遍历数组，渲染出 15x15 的格子
- 
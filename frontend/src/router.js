import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import UserAdd from "./views/user/Add.vue";
import UserEdit from "./views/user/Edit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "Home", desc: "Homeページです" },
  },
  {
    path: "/user/add",
    name: "UserAdd",
    component: UserAdd,
    meta: { title: "新規追加", desc: "新規登録ページです" },
  },
  {
    path: "/user/edit/:id",
    name: "UserEdit",
    component: UserEdit,
    meta: { title: "編集画面", desc: "編集画面ページです" },
  },
  // 他のルートを追加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const DEFAULT_TITLE = "デフォルト タイトル";
const DEFAULT_DESC = "デフォルト ディスクリプション";

router.afterEach((to, from) => {
  document.title = to.meta.title ?? DEFAULT_TITLE;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", to.meta.desc ?? DEFAULT_DESC);
});

export default router;

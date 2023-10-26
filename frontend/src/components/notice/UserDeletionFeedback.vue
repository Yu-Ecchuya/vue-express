<template>
  <div class="notice" v-if="notice.active">
    <p v-if="notice.success">ユーザーを削除しました。</p>
    <p style="color: red" v-else>ユーザーを削除に失敗しました。</p>
  </div>
</template>

<script>
export default {
  props: {
    notice: { Type: Object },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  text-align: center;
  background-color: rgb(187 251 255);
  padding: 20px;
  margin-bottom: 30px;
}
</style>

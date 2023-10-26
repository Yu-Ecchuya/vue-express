<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__item">
        <a @click="routerLink('/')" class="header__link">HOME</a>
      </div>
      <div class="header__item">
        <a @click="routerLink('/user/add')" class="header__link">新規追加</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  background-color: #4085e5;
  max-width: 100vw;
  padding: 20px;
  margin-bottom: 30px;
  &__nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__link {
    @extend .flex-center;
    cursor: pointer;
  }
}
</style>

<template>
  <div :class="deletePop ? 'isActive' : ''" class="userDeletePop">
    <div class="userDeletePop__inner">
      <p class="userDeletePop__id">ID: {{ deleteUserID }}</p>
      <p class="userDeletePop__text">本当にユーザー削除しますか？</p>
      <ul class="userDeletePop__btns">
        <li class="userDeletePop__item cancel">
          <button @click="$emit('childeDeletePop')" data-btn="cancel">
            キャンセル
          </button>
        </li>
        <li class="userDeletePop__item delete">
          <button @click="$emit('childeUserDelete')" data-btn="delete">
            削除する
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deletePop: { type: Boolean },
    deleteUserID: { type: Number },
  },
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userDeletePop {
  background: rgb(0 0 0 / 15%);
  padding: 30px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  transition: all 1s 0s ease;
  opacity: 0;
  display: none;
  top: 0;
  left: 0;

  &.isActive {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: all 1s 0s ease;
    opacity: 1;
  }
  &__inner {
    width: 50vw;
    height: 50vh;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
    background: white;
    border-radius: 10px;
    box-shadow: #00000014 16px 8px 8px 5px;
    gap: 10px;
    font-size: 30px;
  }
  &__item {
    button {
      background-color: blue;
      padding: 15px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 16px;
      border-radius: 10px;
      transition: all 0.5s 0s ease;
      width: 150px;
      &:hover {
        opacity: 0.5;
        transition: all 0.5s 0s ease;
      }
    }
    &.delete {
      button {
        background-color: rgb(255 0 0) !important;
        &:hover {
          background-color: rgb(159, 2, 2) !important;
        }
      }
    }
  }
  &__btns {
    @extend .flex-center;
    gap: 10px;
  }
  .error {
    color: red;
  }
}
</style>

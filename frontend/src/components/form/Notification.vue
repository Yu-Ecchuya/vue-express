<template>
  <div class="complete" :class="isActive ? 'isActive' : null" id="popup">
    <div class="inner">
      <p :class="error ? '' : 'error'">
        {{ error ? "送信完了しました" : "送信に失敗しました" }}
      </p>
      <p>5秒後にユーザー一覧へ移動します。</p>
      <button class="button" @click="passive()">閉じる</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: { type: String },
    isActive: {
      type: Boolean,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    passive() {
      this.$emit("passive", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.complete {
  background: rgb(0 0 0 / 15%);
  padding: 30px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  transition: all 1s 0s ease;
  opacity: 0;
  display: none;

  &.isActive {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: all 1s 0s ease;
    opacity: 1;
  }
  .inner {
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
  .button {
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
  .error {
    color: red;
  }
}
</style>

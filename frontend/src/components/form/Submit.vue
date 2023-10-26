<template>
  <div class="container">
    <input
      type="button"
      class="button"
      :value="btnLabel"
      @click="$emit('childClick')"
    />
  </div>
</template>

<script>
export default {
  props: ["btnLabel"],
};
</script>

<style lang="scss" scoped>
.button {
  background-color: cornflowerblue;
  padding: 10px 20px;
  text-align: center;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <li>
    <h4>
      <span>id: {{ id }}</span
      >{{ name }}
    </h4>
    <p>年齢: {{ age }}</p>
    <p>住所: {{ address }}</p>
    <p>電話番号: {{ tell }}</p>
  </li>
</template>

<script>
export default {
  props: {
    id: { type: Number },
    name: { type: String },
    age: { type: Number },
    address: { type: String },
    tell: { type: Number },
  },
};
</script>

<style lang="scss" scoped>
li {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
p {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  span {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
  }
}
</style>

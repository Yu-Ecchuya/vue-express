<template>
  <div class="container" :class="hidden ? 'hidden' : ''">
    <label :for="name" class="label inputParts">
      <span class="inputParts__name">{{ labelName }}</span>
      <input
        :type="type"
        :id="name"
        :name="name"
        :value="items.value ?? ''"
        @input="(e) => childChange(e)"
        class="inputParts__text"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
    },
    hidden: { type: Boolean },
  },
  methods: {
    childChange(e) {
      this.inputValue = e.target.value;
      this.$emit("childChange", this.inputValue, this.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 20px 0;
  &.hidden {
    display: none;
  }
}
input {
  border: 1px solid gray;
}
.label {
  display: flex;
  gap: 10px;
  width: fit-content;
}
.inputParts {
  &__name {
    display: block;
    width: 80px;
  }
  &__text {
    width: 300px;
    padding: 5px;
  }
}
</style>

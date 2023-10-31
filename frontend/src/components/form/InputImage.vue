<template class="upload">
  <input type="file" name="images[]" :id="id" @change="preImage" />
  <div class="upload__pre" v-show="image">
    <figure>
      <img :src="image" alt="" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      image: "",
    };
  },
  emits: ["childImageFile"],
  methods: {
    preImage() {
      const target = event.currentTarget;
      const file = target.files[0];
      const type = file.type;
      const size = file.size;
      const id = target.id;

      // 画像用バリデーション
      const validation = this.validation(type, size);
      if (!validation) {
        target.value = null;
        this.image = "";
        return;
      }

      const blob = new Blob([file], { type: "text/plain" });
      this.image = URL.createObjectURL(blob);

      // 親へ渡す
      this.$emit("childImageFile", this.image, id);
    },
    validation(type, size) {
      let determination = true;
      let error = "";

      // 拡張子
      if (
        type !== "image/jpg" &&
        type !== "image/png" &&
        type !== "image/gif" &&
        type !== "image/pdf"
      ) {
        error = "jpg/png/gif/pdfのみ選択可能です";
      }

      // サイズ
      if (size > 3000000) {
        error = "3MB以内で選択可能です";
      }

      if (error) {
        alert(error);
        determination = false;
      }

      return determination;
    },
  },
};
</script>

<style lang="scss" scoped>
.upload {
  margin-bottom: 30px;
  &__item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__pre {
    margin: 20px 0;
    figure {
      width: 200px;
      height: 200px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(213 213 213);
      background-color: rgb(232 232 232);
    }
    img {
      object-fit: contain;
      width: 100%;
      height: auto;
    }
  }
}
</style>

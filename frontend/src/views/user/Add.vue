<template>
  <Notification
    :isActive="notification.isActive"
    @passive="popUp"
    :error="notification.error"
  ></Notification>
  <Header></Header>
  <div class="wrap">
    <section class="form">
      <form>
        <div v-for="items in item">
          <Input
            :type="items.type"
            :labelName="items.label"
            :name="items.name"
            @childChange="cacheValue"
            :items="items"
            :hidden="items.hidden"
          ></Input>
        </div>
        <ul class="uploadList">
          <li class="uploadList__item" v-for="(value, key) in uploads">
            <span>{{ value }}: </span>
            <InputImage
              :id="key"
              @childImageFile="parentImageFile"
            ></InputImage>
          </li>
        </ul>
        <Submit :btnLabel="'送信'" @childClick="create()"></Submit>
      </form>
    </section>
  </div>
</template>

<script>
import { createUser } from "../../api/users/user_service";
import Input from "../../components/form/Input.vue";
import Submit from "../../components/form/Submit.vue";
import InputImage from "../../components/form/InputImage.vue";
import Notification from "../../components/form/Notification.vue";
import Header from "../../components/header/Header.vue";

export default {
  name: "UserAdd",
  data() {
    return {
      postUrl: `${import.meta.env.VITE_API_ENDPOINT}/users/post`,
      notification: {
        isActive: false,
        error: false,
      },
      item: [
        {
          type: "text",
          label: "名前",
          name: "name",
          value: "",
          hidden: false,
        },
        {
          type: "number",
          label: "年齢",
          name: "age",
          value: "",
          hidden: false,
        },
        {
          type: "text",
          label: "住所",
          value: "",
          name: "address",
          hidden: false,
        },
        {
          type: "tell",
          label: "電話番号",
          name: "tell",
          value: "",
          hidden: false,
        },
      ],
      files: [],
      uploads: { file1: "画像1", file2: "画像2", file3: "画像3" },
    };
  },
  components: {
    Input,
    Submit,
    Notification,
    Header,
    InputImage,
  },
  methods: {
    create() {
      const notification = this.notification;
      notification.isActive = true;

      const data = {
        name: this.item[0].value,
        age: this.item[1].value,
        address: this.item[2].value,
        tell: this.item[3].value,
      };

      if (!data.name || !data.age || !data.address) {
        alert("名前, 年齢, 住所 が未記入です");
        return;
      }

      createUser(data)
        .then((res) => {
          console.log(res);
          notification.error = true;

          setTimeout(() => {
            this.$router.push("/");
          }, "5000");
        })
        .catch((error) => {
          console.error(error);
          notification.error = false;
        });
    },
    cacheValue(value, name) {
      this.item.map((items) => {
        if (items.name === name) {
          items.value = value;
        }
      });
    },
    popUp(action) {
      this.notification.isActive = action;
    },
    parentImageFile(file, id) {
      // 同じキーの存在を確認
      const index = this.files.findIndex((item) => Object.keys(item)[0] === id);

      if (index === -1) {
        // 新規追加
        this.files.push({ [id]: file });
      } else {
        // 既存のキーを上書き
        this.files[index][id] = file;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 50px 0 0;
}
.uploadList {
  margin-bottom: 30px;
  &__item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

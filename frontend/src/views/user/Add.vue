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
        <Submit :btnLabel="'送信'" @childClick="create()"></Submit>
      </form>
    </section>
  </div>
</template>

<script>
import { createUser } from "../../api/users/user_service";
import Input from "../../components/form/Input.vue";
import Submit from "../../components/form/Submit.vue";
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
    };
  },
  components: {
    Input,
    Submit,
    Notification,
    Header,
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
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin: 50px 0 0;
}
</style>

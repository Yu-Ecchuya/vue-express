<template>
  <Notification
    :isActive="notification.isActive"
    @passive="popUp"
    :error="notification.error"
  ></Notification>
  <Header></Header>
  <div class="loader" v-show="isLoading">Loading...</div>
  <div class="wrap" v-show="!isLoading">
    <section class="form" v-if="userData.length !== 0">
      <h3>
        {{ userData.name }}
        <span>ID: {{ userData.id }}</span>
      </h3>
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
        <Submit :btnLabel="'送信'" @childClick="upDate()"></Submit>
      </form>
    </section>
    <section style="text-align: center; font-size: 20px" v-else>
      <h2>ユーザーデータが存在しません</h2>
      <p>5秒後にユーザー一覧へ戻ります</p>
    </section>
  </div>
</template>

<script>
import { editUsers, updateUser } from "../../api/users/user_service";
import Notification from "../../components/form/Notification.vue";
import Header from "../../components/header/Header.vue";
import Input from "../../components/form/Input.vue";
import Submit from "../../components/form/Submit.vue";

export default {
  name: "UserEdit",
  data() {
    return {
      userData: [],
      id: this.$route.params.id,
      notification: {
        isActive: false,
        error: false,
      },
      item: [
        {
          type: "number",
          label: "ID",
          name: "id",
          value: "",
          hidden: true,
        },
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
      isLoading: true,
    };
  },
  components: {
    Header,
    Notification,
    Input,
    Submit,
  },
  mounted() {
    const id = this.id;
    editUsers(id)
      .then((res) => {
        this.userData = res.data.users[0];

        // userDataをdataへコピー
        const data = { ...this.userData };

        Object.values(data).map((value, index) => {
          this.item[index]["value"] = value;
        });
        this.isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        this.isLoading = false;

        setTimeout(() => {
          this.$router.push("/");
        }, "5000");
      });
  },
  methods: {
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
    upDate() {
      const notification = this.notification;
      notification.isActive = true;

      const data = {
        id: this.item[0].value,
        name: this.item[1].value,
        age: this.item[2].value,
        address: this.item[3].value,
        tell: this.item[4].value,
      };

      if (!data.name || !data.age || !data.address) {
        alert("名前, 年齢, 住所 が未記入です");
        return;
      }

      updateUser(data.id, data)
        .then((res) => {
          console.log(res);
          notification.error = true;
        })
        .catch((err) => {
          console.error(err);
          notification.error = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  font-size: 20px;
  font-weight: bold;
  span {
    font-size: 16px;
  }
}
</style>

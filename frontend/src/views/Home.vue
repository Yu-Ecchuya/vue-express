<script>
import { getUsers, deleteUser } from "../api/users/user_service";
import Table from "../components/layout/Table.vue";
import Header from "../components/header/Header.vue";
import PopUp from "../components/notice/PopUp.vue";
import UserDeletionFeedback from "../components/notice/UserdeletionFeedback.vue";

export default {
  name: "Home",
  data() {
    return {
      userData: [],
      deletePop: false,
      deleteUserID: 0,
      notice: {
        active: false,
        success: false,
      },
      isLoading: true,
    };
  },
  components: {
    Header,
    Table,
    PopUp,
    UserDeletionFeedback,
  },
  mounted() {
    getUsers()
      .then((response) => {
        if (response.data) {
          this.userData = response.data.users;
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  },
  methods: {
    isDeletePopHidden() {
      this.deletePop = false;
    },
    isDeletePopShow(userID) {
      this.deletePop = true;
      this.deleteUserID = Number(userID);
    },
    userDelete() {
      const userID = this.deleteUserID;

      deleteUser(userID)
        .then((res) => {
          console.log(res);
          this.deletePop = false;
          this.notice.active = true;
          this.notice.success = true;
        })
        .catch((error) => {
          console.error(error);
          this.deletePop = false;
          this.notice.active = true;
          this.notice.success = false;
        });
    },
  },
};
</script>

<template>
  <Header></Header>
  <PopUp
    :deletePop="deletePop"
    :deleteUserID="deleteUserID"
    @childeDeletePop="isDeletePopHidden"
    @childeUserDelete="userDelete"
  ></PopUp>
  <div class="loader" v-show="isLoading">Loading...</div>
  <div class="wrap" v-show="!isLoading">
    <UserDeletionFeedback :notice="notice"></UserDeletionFeedback>
    <Table
      :thead="['ID', '名前', '年齢', '住所', '電話番号', '']"
      :tbody="userData"
      @childDel="isDeletePopShow"
    ></Table>
  </div>
</template>

<style lang="scss" scoped></style>

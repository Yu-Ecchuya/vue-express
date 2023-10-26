<template>
  <table class="userList">
    <thead>
      <tr>
        <td v-for="item in thead" class="userList__th">{{ item }}</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tbody" :key="item.id" v-if="tbody && tbody.length > 0">
        <td class="userList__td">{{ item.id }}</td>
        <td class="userList__td">{{ item.name }}</td>
        <td class="userList__td">{{ item.age }}</td>
        <td class="userList__td">{{ item.address }}</td>
        <td class="userList__td">{{ item.tell }}</td>
        <td class="userList__td edit">
          <span class="edit__btn">
            <a @click="routerLink(`/user/edit/${item.id}`)">編集</a>
          </span>
          <span class="edit__btn edit__btn--remove">
            <a @click="(e) => childDel(e)" :data-user="item.id">削除</a>
          </span>
        </td>
      </tr>
      <tr v-else class="userList__noneUser">
        <td colspan="6">ユーザーが存在しません</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    thead: { type: Array },
    tbody: { type: Array },
  },
  emits: ["childDel"],
  methods: {
    childDel(e) {
      const target = e.target.dataset.user;
      this.$emit("childDel", target);
    },
  },
};
</script>

<style lang="scss" scoped>
$tableBorder: 1px solid #efdddd;
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.userList {
  border: $tableBorder;
  margin: 0 0 50px;
  font-size: 16px;
  width: 100%;
  td,
  th {
    padding: 10px;
  }
  tr {
    &:nth-child(2n) {
      background-color: #e4f3f5;
    }
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
  &__noneUser {
    text-align: center;
  }
  &__th {
    border-right: $tableBorder;
    border-bottom: 1px solid #efdddd;
    background-color: #a0d5ff;
    &:last-child {
      border-right: none;
    }
  }
  &__td {
    border-right: $tableBorder;
    border-bottom: $tableBorder;
    &:last-child {
      border-right: none;
    }
  }
  .edit {
    @extend .flex-center;
    gap: 10px;
    &__btn {
      font-size: 14px;
      &--remove {
        a {
          background-color: rgb(255 0 0) !important;
          &:hover {
            background-color: rgb(159, 2, 2) !important;
          }
        }
      }
      a {
        width: 70px;
        padding: 5px 10px;
        cursor: pointer;
        @extend .flex-center;
        color: white;
        transition: all 0.5s 0s ease;
        border-radius: 6px;
        background-color: rgb(0 149 134);
        &:hover {
          background-color: rgb(1, 118, 106);
          transition: all 0.5s 0s ease;
        }
      }
    }
  }
}
</style>

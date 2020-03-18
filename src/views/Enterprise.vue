<template>
  <div>
    <v-container>
      <!-- ユーザー情報を取得するボタンを設置 -->
      <v-btn outlined color="primary" @click="getUserInfo();">カテゴリーを取得</v-btn>
      <v-btn outlined color="primary" @click="getUserInfo();">カテゴリーをフォロー</v-btn>
      <v-btn outlined color="primary" @click="getUserInfo();">カテゴリーを作る</v-btn>
    </v-container>
    <v-tabs class="tabs" height="46px" v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route" exact>{{ tab.name }}</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
export default {
  data() {
    return {
      activeTab: "/about2",
      tabs: [
        { id: 1, name: "About2", route: "/about2" },
        { id: 2, name: "About3", route: "/about3" },
        { id: 3, name: "About4", route: "/about2" },
        { id: 4, name: "About5", route: "/about3" }
      ]
    };
  },
  methods: {
    getCategorys() {
      axios
        .get("http://localhost:3000/api/v1/categorys", {
          headers: {
            Authorization: `Bearer ${store.state.auth.login.token}`
          }
        })
        .then(res => {
          // 成功時
          console.log(res.data);
          // userInfoListにapiで取得した情報を格納
          this.micropostList = res.data.data;
        })
        .catch(err => {
          // 失敗時
          console.log(err);
          // トークンが正しくなければログイン画面にリダイレクト
          if (err.response.status == 401) {
            this.$router.push({
              path: "/login",
              query: { backuri: this.$route.fullPath }
            });
          } else {
            alert(
              "情報を取得できませんでした。時間をおいてやり直してください。"
            );
          }
        });
    },
    submitCategorys() {
      this.post_lp_active = true;
      this.post_lp_indeterminate = true;
      axios.defaults.headers.common = {
        Authorization: `Bearer ${store.state.auth.login.token}`
      };
      axios
        .post("http://localhost:3000/api/v1/categorys", {
          content: this.micropost,
          user_id: store.state.auth.login.user_id
        })
        .then(res => {
          //ログの前に書く必要があります、後ろに置くと効かない
          this.dialog = false;
          // 成功時
          console.log(res.data);
        })
        .catch(err => {
          // 失敗時
          console.log(err);
        });
    }
  }
};
</script>
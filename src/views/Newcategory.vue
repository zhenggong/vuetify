<template>
  <v-container>
    <h1 class="display-1 mb-2">Edit Card</h1>
    <v-card max-width="344" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
          <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img src height="194"></v-img>

      <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

      <v-card-actions>
        <v-btn icon>
          <v-icon color="yellow">mdi-star</v-icon>
        </v-btn>
        <v-btn text color="deep-purple accent-4">Read</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <h1 class="display-1 mb-2">Edit Form</h1>
    <v-container fluid fill-height>
      <v-flex v-for="(micropost, index) in micropostList" :key="index">
        <v-card>
          <v-row justify="center" align-content="center">
            <v-col cols="8">
              <v-text-field v-model="first" label="First Name" filled></v-text-field>
            </v-col>
            <v-col cols="8">
              <About4 />
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-container>
    <v-fab-transition>
      <v-btn
        :key="fabicon"
        :color="fabcolor"
        fab
        large
        dark
        bottom
        left
        class="v-btn--example"
        @click="addCategorySession"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
// axiosをインポート
import About4 from "../views/About4";
import axios from "axios";
import store from "@/store/index.js";
export default {
  created: function() {
    axios
      .get("http://localhost:3000/api/v1/categoryforms", {
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
          alert("情報を取得できませんでした。時間をおいてやり直してください。");
        }
      });
  },
  data: () => ({
    micropostList: {},
    snackbar: false,
    snackbartext: "",
    valid: true,
    fabicon: "mid-plus",
    fabcolor: "red",
    name: "",
    nameRules: [
      v => !!v || "お名前が必要",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "メールアドレスが必要",
      v => /.+@.+\..+/.test(v) || "メールアドレスのフォームをご確認ください"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 6) || "Password must be more than 6 characters"
    ],
    checkbox: false
  }),
  components: {
    About4
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        axios
          .get("http://localhost:3000/api/v1/categoryforms", {
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
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    addCategorySession() {
      micropostList.push({ 惑星: "火星" });
    }
  }
};
</script>
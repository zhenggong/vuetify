<template>
  <v-content>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
          <v-btn flat outline color="primary" @click="getUserInfo();">データを取得</v-btn>
        </template>
        <v-card>
          <v-container>
            <v-progress-linear
              v-model="post_pl"
              :active="post_lp_active"
              :background-opacity="post_lp_opacity"
              :bottom="post_lp_bottom"
              :buffer-value="post_lp_buffer"
              :height="post_lp_height"
              :indeterminate="post_lp_indeterminate"
              :query="post_lp_query"
              :rounded="post_lp_rounded"
              :stream="post_lp_stream"
              :striped="post_lp_striped"
              :top="post_lp_top"
              :value="post_lp_value"
              color="light-blue"
            ></v-progress-linear>
          </v-container>
          <v-card-title>
            <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="submitpost">ツィートする</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col fluid>
                  <v-textarea v-model="micropost" solo name="input-7-3" label="タイトル"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <v-container fluid fill-height>
      <v-flex v-for="(micropost, index) in micropostList" :key="index">
        <v-card max-width="344" class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Micropost</v-list-item-title>
              <v-list-item-subtitle v-text="micropost.user_id">by Kurt Wagner</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

          <v-card-text
            v-text="micropost.content"
          >Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Read</v-btn>
            <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
// axiosをインポート
import axios from "axios";
import store from "@/store/index.js";
export default {
  data: function() {
    return {
      // 空の配列を用意
      micropostList: [],
      dialog: false,
      content: this.micropost,
      absolute: false,
      post_lp_active: false,
      post_lp_opacity: 1,
      post_lp_bottom: false,
      post_lp_buffer: 100,
      post_lp_fixed: false,
      post_lp_height: 4,
      post_lp_indeterminate: false,
      qpost_lp_uery: false,
      post_lp_rounded: false,
      post_lp_stream: true,
      post_lp_striped: false,
      post_lp_top: false,
      post_lp_value: 25
    };
  },
  methods: {
    getUserInfo: function() {
      axios
        .get("http://localhost:3000/api/v1/microposts", {
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
    submitpost: function() {
      this.post_lp_active = true;
      this.post_lp_indeterminate = true;
      axios.defaults.headers.common = {
        Authorization: `Bearer ${store.state.auth.login.token}`
      };
      axios
        .post("http://localhost:3000/api/v1/microposts", {
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


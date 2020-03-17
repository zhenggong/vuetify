<template>
<v-content>
        <v-container fluid fill-height>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>

              <v-card-actions>
                <!-- ユーザー情報を取得するボタンを設置 -->
                <v-btn outlined color="primary" @click="getUserInfo();"
                  >カテゴリーを取得</v-btn
                >
                <v-btn outlined color="primary" @click="getUserInfo();"
                  >カテゴリーをフォロー</v-btn
                >
                <v-btn outlined color="primary" @click="getUserInfo();"
                  >カテゴリーを作る</v-btn
                >
              </v-card-actions>

              <v-card-title primary-title>
                <div>
                  <!-- ユーザー情報をループ -->
                  <ul>
                    <li v-for="(userInfo, index) in userInfoList" :key="index">
                      {{ userInfo.content}}
                    </li>
                  </ul>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-container>
      </v-content>
</template>

<script>
// axiosをインポート
import axios from "axios";
import store from "@/store/index.js"

export default {
  name: 'About3',
  data: function() {
    return {
      // 空の配列を用意
      userInfoList  : []
    };
  },
  methods: {
    getUserInfo: function() {
      axios
        .get("http://localhost:3000/api/v1/categorys",
            {headers: {
                  Authorization: `Bearer ${store.state.auth.login.token}`
              }        
            }
        ).then(res => {
          // 成功時
          console.log(res.data);
          // userInfoListにapiで取得したユーザー情報を格納
          this.userInfoList = res.data.data;
        })
        .catch(err => {
          // 失敗時
          console.log(err);
        });
    }
  }
};
</script>


<template>
<v-content>
        <v-container fluid fill-height>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
              ></v-img>

              <v-card-actions>
                <!-- ユーザー情報を取得するボタンを設置 -->
                <v-btn flat outline color="primary" @click="getUserInfo();"
                  >データを取得</v-btn
                >
              </v-card-actions>

              <v-card-title primary-title>
                <div>
                  <!-- ユーザー情報をループ -->
                  <ul>
                    <li v-for="(userInfo, index) in userInfoList" :key="index">
                      {{ userInfo.name.last }}
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

export default {
  name: 'About',
  data: function() {
    return {
      // 空の配列を用意
      userInfoList: []
    };
  },
  methods: {
    getUserInfo: function() {
      axios
        .get("https://randomuser.me/api/?results=5")
        .then(res => {
          // 成功時
          console.log(res.data);
          // userInfoListにapiで取得したユーザー情報を格納
          this.userInfoList = res.data.results;
        })
        .catch(err => {
          // 失敗時
          console.log(err);
        });
    }
  }
};
</script>


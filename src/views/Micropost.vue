<template>
<v-content>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>
        <v-card>
          <v-card-title>

            <v-btn color="blue darken-1" text @click="dialog = false">キャンセル</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="submitpost">ツィートする</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
    <v-row>
      <v-col fluid>
        <v-textarea
          v-model="micropost"
          solo
          name="input-7-4"
          label="今どうしてる?"
        ></v-textarea>
      </v-col>
    </v-row>

            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
        <v-container fluid fill-height>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
              ></v-img>

              <v-card-actions>
                <!-- 情報を取得するボタンを設置 -->
                <v-btn flat outline color="primary" @click="getUserInfo();"
                  >micropostを取得</v-btn>
                >
              </v-card-actions>

              <v-card-title primary-title>
                <div>
                  <!-- 情報をループ -->
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

export default {
  name: 'About',
  data: function() {
    return {
      // 空の配列を用意
      userInfoList  : [],
      dialog: false,
      content: this.micropost
    };
  },
  methods: {
    getUserInfo: function() {
      axios
        .get("http://localhost:3000/api/v1/microposts")
        .then(res => {
          // 成功時
          console.log(res.data);
          // userInfoListにapiで取得した情報を格納
          this.userInfoList = res.data.data;
        })
        .catch(err => {
          // 失敗時
          console.log(err);
        });
    },
    submitpost: function() {
      axios
        .post("http://localhost:3000/api/v1/microposts",{
          content:this.micropost,
          user_id:1
        })
        .then(res => {
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


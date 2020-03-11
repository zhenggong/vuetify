<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>
    </v-row>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="お名前"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="メールアドレス"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="パスワード"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'ご利用には利用規約に同意する必要があります!']"
      label="利用規約に同意"
      required
    ></v-checkbox>

     <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      アカウント登録
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      クリア
    </v-btn>

  </v-form>
    <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbartext }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>

    </v-container>
</template>

<script>

// axiosをインポート
import axios from "axios";
import store from "@/store/index.js";
  export default {
    data: () => ({
      snackbar: false,
      snackbartext: '',
      valid: true,

      name: '',
      nameRules: [
        v => !!v || 'お名前が必要',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスが必要',
        v => /.+@.+\..+/.test(v) || 'メールアドレスのフォームをご確認ください',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {     
      axios
        .post("http://localhost:3000/api/v1/users", {
          name:this.name,
          email:this.email,
          password:this.password
        })
        .then(res => {
          // 成功時
          console.log(res.data);
          this.snackbartext = res.data.data.token
          this.snackbar = true;
          store.dispatch("setLoginInfo", res.data.data)
          this.$router.push('/micropost')
        })
        .catch(err => {
          // 失敗時
          console.log(err);
          this.snackbartext = err;
          this.snackbar = true;
        });

        }
      },
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>
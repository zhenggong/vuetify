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
    <v-fab-transition>
      <v-btn :key="fabicon" :color="fabcolor" fab large dark bottom left class="v-btn--example">
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
  data: () => ({
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
          .post("http://localhost:3000/api/v1/users", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(res => {
            // 成功時
            console.log(res.data);
            this.snackbartext = res.data.data.token;
            this.snackbar = true;
            store.dispatch("setLoginInfo", res.data.data);
            this.$router.push("/micropost");
          })
          .catch(err => {
            // 失敗時
            console.log(err);
            this.snackbartext = err;
            this.snackbar = true;
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
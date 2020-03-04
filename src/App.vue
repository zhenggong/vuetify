<template>
  <v-app>
<v-navigation-drawer app v-model="drawer" clipped >
  <v-container>
    <v-list-item>
      <v-list-item-content>

        <v-list-item-title class="title grey--text text--darken-2">
          Navigation lists
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
        <v-list-item-icon>
          <v-icon>{{ nav_list.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-container>
</v-navigation-drawer>
    
    <v-app-bar color="primary" dark app clipped-left>
    
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify</v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
        <template v-slot:activator="{on}">
        <v-btn v-on="on" text><v-icon>mdi-account</v-icon></v-btn>
        </template>
          <v-list>
          <v-list-item
            v-for="(item, index) in accountmenuitems"
            :key="index" :to="item.link">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

        <v-menu offset-y>
        <template v-slot:activator="{on}">
        <v-btn v-on="on" text>Support<v-icon>mdi-menu-down</v-icon></v-btn>
        </template>
          <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      </v-toolbar-items>
              <template v-slot:extension>
          <v-tabs
            v-model="model"
            centered
            slider-color="yellow"
          >
            <v-tab
              v-for="i in 3"
              :key="i"
              :href="`#tab-${i}`"
            >
              Item {{ i }}
            </v-tab>
          </v-tabs>
        </template>
    </v-app-bar>
            <v-tabs-items v-model="model">
        <v-tab-item
          v-for="i in 3"
          :key="i"
          :value="`tab-${i}`"
        >
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

    <v-content>
    <router-view />
    </v-content>

    <v-footer color="primary" dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      model: 'tab-2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

        items: [
          {name: 'Consulting and suppourt',icon: 'mdi-vuetify'},
          {name: 'Discord community',icon: 'mdi-discord'},
          {name: 'Report a bug',icon: 'mdi-bug'},
          {name: 'Github issue board',icon: 'mdi-github-face'},
          {name: 'Stack overview',icon: 'mdi-stack-overflow'},
        ],
        accountmenuitems: [
          {name: 'Sign Up',
           link:'/signup',
          },
          {name: 'Login',
           link:'/login',
          },
        ],
        drawer: null,
        nav_lists:[
         {name: 'Getting Started',icon: 'mdi-vuetify'},
         {name: 'Customization',icon: 'mdi-cogs'},
         {name: 'Styles & animations',icon: 'mdi-palette'},
         {name: 'UI Components',icon: 'mdi-view-dashboard'},
         {name: 'Directives',icon: 'mdi-function'},
         {name: 'Preminum themes',icon: 'mdi-vuetify'},
        ],
    }
  }
}
</script>
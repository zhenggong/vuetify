<template>
  <div>
    <v-tabs class="tabs" height="46px" v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.route" exact>{{ tab.name }}</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
 data() {
    return {
      activeTab: '/about2',
      tabs: [
        { id: 1, name: "About2", route: '/about2' },
        { id: 2, name: "About3", route: '/about3'},
        { id: 3, name: "About4", route: '/about2' },
        { id: 4, name: "About5", route: '/about3'},
      ]
    };
  }
}

</script>
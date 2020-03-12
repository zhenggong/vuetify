<template>
  <div>
    <v-tabs class="tabs" centered grow height="60px" v-model="activeTab">
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
        { id: 2, name: "About3", route: '/about3'}
      ]
    };
  }
}

</script>
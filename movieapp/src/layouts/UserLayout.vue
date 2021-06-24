<template>
  <q-layout view="lHh lpR fFf">
    <q-toolbar style="height: 70px" class="bg-light-blue-10 text-white shadow-2">
        <div class="text-h5 q-ml-lg"><span class="material-icons">slideshow</span>E-Theatre</div>

      <q-space/>
      <div v-if="!$q.screen.xs">
        <q-btn size="mediuim" :to="{ name:'homeUser' }" flat>Home</q-btn>
        <q-btn size="mediuim" :to="{ name:'myOrder' }" flat>My Order</q-btn>
        <q-btn size="mediuim" flat>About</q-btn>
        <q-btn size="mediuim" flat @click="logout()">Log Out</q-btn>
      </div>
      <q-btn size="medium" round flat icon="shopping_cart"/>
      <q-btn size="medium" @click="drawer = !drawer" v-if="$q.screen.xs" round flat icon="menu"/>
    </q-toolbar>
      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        side="right"
        content-class="bg-white"
      >
        <q-scroll-area class="fit">
          <q-list>

              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>
                  Home
                </q-item-section>
              </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container class="bg-light-blue-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>

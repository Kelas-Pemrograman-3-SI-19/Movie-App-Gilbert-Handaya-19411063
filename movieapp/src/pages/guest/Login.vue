<template>
  <q-layout class="bg-light-blue-1" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
            <q-card flat>
              <div class="row item-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row q-pt-xl justify-center">
                    <div class="col-md-8 q-pt-xl">
                      <q-img src="https://sosmed.benmakmur.com/content/themes/default/images/headers/undraw_movie_night_fldd.svg"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <q-card-section>
                    <div class="text-h4">E-theatre</div>
                    <div>Login To Your Account</div>
                  </q-card-section>
                  <q-form
                    @submit="login"
                  >
                    <q-card-section>
                      <q-input v-model="username" label="username"/>
                      <q-input type="password" v-model="password" label="password"/>
                    </q-card-section>
                    <q-card-section>
                      <q-btn class="full-width" type="submit" unelevated color="accent" label="Login"/>
                      <q-btn class="full-width q-mt-md" :to="{ name: 'registerPage' }" flat unelevated color="accent" label="Register"/>
                    </q-card-section>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardAdmin' })
          } else {
            this.$router.push({ name: 'homeUser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>

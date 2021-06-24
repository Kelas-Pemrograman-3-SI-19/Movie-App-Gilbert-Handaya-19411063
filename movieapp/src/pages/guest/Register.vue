<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="bg-light-blue-1">
        <div class="row">
          <q-card class="fixed-center col-md-4 col-xs-12">
            <q-card-section>
              <div class="text-h6 text-center">
                Registration Form
              </div>
              <q-form
                @submit="onSubmit"
              >
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="username"
                  label="Username"
                  :rules="[
                    val => val && val.length > 0 || 'Please Input Username'
                  ]"
                  />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="namaLengkap"
                  label="Nama Lengkap"
                  :rules="[
                  val => val && val.length > 0 || 'Please Input Your Full Name'
                  ]"
                  />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="email"
                  label="Email"
                  :rules="[
                  val => val && val.length > 0 || 'Please Input Email'
                  ]"
                  />
                <q-input
                  class="q-mt-md"
                  filled
                  v-model="password"
                  type="password"
                  label="Password"
                  :rules="[
                  val => val && val.length > 0 || 'Please Input Password'
                  ]"
                  />
                <div class="q-gutter-md">
                  <q-btn label="Register" type="submit" unelevated color="accent"/>
                  <q-btn label="Login" :to="{ name: 'loginPage'}" flat unelevated color="accent"/>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
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
      namaLengkap: null,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        namaLengkap: this.namaLengkap,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginPage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>

<template>
  <q-page padding>
    <div class="q-mb-xl">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        swipeable
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="https://i.pinimg.com/originals/6f/e0/68/6fe0681567d9b10d075c280928153385.png"/>
        <q-carousel-slide :name="2" img-src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ee732bebd98393d75ff281d_580b57fcd9996e24bc43c529.png"/>
        <q-carousel-slide :name="3" img-src="https://www.licenseglobal.com/sites/licenseglobal.com/files/disneyindia.png" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(movie, i) in data" :key="i">
        <q-card>
          <q-img
          :src="`${$baseImageURL}${movie.image}`"
          :ratio="16/9"
          />

          <q-card-section>
            <q-btn
              fab
              color="accent"
              icon="add_shopping_cart"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ movie.judulFilm }}
              </div>
              <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                <q-icon name="theaters" />
                Buy Now
              </div>
            </div>

            <q-rating
              v-model="movie.rating"
              readonly
              size="3.5em"
              color="grey"
              :color-selected="ratingColor"
            />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              {{ movie.genre }} - Rp {{ movie.harga }},-
            </div>
            <div class="text-caption text-grey">
              Show Description
              <q-card-actions style="float: right">
              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="movie.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="movie.expanded = !movie.expanded"
              />
            </q-card-actions>
            </div>
            <q-slide-transition>
              <div v-show="movie.expanded">
                <div class="text-grey text-caption text-justify">
                  {{ movie.deskripsi }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>

          <q-card-actions>
            <q-btn @click="openDetail(movie)" flat class="full-width" color="accent">
              Order Now
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" :position= "position">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">Order Details</div>
          </q-card-section>
          <q-card-section style="max-height: 50vh;" class="scroll">
            {{ activeData.judulFilm }} - Rp {{ activeData.harga }},-
            <q-form class="q-mt-md">
              <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Input Quantity"/>
              Total Harga = Rp. {{ total }},-
              <q-file color="teal" filled label="Label" v-model="image" class="q-mt-md">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup/>
            <q-btn @click="prosesTransaksi" color="accent" label="Proceed"/>
          </q-card-actions>
        </q-card>
    </q-dialog>
  </q-page>
</template>
<script>

export default {
  data () {
    return {
      slide: 1,
      stars: 5,
      dialog: false,
      position: 'bottom',
      ratingColor: ['orange-3', 'orange-6', 'red', 'red-9', 'red-10'],
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            // this.data = res.data.data
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>

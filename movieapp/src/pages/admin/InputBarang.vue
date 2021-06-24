<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14 bg-grey-1">
              <div class="text-h6">Add Movies</div>
              <div>Add New Movies</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section class="bg-grey-1">
        <q-form
          @submit="onSubmit"
          class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
        >
            <q-input
                filled
                label="Add Movie Name"
                v-model="form.judulFilm"
                :rules="[ val => val && val.length > 0 || 'Please Input Movie Name']"
            />

            <q-input
                filled
                label="Add Price"
                type="number"
                v-model="form.harga"
                :rules="[ val => val > 0 || 'Please Add price']"
            />

            <q-input
                filled
                label="Add Released Year"
                v-model="form.tahun"
                :rules="[ val => val && val.length > 0 || 'Please Input Movie Released Year']"
            />

            <q-select
              filled
              v-model="form.genre"
              :options="optionGenre"
              label="Select Genre"
            />

            <div class="flex">
              <div class="q-pt-md">Choose Rating</div>
              <q-rating
                v-model="form.rating"
                size="3.5em"
                color="grey"
                class="q-ml-md"
                :color-selected="ratingColor"
              />
            </div>

            <q-input
              v-model="form.deskripsi"
              label="Description"
              filled
              type="textarea"
            />

            <q-file accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Thumbnail">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>

            <div>
                <q-btn label="Submit" type="submit" color="accent"/>
                <q-btn label="Reset" type="reset" color="accent" flat class="q-ml-sm" />
            </div>
            </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        judulFilm: null,
        harga: 0,
        tahun: null,
        genre: null,
        rating: 0,
        deskripsi: null
      },
      optionGenre: [
        'Action',
        'Adventure',
        'Horror',
        'Drama',
        'Fantasy',
        'Thriller',
        'Mystery'
      ],
      ratingColor: ['orange-3', 'orange-6', 'red', 'red-9', 'red-10'],
      image: null
    }
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('/movie/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataDVD' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left{
  width: 3px;
  height: 100%;
  background-color: aquamarine;
}
</style>

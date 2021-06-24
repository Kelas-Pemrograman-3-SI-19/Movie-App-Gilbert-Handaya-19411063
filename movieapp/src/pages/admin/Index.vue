<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Transaction Data</div>
              <div>Purchase and Sale Data Transaction</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card class="my-card">
      <q-card-section class="bg-grey-2">
        <q-table
          :data="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="judulFilm" :props="props">
                {{ props.row.dataMovie[0].judulFilm }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="nama" :props="props">
                {{ props.row.dataUser[0].namaLengkap }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="warning" class="q-pa-sm">
                  Not Confirmed Yet
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="green" class="q-pa-sm">
                  On Delivery
                </q-badge>
                <q-badge v-else color="blue" class="q-pa-sm">
                  Received By Client
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" @click="openDetail(props.row)" unelevated color="accent"/>
                <q-btn :disable="props.row.status !== 1 " label="Confirmation" @click="confirm(props.row._id)" class="q-ml-sm" unelevated color="green"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Order Detail</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-caption">
                Client Name
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataUser[0].namaLengkap }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Movie Name
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataMovie[0].judulFilm }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Price
              </div>
              <div class="text-weight-bold">
                {{ activeData.harga }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Amount
              </div>
              <div class="text-weight-bold">
                {{ activeData.jumlah }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Total
              </div>
              <div class="text-weight-bold">
                {{ activeData.total }}
              </div>
            </div>
          </div>
          <div class="row">
            <q-img :src="`${$baseImageURL}${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'judulFilm', align: 'left', label: 'Movie Name', field: 'judulFilm', sortable: true },
        { name: 'harga', align: 'center', label: 'Price', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Amount', field: 'jumlah', sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
        { name: 'nama', align: 'center', label: 'Name', field: 'nama', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Action', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/order/getallorder')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are You Sure to Confirm Order?',
        cancel: true,
        color: 'accent',
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/konfirmasiorder/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
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

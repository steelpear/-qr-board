<template>
  <q-page class="flex flex-start">
    <div class="fit q-pa-md">
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :pagination="pagination"
        rows-per-page-label="Записей на страницу"
        no-results-label="По этому запросу ничего не найдено"
        no-data-label="Нет объявлений"
        dark
        dense
      >
      <template v-slot:top-right>
        <q-input borderless dense dark debounce="300" v-model="filter" placeholder="Поиск" clearable clear-icon="close">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="number" :props="props">{{ props.row.qrId }}</q-td>
          <q-td key="id" :props="props">{{ props.row._id }}</q-td>
          <q-td key="date" :props="props">{{ dateToString(props.row.qrDate) }}</q-td>
          <q-td><q-btn flat size="sm" icon="far fa-eye" @click="viewQr(props.row.qrImgSrc)" /></q-td>
          <q-td><q-btn flat size="sm" icon="delete" @click="confirm(props.row.qrId, props.row._id)" /></q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog v-model="qrDialog" square transition-show="scale" transition-hide="scale">
      <q-img :src="qrImgDialogSrc" style="height: 300px; width: 300px;" />
    </q-dialog>

    <q-dialog v-model="confirmDialog" square persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-indigo text-white" style="width: 500px">
        <q-card-section>
          <div class="text-h5 text-center">Удаление объявления {{ confirmId }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-subtitle1 text-center">
          Вы действительно хотите удалить это объявление?
        </q-card-section>
        <q-card-actions class="q-px-lg">
          <q-btn flat outline icon="fas fa-times" label="Отмена" v-close-popup @click="confirmDialog = false" />
          <q-space />
          <q-btn flat icon="far fa-trash-alt" label="Удалить" v-close-popup @click="deleteItem(confirm_Id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </div>
  </q-page>
</template>

<script>
export default {
  meta: {
    title: 'Список объявлений',
    titleTemplate: title => `${title} - QR-Board - доска объявлений`
  },
  name: 'PageAds',
  data: () => ({
    qrDialog: false,
    qrImgDialogSrc: '',
    confirmDialog: false,
    confirmId: null,
    confirm_Id: null,
    filter: '',
    loading: false,
    pagination: {
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 20
    },
    data: [],
    columns: [
      {
        name: 'number',
        label: 'Номер объявления',
        align: 'left',
        sortable: false,
        field: 'qrId'
      },
      {
        name: 'id',
        label: 'ID записи',
        align: 'left',
        sortable: false,
        field: '_id'
      },
      {
        name: 'date',
        label: 'Дата публикации',
        align: 'left',
        sortable: true,
        field: 'qrDate'
      }
    ]
  }),
  mounted () {
    this.getItems()
  },
  methods: {
    getItems () {
      this.$axios.get(process.env.VUE_APP_SERVER + '/api/records', {
      })
        .then(response => {
          this.data = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteItem (id) {
      this.confirmDialog = false
      this.$axios.delete(process.env.VUE_APP_SERVER + '/api/records/delete/' + id, {
      })
        .then(response => {
          console.log(response.data.state)
          this.getItems()
        })
        .catch(error => {
          console.log(error)
        })
    },
    confirm (id, _id) {
      this.confirmId = id
      this.confirm_Id = _id
      this.confirmDialog = true
    },
    viewQr (src) {
      this.qrImgDialogSrc = src
      this.qrDialog = true
    },
    dateToString (dat) {
      const date = new Date(dat)
      const days = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
      return days + '.' + month + '.' + date.getFullYear()
    }
  }
}
</script>

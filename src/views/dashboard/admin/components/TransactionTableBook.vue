<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Order_No" min-width="100">
      <template slot-scope="{row}">
        {{ row.id | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Jumlah" width="100" align="center">
      <template slot-scope="{row}">

        Rp.  {{ row.jumlah /100 }}
      </template>
    </el-table-column>
    <el-table-column label="saldo awal" width="190" align="center">
      <template slot-scope="{row}">

        Rp.  {{ row.saldo_awal /100 }}
      </template>
    </el-table-column>
    <el-table-column label="saldo_akhir" width="100" align="center">
      <template slot-scope="scope">
        Rp. {{ scope.row.saldo_akhir/100 | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="150" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.type | statusFilter">
          {{ row.type }}
        </el-tag>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { historyWitdraw } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Finish: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
    // orderNoFilter(str) {
    //   return str.substring(0, 30)
    // }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      historyWitdraw().then(response => {
        this.list = response.data.data.slice(0, 8)
      })
    }
  }
}
</script>

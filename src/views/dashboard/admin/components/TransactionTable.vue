<template>
  <el-table :data="list" style="width: 100%; padding-top: 15px">
    <el-table-column label="Order_No" min-width="100">
      <template slot-scope="{ row }">
        {{ row.id | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Fleet" width="100" align="center">
      <template slot-scope="{ row }">
        {{ row.fleet }}
      </template>
    </el-table-column>
    <el-table-column label="Notes" width="190" align="center">
      <template slot-scope="{ row }">
        {{ row.notes }}
      </template>
    </el-table-column>
    <el-table-column label="Price" width="100" align="center">
      <template slot-scope="scope">
        Rp. {{ (scope.row.harga / 100) | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="150" align="center">
      <template slot-scope="{ row }">
        <el-tag :type="row.status_transaksi | statusFilter">
          {{ row.status_transaksi }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="action" min-width="100">
      <template slot-scope="{ row }">
        <!-- <el-button
          v-if="row.status == '1'"
          size="mini"
          type="primary"
          @click="(row.id)"
          >Accept</el-button
        > -->
        <el-button
          v-if="row.status == '12'"
          size="mini"
          type="primary"
          @click="finishttrx(row.id)"
          >Finish</el-button
        >
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { historyList, Accept, bookList,Finish } from "@/api/remote-search";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        Finish: "success",
        pending: "danger",
      };
      return statusMap[status];
    },
    // orderNoFilter(str) {
    //   return str.substring(0, 30)
    // }
  },
  data() {
    return {
      list: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      bookList().then((response) => {
        if( response.data.data.length == 0){
        historyList().then((response) => {
          this.list = response.data.data.slice(0, 8);
        });
      }else{
        this.list = response.data.data.slice(0, 8);
      }
      });
    },
    accepttrx(id_transaksi) {
      Accept(id_transaksi).then((response) => {
        this.$swal(response.data.message);
        if (response.data.message == "berhasil") {
          window.location.reload();
        }
      });
    },
    finishttrx(id_transaksi) {
      Finish(id_transaksi).then((response) => {
        this.$swal(response.data.message);
        if (response.data.message == "berhasil") {
          window.location.reload();
        }
      });
    }
  },
};
</script>

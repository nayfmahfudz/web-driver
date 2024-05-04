<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('saldo')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Saldo
          </div>
          <count-to :start-val="0" :end-val="data.saldo" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('saldotrx')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Saldo TRX
          </div>
          <count-to :start-val="0" :end-val="data.saldotrx" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-button v-if="user.absen == 'N' && user.pool == '1'" :xs="12" :sm="12" :lg="6" size="extra large" type="danger" @click="absenmasuk('Y')">Absen</el-button>
    <el-button v-if="user.absen == 'Y' && user.pool == '1'" :xs="12" :sm="12" :lg="6" size="extra large" type="success" @click="absenmasuk('N')">Cancel</el-button>
    <el-button v-if=" user.status_config == '1'" :xs="12" :sm="12" :lg="6" size="extra large" type="success" @click="onlinedriver(false)">ONLINE</el-button>
    <el-button v-if="user.status_config == '4'" :xs="12" :sm="12" :lg="6" size="extra large" type="danger" @click="onlinedriver(true)">OFFLINE</el-button>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { absen, online } from '@/api/remote-search'
let user = JSON.parse(localStorage.user)
export default {
  components: {
    CountTo
  },
  props: ['data'],
  data() {
    return {
      user: { absen: user.absen,
        status_config: user.status_config,
        pool: user.pool }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    onlinedriver(status) {
      online(status).then((response) => {
        this.$swal(response.data.message)
        user = JSON.parse(localStorage.user)
        this.user.status_config = response.data.data
      })
    },
    absenmasuk(status) {
      absen(status).then((response) => {
        this.$swal(response.data.message)
        user = JSON.parse(localStorage.user)
        this.user.absen = response.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

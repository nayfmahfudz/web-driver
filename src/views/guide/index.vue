<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Topup</h3>
      </div>
      <el-dropdown class="title-container" trigger="click">
        <el-button plain>
          {{ witdraw.value }}<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border">
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :command="item.value"
            @click.native="type(item)"
          >
            {{ item.value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <br></br>

      <el-tooltip>
        <el-form-item prop="jumlah">
          <span class="svg-container" />
          <el-input
            v-model="witdraw.amount"
            placeholder="jumlah"
            name="jumlah"
            type="number"
          />
        </el-form-item>
      </el-tooltip>
      <el-button @click="submit(witdraw)">Submit</el-button>
    </el-form>
    <div id="terakhir" hidden class="title-container">
      <h3 class="title">jumlah terakhir {{ last }}</h3>
    </div>
  </div>
</template>

<script>
import { Witdraw } from '@/api/remote-search'

export default {
  name: 'Witdraw',
  components: {},
  data() {
    return {
      last: '0',
      witdraw: {
        bank: '',
        card: 'QRIS STATIC',
        nama: '',
        amount: '0',
        type: 'topupqris',
        value: 'TOPUP QRIS'
      },
      sizeOptions: [{
        bank: '',
        card: 'QRIS STATIC',
        nama: '',
        type: 'topupqris',
        value: 'TOPUP QRIS'
      },
      // {
      //   bank: "dari Transation Wallet",
      //   card: "Wallet",
      //   nama: "Wallet",
      //  type:"topup",
      //   value:"TOPUP DEPOSIT",
      // },
      {
        bank: 'dari Transation Wallet',
        card: 'Wallet',
        nama: 'Wallet',
        type: 'topuptrx',
        value: 'TOPUP Saldotrx to Saldo'
      }]
    }
  },
  methods: {
    type(type) {
      this.witdraw = type
    },
    submit(witdraw) {
      Witdraw(witdraw).then((response) => {
        localStorage.witdraw = JSON.stringify(response.data)
        document.getElementById('terakhir').hidden = false
        this.last = response.data.amount

        if (response.data.message == 'success') {
          this.$swal.fire({
            title: response.data.message,
            html: 'Transfer sejumlah Rp. ' + response.data.amount + ' Sebelum ' + response.data.expired,
            confirmButtonText: 'OK'
          })
          // this.$swal(response.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

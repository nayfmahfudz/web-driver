<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Witdraw</h3>
      </div>

      <el-form-item prop="Bank">
        <span class="svg-container" />
        <el-input
          v-model="witdraw.bank"
          placeholder="Nama BANK"
          name="bank"
          type="text"
        />
      </el-form-item>

      <el-tooltip>
        <el-form-item prop="card">
          <span class="svg-container" />
          <el-input
            v-model="witdraw.card"
            placeholder="No  Rekening"
            name="Rekening"
            type="number"
          />
        </el-form-item>
      </el-tooltip>
      <el-tooltip>
        <el-form-item prop="nama">
          <span class="svg-container" />
          <el-input
            v-model="witdraw.nama"
            placeholder="Atas Nama "
            name="nama"
            type="text"
          />
        </el-form-item>
      </el-tooltip>
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
      <el-button
        @click="submit(witdraw)"
      >Submit</el-button>
    </el-form>

  </div>
</template>

<script>
import { Witdraw } from '@/api/remote-search'

export default {
  name: 'Witdraw',
  components: { },
  data() {
    return {
      witdraw: {
        bank: '',
        card: '',
        nama: '',
        amount: '0',
        type: 'withdraw'
      }
    }
  },
  methods: {
    submit(witdraw) {
      Witdraw(witdraw).then((response) => {
        this.$swal(response.data.message)
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


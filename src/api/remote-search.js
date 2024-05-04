import request from '@/utils/request'
import data from '@/views/pdf/content'
import axios from 'axios'
import { Header } from 'element-ui'
const user = JSON.parse(localStorage.user)
const auth = {
  username: 'test',
  password: 'test'
}
const header = {
  headers: {
    auth,
    'Access-Control-Allow-Credentials': '*',
    'Access-Control-Allow-Headers':
      'Content-Type, Content-Length, Accept-Encoding',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Content-Encoding': ' gzip',
    'Content-Type': 'application/json; charset=utf-8'
  }
}
export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}
export function historyWitdraw() {
  const data = JSON.stringify({ id: user.id })
  const result = axios.post(
    `https://api.smartrans.id/root/api/driver/wallettrx`,
    data
  )
  update()
  return result
}
export function historyList() {
  const data = JSON.stringify({ id: user.id })
  const result = axios.post(
    `https://api.smartrans.id/root/api/driver/history_progress`,
    data
  )
  update()
  return result
}

export function bookList() {
  const data = JSON.stringify({ id: user.id })
  const result = axios.post(
    `https://api.smartrans.id/root/api/driver/book_progress`,
    data
  )
  update()
  return result
}
export function Accept(id_transaksi) {
  const data = JSON.stringify({ id: user.id, id_transaksi: id_transaksi })
  const result = axios.post(`https://api.smartrans.id/root/api/driver/accept`, data)
  update()
  return result
}
export function Finish(id_transaksi) {
  const data = JSON.stringify({ id: user.id, id_transaksi: id_transaksi })
  const result = axios.post(`https://api.smartrans.id/root/api/driver/finish`, data)
  update()
  return result
}
export function Witdraw(witdraw) {
  const data = JSON.stringify({
    id: user.id,
    'bank': witdraw.bank,
    'nama': witdraw.nama,
    'amount': witdraw.amount * 100,
    'card': witdraw.card,
    'email': user.email,
    'no_telepon': user.no_telepon,
    'type': witdraw.type
  })
  const result = axios.post(`https://api.smartrans.id/root/api/driver/withdraw`, data)
  update()
  return result
}
export function absen(absen) {
  const data = JSON.stringify({
    id: user.id,
    'absen': absen
  })
  const result = axios.post(`https://api.smartrans.id/root/api/driver/absen`, data)
  update()
  return result
}
export function online(absen) {
  const data = JSON.stringify({
    id: user.id,
    'is_turn': absen
  })
  const result = axios.post(`https://api.smartrans.id/root/api/driver/turning_on`, data)
  update()
  return result
}
function update() {
  const data = JSON.stringify({ no_telepon: user.no_telepon })
  return axios
    .post(
      `https://api.smartrans.id/root/api/driver/cekdriver`,
      data
    ).then((response) => {
      localStorage.user = JSON.stringify(response.data.data[0])
    })
}

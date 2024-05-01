import request from "@/utils/request";
import data from "@/views/pdf/content";
import axios from "axios";
let user = JSON.parse(localStorage.user);
const header = {
  headers: {
    Authorization: "basic",
    "Access-Control-Allow-Credentials": "*",
    "Access-Control-Allow-Headers":
      "Content-Type, Content-Length, Accept-Encoding",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Content-Encoding": " gzip",
    "Content-Type": "application/json; charset=utf-8",
  },
};
export function searchUser(name) {
  return request({
    url: "/vue-element-admin/search/user",
    method: "get",
    params: { name },
  });
}

export function transactionList(query) {
  return request({
    url: "/vue-element-admin/transaction/list",
    method: "get",
    params: query,
  });
}
export function historyWitdraw() {
  update();
  const data = JSON.stringify({ id: user.id });
  return axios.post(
    `https://api.smartrans.id/root/api/driver/wallettrx`,
    data
  );
}
export function historyList() {
  update();
  const data = JSON.stringify({ id: user.id });
  return axios.post(
    `https://api.smartrans.id/root/api/driver/history_progress`,
    data
  );
}

export function bookList() {
  update();
  const data = JSON.stringify({ id: user.id });
  return axios.post(
    `https://api.smartrans.id/root/api/driver/book_progress`,
    data
  );
}
export function Accept(id_transaksi) {
  update();
  const data = JSON.stringify({ id: user.id, id_transaksi: id_transaksi });
  return axios.post(`https://api.smartrans.id/root/api/driver/accept`, data);
}
export function Finish(id_transaksi) {
  update();
  const data = JSON.stringify({ id: user.id, id_transaksi: id_transaksi });
  return axios.post(`https://api.smartrans.id/root/api/driver/finish`, data);
}
export function Witdraw(witdraw) {
  update();
  const data = JSON.stringify({
    id: user.id,
    "bank": witdraw.bank,
    "nama": witdraw.nama,
    "amount": witdraw.amount*100,
    "card":witdraw.card,
    "email": user.email,
    "no_telepon": user.no_telepon,
    "type": "withdraw"
});
  return axios.post(`https://api.smartrans.id/root/api/driver/withdraw`, data);
}
 function update() {
  const data = JSON.stringify({ no_telepon: user.no_telepon});
  return axios
  .post(
    `https://api.smartrans.id/root/api/driver/login`,
    data
  ).then((response) => {
      localStorage.user = JSON.stringify(response.data.data[0]);
  });
}
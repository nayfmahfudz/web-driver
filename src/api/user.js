import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/dev-api/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/dev-api/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/dev-api/vue-element-admin/user/logout',
    method: 'post'
  })
}

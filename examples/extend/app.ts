import axios from '../../src'
import { AxiosRequestConfig } from '../../src/types'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello axios.request'
  }
})

axios.get('/extend/get', { params: { a: 1 } } as AxiosRequestConfig)

axios.options('/extend/options', { params: { b: 2, jack: '111' } } as AxiosRequestConfig)

axios.delete('/extend/delete', { params: { c: 3 } } as AxiosRequestConfig)

axios.head('/extend/head', { params: { d: 4 } } as AxiosRequestConfig)

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch', { msg: 'patch' })


// 函数重载 demo
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi normal'
  }
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi function reload'
  }
})

// 响应数据支持泛型 demo
// interface ResponseData<T=any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/extend/user')
//     .then(res => res.data)
//     .catch(err => console.error(err))
// }

// async function test() {
//   const user = await getUser<User>()
//   if (user) {
//     console.log(user.result.name)
//   }
// }
// test()
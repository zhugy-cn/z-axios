import axios from '../../src/index'

axios({
  url: '/error/get1',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch(err => {
  // console.log(err)
  // console.log(err.message)
  // console.log(err.config)
  // console.log(err.code)
  // console.log(err.request)
  // console.log(err.isAxiosError)
})

axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch(err => {
  // console.log(err)
})

// setTimeout(() => {
//   axios({
//     url: '/error/get',
//     method: 'get'
//   }).then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// }, 5000)


// axios({
//   url: '/error/timeout',
//   method: 'get',
//   timeout: 2000
// }).then(res => {
//   console.log(res)
// }).catch((err: AxiosError) => {
//   console.log(err.message)
//   console.log(err.config)
//   console.log(err.code)
//   console.log(err.request)
//   console.log(err.isAxiosError)
// })
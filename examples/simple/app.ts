import axios from '../../src/index'

axios({
  method: 'post',
  url: '/simple/get?dd=2#',
  params: {
    a: 1,
    b: 2,
    c: [3, 4],
    d: {
      name: 'jack'
    },
    date: new Date(),
    e: null,
    f: undefined,
    g: '@:$, ',
  },
  data: {
    name: 'jack',
    age: 24,
  }
})



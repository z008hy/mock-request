module.exports = (Mock) => ({
  url: '/request',
  method: 'get',
  data: (ctx) => {
    return Mock.mock({
      'items|10': [
        {
          id: '@id',
          method: '@pick(["get", "post", "delete", "put"])',
          URL: '@url()',
          'headers|0-9': {
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'Server-IP': '@ip()',
          },
          'params|0-9': {
            index: 1,
            size: 10,
            method: 'get'
          },
          body: '@paragraph',
        },
      ],
      current: Number(ctx.query.current),
      pageSize: 10,
      'total|10-100': 1
    })
  }
})

'use strict'
const OSS = require('ali-oss')

const isProduction = process.env.NODE_ENV === 'production'
// if (env === 'production') useBucket = 'greenlink-public'
// if (env === 'dev') useBucket = 'greenlink-dev'
// if (env === 'test') useBucket = 'green-public-test'
const useBucket = isProduction ? 'greenlink-public' : 'greenlink-dev'

const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAIv4Do6QRF08Wn',
  accessKeySecret: 'jZIgd0rh8NTlfrfk4GmlezKVBlZenj',
  bucket: useBucket
})

export default client

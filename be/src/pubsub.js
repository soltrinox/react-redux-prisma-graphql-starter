import {RedisPubSub} from 'graphql-redis-subscriptions'
import config from '@packages/config'
import Redis from 'ioredis'

const options = {
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000)
  }
}

const pubsub = new RedisPubSub(
  process.env.NODE_ENV === 'production'
    ? {
        publisher: new Redis(options),
        subscriber: new Redis(options)
      }
    : {}
)

export default pubsub

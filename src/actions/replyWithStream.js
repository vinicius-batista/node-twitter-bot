const Reply = require('../schemas/reply')

const baseParams = {
  track: 'to:TwinPeaksBotNew',
  result: 'recent'
}

const addParams = (params, reply) => {
  const trackToConcat = ', ' + reply.track
  return { ...params, track: params.track + trackToConcat }
}

const replyWithStreamModule = (Twitter) =>
  Reply
    .find()
    .then((replys) => {
      const params = replys.reduce(addParams, baseParams)

      const stream = Twitter.stream('statuses/filter', params)

      stream.on('tweet', (event) => {
        const indice = event.text.indexOf('!')
        const track = event.text.slice(indice)

        return Reply
          .findOne({ track })
          .then((reply) => {
            const status = '@' + event.user.screen_name + ' ' + reply.text

            const message = {
              status,
              in_reply_to_status_id: event.id_str || undefined
            }

            return Twitter.post('/statuses/update', message)
          })
          .then((result) => {
            stream.stop()
            stream.start()
          })
          .catch(console.log)
      })
    })
    .catch(console.log)

module.exports = replyWithStreamModule

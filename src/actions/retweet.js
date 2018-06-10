const Retweet = require('../schemas/retweet')

const baseParams = {
  q: '',
  result_type: 'recent',
  lang: 'en'
}

const addParams = (params, retweet) => ({
  ...params,
  q: params.q + retweet.params
})

const retweetModule = (Twitter) => {
  const retweet = () =>
    Retweet
      .find({})
      .then((retweets) => {
        const params = retweets.reduce(addParams, baseParams)
        return Twitter.get('search/tweets', params)
      })
      .then((result) => {
        const retweetId = result.data.statuses[1].id_str

        return Twitter.post('statuses/retweet/:id', { id: retweetId })
      })
      .catch(console.log)

  retweet()
  setInterval(retweet, 900000)
}

module.exports = retweetModule

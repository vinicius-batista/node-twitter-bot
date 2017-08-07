const Retweet = require('./../schemas/retweet');

module.exports = function (Twitter) {
    function retweet() {
        Retweet
            .find({
            
            })
            .then(function (retweets) {
                let params = {
                    q: '',
                    result_type: 'recent',
                    lang: 'en'
                };
                
                for(let i = 0; i < retweets.length; i++){
                    if(i === 0){
                        params.q = retweets[i].params;
                    }
                    else{
                        params.q.concat(', '+retweets[i].params);
                    }
                }
                
                Twitter
                    .get('search/tweets', params)
                    .then(function (result) {
                        let retweetId = result.data.statuses[1].id_str;
                        Twitter
                            .post('statuses/retweet/:id', {
                                id: retweetId
                            })
                            .then(function (result) {
                            })
                            .catch(function (err) {
                                return err;
                            });
                    })
                    .catch(function (err) {
                        return err;
                    });
            })
            .catch(function (err) {
                return err;
            });
    
    }
    
    retweet();
    setInterval(retweet, 900000);
    
};

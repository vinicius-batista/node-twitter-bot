const Retweet = require('./../schemas/retweet');

const retweetModule = (Twitter) => {
    const retweet = () => {
        Retweet
            .find({})
            .then( (retweets) => {
                let params = {
                    q: '',
                    result_type: 'recent',
                    lang: 'en'
                };
                
                params.q += retweets.map( retweet => retweet.params);
                
                Twitter
                    .get('search/tweets', params)
                    .then( (result) => {
                        
                        let retweetId = result.data.statuses[1].id_str;
                        
                        Twitter
                            .post('statuses/retweet/:id', {
                                id: retweetId
                            })
                            .then( result => result )
                            .catch( err => err);
                    })
                    .catch( err => err);
            })
            .catch( err => err );
        
    };
    
    retweet();
    setInterval(retweet, 900000);
    
};

module.exports = retweetModule;
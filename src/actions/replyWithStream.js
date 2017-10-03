const Reply = require('./../schemas/reply');

const replyWithStreamModule = (Twitter) => {
    Reply
        .find()
        .then( (replys) => {
            let params = {
                track: 'to:TwinPeaksBotNew',
                result: 'recent'
            };
            
            replys.forEach((reply)=>{
                
                const trackToConcat = ', ' + reply.track;
                params.track = params.track + trackToConcat;
                
            });
            
            console.log(params);
            
            let stream = Twitter.stream('statuses/filter', params);
            
            stream.on('tweet',  (event) => {
                const indice = event.text.indexOf('!');
                const track = event.text.slice(indice);
                
                Reply
                    .findOne({
                        track: track
                    })
                    .then( (reply) => {
                        const status = '@' + event.user.screen_name + ' ' + reply.text;
                        
                        const message = {
                            status: status,
                            in_reply_to_status_id: event.id_str || undefined
                        };
                        
                        Twitter
                            .post('/statuses/update', message)
                            .then( (result) => {
                                
                                stream.stop();
                                stream.start();
                                
                            })
                            .catch(err => err);
                        
                    })
                    .catch(err => err);
            });
            
        })
        .catch(err => err);
};

module.exports = replyWithStreamModule;
const Reply = require('./../schemas/reply');

module.exports = function (Twitter) {
    Reply
        .find({
            enable: true
        })
        .then(function (replys) {
            let params = {
                track: 'to:TwinPeaksBotNew',
                result: 'recent'
            };
            for(let i = 0; i < replys.length; i++){
                params.track = params.track +', ' + replys[i].track;
            }
            
            let stream = Twitter.stream('statuses/filter', params);

            stream.on('tweet', function (event) {
                let indice = event.text.indexOf('!');
                let track = event.text.slice(indice);
                
                Reply
                    .findOne({
                        track: track
                    })
                    .then(function (reply) {
                        let status = '@' + event.user.screen_name + ' ' + reply.text;
                        
                        let message = {
                            status: status,
                            in_reply_to_status_id: event.id_str || undefined
                        };

                        Twitter
                            .post('/statuses/update', message)
                            .then(function (result) {
                                stream.stop();
                                stream.start();
                            })
                            .catch(function (err) {
                                return err;
                            });

                    })
                    .catch(function (err) {
                        return err;
                    });
            });
       
        })
        .catch(function (err) {
            return err;
        });
    
    
};

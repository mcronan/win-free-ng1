// expose our config directly to our application using module.exports

module.exports = {

    'facebookAuth' : {
        'clientID'      : '680909698714083', // your App ID
        'clientSecret'  : 'd05d6bbbf361b3cd09ecf4e5694c8d1a', // your App Secret
        'callbackURL'   : 'http://localhost:3500/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
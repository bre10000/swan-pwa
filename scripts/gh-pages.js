const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/<your-app-name>',
    {
        branch: 'main',
        repo: 'https://github.com/bre10000/swan-pwa.git',
        user: {
            name: 'bre10000',
            email: 'burukaddis@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
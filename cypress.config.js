const {defineConfig } = require('cypress');
const jp = require('jsonpath');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://cat-fact.herokuapp.com',
        setupNodeEvents(on, config) {
            on('task', {
                jpquery: ({data, query}) => {
                    return jp.query(data, query);
                },
            });
        },
    },
});

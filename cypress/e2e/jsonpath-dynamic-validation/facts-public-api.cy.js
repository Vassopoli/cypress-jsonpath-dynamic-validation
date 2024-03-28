const validationList = [
    { customJPQuery: '$..source', customAssertion: 'have.length', customValue: 5 },
    { customJPQuery: '$..[?(@.used == true)]._id', customAssertion: 'have.any', customValue: '5887e1d85c873e0011036889' },
    { customJPQuery: '$..source', customAssertion: 'deep.eq', customValue: JSON.parse('["user", "user", "user", "user", "user"]') },
]

describe('Facts Public API', () => {
    context('GET /facts', () => {
        it('should return a list of facts', () => {
            cy.request({
                method: 'GET',
                url: '/facts'
            }).then((response) => {
                validationList.forEach((item) => {
                    cy.task('jpquery', { data: response.body, query: item.customJPQuery })
                    .should(item.customAssertion, item.customValue)
                })
            })
        })
    })
})
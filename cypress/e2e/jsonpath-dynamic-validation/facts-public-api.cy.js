const validationList = [
    { customJPQuery: '$..source', customAssertion: 'have.length', customValue: 5 },
    { customJPQuery: '$..[?(@.used == true)]._id', customAssertion: 'include', customValue: '5887e1d85c873e0011036889' },
    { customJPQuery: '$.._id', customAssertion: 'have.ordered.members', customValue: JSON.parse('["58e00b5f0aac31001185ed24", "5887e1d85c873e0011036889", "58e008780aac31001185ed05", "58e009390aac31001185ed10", "58e00af60aac31001185ed1d"]') },
    { customJPQuery: '$..source', customAssertion: 'deep.eq', customValue: JSON.parse('["user", "user", "user", "user", "user"]') },
    { customJPQuery: '$[0].status.sentCount', customAssertion: 'have.all', customValue: 1 },
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
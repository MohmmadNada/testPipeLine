describe('test API ',()=>{
    it('happy path ',()=>{
        cy.request({ // case 1 : 
            url:'https://api.nomics.com/v1/currencies/ticker',
            qs: {
                key: "a1cb5c658f5871864a9c1f4e48262066374a2c66",
                ids:'BTC',
                interval:'1d,30d',
                convert:'EUR',
                'per-page':'1',
            }
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
        })
    })

    it('Incorrect Key ',()=>{
        cy.wait(2000);
        cy.request({
            url:'https://api.nomics.com/v1/currencies/ticker',
            failOnStatusCode:false,
            qs: {
                key: "a1cb5c658f5871864a9c1f4e4826206637466",
                ids:'BTC',
                interval:'1d,30d',
                convert:'EUR',
                'per-page':'1',
            }
        }).should((resp)=>{
            expect(resp.status).to.eq(401)
        })
    })
    it('test specific response  only  ETH',()=>{
        cy.wait(2000);
        cy.request({
            url:'https://api.nomics.com/v1/currencies/ticker',
            qs: {
                key: "a1cb5c658f5871864a9c1f4e48262066374a2c66",
                ids:'ETH',
                interval:'1d,30d',
                convert:'EUR',
                'per-page':'3',
            }
        }).then((resp)=>{
            // cy.log(resp.currency)
            resp.body.forEach((item)=>{
                expect(item).to.have.property('currency','ETH')
                expect(resp.body.length).to.eq(1)
            })
        })
    })
    it('test 30d not available ',()=>{
        cy.wait(2000);
        cy.request({
            url:'https://api.nomics.com/v1/currencies/ticker',
            qs:{
                key: "a1cb5c658f5871864a9c1f4e48262066374a2c66",
                ids:'ETH',
                interval:'1d',
                convert:'EUR',
                'per-page':'3',
            }
        })
        .then((resp)=>{
            resp.body.forEach((items)=>{
                expect(items).to.not.have.property('30d') // true

            })
        })
    })
})
let  firstPrice;
let  secondPrice;
    it('test price change depands on convert from US EUR',()=>{
        cy.wait(2000);
        cy.request({
            url:'https://api.nomics.com/v1/currencies/ticker',
            qs: {
                            key: "a1cb5c658f5871864a9c1f4e48262066374a2c66",
                            ids:'ETH',
                            interval:'1d,30d',
                            convert:'EUR',
                            'per-page':'3',
                }
    }).then((resp)=>{
        firstPrice = resp.body[0].price
    })
    cy.wait(2000);

    cy.request({
        url:'https://api.nomics.com/v1/currencies/ticker',
        qs: {
                        key: "a1cb5c658f5871864a9c1f4e48262066374a2c66",
                        ids:'ETH',
                        interval:'1d,30d',
                        convert:'USD',
                        'per-page':'3',
                    }
}).then((resp)=>{
    secondPrice = resp.body[0].price
    expect(secondPrice).to.not.eq(firstPrice)
})
})

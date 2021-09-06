const { get } = require("superagent");
describe('test all atricle from api',()=>{
    before(()=>{
        cy.visit('/pictures/feki45eieki/the-toughest-jobs-to-fil/?sh=110d459426c2')
    })
    it.skip('article from api ? ',()=>{
        let readyResp;
        cy.request('https://storage.googleapis.com/bacon-forbes-prd/skybox/payload.json').then((response)=>{
            expect(response.status).to.eq(200)
            readyResp = JSON.parse(response.body)
            expect(readyResp).to.have.property('length').to.eq(21)
        })
        cy.get('.happening__title')
        .each(($el, index, $list)=>{
            let indexArt = index + 18 
            if (indexArt<=20){
                cy.get($el).should('have.attr','href',readyResp[indexArt].uri)
            }else{
                let newIndexArt = indexArt -21
                cy.get($el).should('have.attr','href',readyResp[newIndexArt].uri)
            }
        })
    })
    it('test article from api part2 ',()=>{
        let readyResp;
        cy.request("https://bacon.forbes.com/bacon-forbes-prd/most-popular-galleries-1yr/payload.json")
            .then((allResp)=>{
            readyResp = allResp.body
            expect(allResp.status).to.eq(200)
        })
        cy.get('.grid__item').each(($el,index)=>{
            cy.get($el).within(()=>{
                cy.get('.grid__image').should('have.attr','href',readyResp[index].uri)
                cy.get('.grid__title-text').should('have.text',readyResp[index].title)
            })
        })
    })
})

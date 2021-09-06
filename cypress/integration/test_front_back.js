
describe('test Name and description', () => {
    // before(()=>{
    //     cy.visit('https://www.forbes.com/digital-assets/exchanges/bittrex')
    // })
    it.skip('test the name from the api ',() => {
        let NameArticle;
        let descrobtionArticle;
        let imgSrc;
        cy.request({
            url: 'https://fda.forbes.com/content/exchange/bittrex',
        }).then(($resp) => {
            NameArticle = $resp.body.name
            descrobtionArticle = $resp.body.description
            imgSrc = $resp.body.logo
            expect($resp.status).to.eq(200)
            cy.get('.fda-profile-logo').within(($allDiv) => {
                cy.get('img').should('have.attr', 'src', imgSrc)
            })
            cy.get('.fda-public-name')
                .should('have.text', NameArticle)
            cy.get('.description-pargraph').should('have.text', descrobtionArticle)
        })
    })
    it.skip('tset first three article ', () => {
        let allArticles;
        cy.request({
            url: 'https://fda.forbes.com/newsfeed',
        }).then(($resp) => {
            expect($resp.status).to.equal(200)
            allArticles = JSON.parse($resp.body)
            allArticles = allArticles.newsFeedItems
            cy.get('.profile-sidebar__articles-items>a').each((element, index) => {
                cy.get(element).should('have.text', allArticles[index].title)
            })
        })
    })
    it.skip('test price with slug', () => {
        let displaySymbolArr = [];
        let nameArr = [];
        let priceArr = [];
        let finalText = [];
        let Body;
        cy.request({
            url: 'https://fda.forbes.com/related-cryptos/24h/bittrex',
        }).then(($resp) => {
            expect($resp.status).to.eq(200)
            Body = JSON.parse($resp.body)
            // cy.log(Body) // array with 7 items , all items  
            for (let i = 0; i < Body.length; i++) {
                if (Body[i].slug != '') {
                    let displaySymbol = Body[i].displaySymbol.toUpperCase()
                    let NameCompany = Body[i].name
                    let stringFinal = NameCompany + ' (' + displaySymbol + ')';
                    nameArr.push(Body[i].name)
                    finalText.push(stringFinal)
                }
            }
            cy.get('.crypto-link').each((element, index) => {
                cy.get(element).should('text', finalText[index])
            })
        })
    })
    it.skip('practice intercept', () => {
        cy.intercept("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
        ,
        {
            "squadName": "Super Hero Squad",
            "homeTown": "Metro City",
            "formed": 2020,
            "secretBase": "Super tower",
            "active": true,
            "members": [
            {
            "name": "Molecule Man",
            "age": 55,
            "secretIdentity": "Dan Jukes",
            "powers": [
            "Radiation resistance",
            "Turning tiny",
            "Radiation blast"
            ]
            },
            {
            "name": "Madame Uppercut",
            "age": 39,
            "secretIdentity": "Jane Wilson",
            "powers": [
            "Million tonne punch",
            "Damage resistance",
            "Superhuman reflexes"
            ]
            },
            {
            "name": "Eternal Flame",
            "age": 1000000,
            "secretIdentity": "Unknown",
            "powers": [
            "Immortality",
            "Heat Immunity",
            "Inferno",
            "Teleportation",
            "Interdimensional travel"
            ]
            }
            ]
            }).as('resp')
        cy.visit('https://mdn.github.io/learning-area/javascript/oojs/json/heroes-finished.html')
        cy.get('@resp').then(($resp)=>{
            $resp
        })
})
    it.skip('test intercept forbes , case 00 0  more than 0 ',()=>{
        cy.visit("https://www.forbes.com/digital-assets/exchanges/bittrex").then(()=>{ 
            cy.intercept('https://www.forbes.com/xignite/?identifier=CTXS',{
                "PercentChangeFromPreviousClose": 0.5,
                "Identifier": "CTXS"
            }).as('RespModified')
            cy.visit('https://www.forbes.com/sites/sergeiklebnikov/2020/04/16/here-are-29-get-out-and-go-stocks-for-the-end-of-coronavirus-quarantine/?sh=a9990db1a4fb')
            cy.wait('@RespModified').then((RespModified)=>{
                cy.contains('CTXS')
                .siblings(".percent-link").should('have.attr','aria-label',RespModified.response.body.Identifier)
                .within(($yieldedA)=>{
                    cy.get('span')
                    .should('have.class','ticker-green')
                })             
            })
        })
        })
    
    it.skip('test intercept forbes ; case less than 0 ',()=>{
        cy.intercept('https://www.forbes.com/xignite/?identifier=CTXS',{
            "PercentChangeFromPreviousClose": -0.5,
            "Identifier": "CTXS"
        }).as('RespModified')
        cy.visit('https://www.forbes.com/sites/sergeiklebnikov/2020/04/16/here-are-29-get-out-and-go-stocks-for-the-end-of-coronavirus-quarantine/?sh=a9990db1a4fb')
        cy.wait('@RespModified').then((RespModified)=>{
                cy.contains('CTXS')
                .siblings(".percent-link").should('have.attr','aria-label',RespModified.response.body.Identifier)
                .within(($yieldedA)=>{
                        cy.get('span')
                        .should('have.class','ticker-red')
                         })   
                         //new line for stash           
        })
    })
})
import adsData from "/adsData.json"
import { filterProp } from "../helperFuns/helperCountAdsTest.js"
describe("test all ads in the page " , ()=>{
    before(()=>{
        cy.visit('/')
    })
    it('Test the ads objects property',()=>{
        let allAdsData = adsData.allAds
        let ads ;
        cy.scrollTo('bottom')
        cy.wait(5000).window().then((win)=>{
            if (win.fbsads.adSlots.size==10){
                ads = win.fbsads.adSlots
                for(let i = 0;i<allAdsData.length;i++){
                    let valObject = Object.values(allAdsData[i])[0][0] 
                    let objWindow = ads.get(valObject).getTargetingMap()
                    expect(allAdsData[i]).to.deep.equal(filterProp(allAdsData[i],objWindow))
                }
            }
        })
    })
})


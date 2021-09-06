// // wait until a cookie is set
// cy.waitUntil(() => cy.getCookie('token').then(cookie => Boolean(cookie && cookie.value)));

// // wait until a global variable has an expected value
// cy.waitUntil(() => cy.window().then(win => win.foo === "bar"));

// // sync function works too!
// cy.waitUntil(() => true);

// // with all the available options
// cy.waitUntil(() => cy.window().then(win => win.foo === "bar"), {
//   errorMsg: 'This is a custom error message', // overrides the default error message
//   timeout: 2000, // waits up to 2000 ms, default to 5000
//   interval: 500 // performs the check every 500 ms, default to 200
// });

describe('this test for config practcing',()=>{
    it('test one , check baseUrl',()=>{
    // wait until the Recaptcha token will be added to the dedicated hidden input field...
    cy.visit('/')
    cy.log('+++++++++++++++++++++++++++++++++++++++++')
    cy.waitUntil(() => cy.get("input[type=hidden]").then($el => $el.val()))
    // expect(token).to.be.a("string").to.have.length.within(1, 1000)
    .then(token => {
        expect('a').to.eq('a')
                    });
    cy.log('+++++++++++++++++++++++++++++++++++++++++')
    })
})
Cypress.Commands.add('typeLogin', (user) => {
  cy.get('#input-email').type(user.email);
  cy.get('#input-password').type(user.password);
});

Cypress.Commands.add('typeAdress', (user) => {
  cy.get('#input-payment-firstname').type(user.firstname);
  cy.get('#input-payment-lastname').type(user.lastname);
  cy.get('#input-payment-address-1').type(user.address);
  cy.get('#input-payment-city').type(user.city);
  cy.get('#input-payment-country').select(user.country);
  cy.get('#input-payment-zone').select(user.zone);
  cy.get('#button-payment-address').click();
});

describe('do the shopping', () => {
  before(() => {
    cy.visit('https://awesome-shop.ru/');
    cy.get('.fa.fa-th-large').click();
    cy.get('.list-unstyled').contains('Login').click();
    cy.typeLogin({ email: 'zibzik@mail.ru', password: 'timm' });
    cy.get('input[value="Login"]').click();
    cy.get('.img-responsive').click();
    cy.get('.caption').contains('Apple Cinema 30"').click();
    cy.contains('label', 'Large').click();
    cy.contains('label', 'Checkbox 3').click();
    cy.get('#input-option208').clear().type('Apple');
    cy.get('#input-option217').select('4');
    cy.get('#input-option209').type('Cypress');
    cy.get('#input-quantity').clear().type('4');
    cy.contains('Add to Cart').click();
  });
  it('display success added message to shopping cart', () => {
    cy.contains(
      'Success: You have added Apple Cinema 30" to your shopping cart!'
    ).should('be.visible');
    cy.contains('a', 'shopping cart').click();
  });
  it('selected options are applied', () => {
    cy.get('td[class="text-left"] a').should('have.text', 'Apple Cinema 30"');
    cy.get('.text-left > small').should(($small) => {
      expect($small).to.contain('Large');
      expect($small).to.contain('Checkbox 3');
      expect($small).to.contain('Apple');
      expect($small).to.contain('Red');
      expect($small).to.contain('Cypress');
    });
    cy.contains('Use Coupon Code').click();
    cy.get('#input-coupon').type('LuckyUser');
    cy.get('#button-coupon').click();
  });

  it('display success applied coupon message', () => {
    cy.contains('Success: Your coupon discount has been applied!').should(
      'be.visible'
    );
  });

  it('VAT 20% is calculated correctly', () => {
    cy.get(
      '#content > div.row > div > table > tbody > :nth-child(3) > :nth-child(2)'
    )
      .invoke('text')
      .then((text) => +text.replace('$', ''))
      .then((initial) => {
        cy.get(
          '#content > div.row > div > table > tbody > :nth-child(1) > :nth-child(2)'
        )
          .invoke('text')
          .then((text) => +text.replace('$', ''))
          .should('to.be', initial / 1.2);
      });
    cy.get('a[class="btn btn-primary"]').click();
    cy.get('input[value="new"]').click();
    cy.typeAdress({
      firstname: 'Tsimur',
      lastname: 'Zibzibadze',
      address: 'Vasnetsova-34',
      city: 'Minsk',
      country: 'Belarus',
      zone: 'Horad Minsk',
    });
    cy.get('#button-shipping-address').click();
    cy.get('textarea[name="comment"]').type('fast delivery');
    cy.get('#button-shipping-method').click();
    cy.get('input[value="cod"]').click();
    cy.get('input[value="1"]').click();
    cy.get('#button-payment-method').click();
    cy.get('#button-confirm').click();
  });

  it('display success order message', () => {
    cy.contains('Your order has been placed!').should('be.visible');
    cy.contains('a', 'history').click();
    cy.get('a[href*="316"]').click();
  });

  it('order is exist in history of user', () => {
    cy.get('td[class="text-left"] a').should('have.text', 'Apple Cinema 30"');
    cy.get('.text-left > small').should(($small) => {
      expect($small).to.contain('Large');
      expect($small).to.contain('Checkbox 3');
      expect($small).to.contain('Apple');
      expect($small).to.contain('Red');
      expect($small).to.contain('Cypress');
    });
  });
});

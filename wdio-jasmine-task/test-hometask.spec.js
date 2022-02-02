let quantity = '7';
let city = 'Minsk';
let lastName = 'Zib';
let product = 'Apple';
let password = 'timm';
let firstName = 'Tsim';
let coupon = 'LuckyUser';
let comment = 'some comment';
let email = 'zibzik@mail.ru';
let address = 'vasnetsova 34';
let couponMessage = 'Success: Your coupon discount has been applied!';
let messageSuccessful = 'Your order has been placed!';

describe('LuckyUser coupon', () => {
  beforeAll('', async () => {
    await browser.url('https://awesome-shop.ru/');
    await $('//*[@id="myHeader"]/header//div[3]/button').click();
    await $('//*[@id="myHeader"]/header//li[2]/a').click();
    await $('//*[@id="input-email"]').setValue(email);
    await $('//*[@id="input-password"]').setValue(password);
    await $('//*[@id="content"]/div//form/input').click();
    await $('//*[@id="logo"]/a/img').click();
    await $('/html//div[3]/div/div[2]//h4/a').click();
    await $('//*[@id="input-quantity"]').setValue(quantity);
    await $('//*[@id="button-cart"]').click();
    await $('//*[@id="cart-total"]').click();
    await $('//*[@id="cart"]//li[2]//a[1]').click();
    await $('//*[@id="accordion"]//div[1]/h4/a').click();
    await $('//*[@id="input-coupon"]').setValue(coupon);
    await $('//*[@id="button-coupon"]').click();
  });

  it('should display message', async () => {
    const messageCoupon = await $('//*[@id="checkout-cart"]/div[1]');
    expect(messageCoupon).toHaveTextContaining(couponMessage);
  });

  it('should applied 15% discount', async () => {
    const total = await $('//*[@id="content"]/form//tbody//td[6]').getText();
    const subTotal = await $('//*[@id="content"]/div[2]/div//td[2]').getText();
    const totalWithoutDiscount = total.substr(1) * 0.75;
    expect(totalWithoutDiscount * 0.75).toHaveTextContaining(subTotal);
  });

  it('should display message of order placing', async () => {
    await $('//*[@id="content"]/div[3]/div[2]/a').click();
    await $('//*[@id="collapse-payment-address"]//div[3]//input').click();
    await $('//*[@id="input-payment-firstname"]').setValue(firstName);
    await $('//*[@id="input-payment-lastname"]').setValue(lastName);
    await $('//*[@id="input-payment-address-1"]').setValue(address);
    await $('//*[@id="input-payment-city"]').setValue(city);
    await $('//*[@id="input-payment-zone"]').click();
    await $('//*[@id="input-payment-zone"]/option[4]').click();
    await $('//*[@id="button-payment-address"]').click();
    await $('//*[@id="button-shipping-address"]').click();
    await $('//*[@id="collapse-shipping-method"]//textarea').setValue(comment);
    await $('//*[@id="button-shipping-method"]').click();
    await $('//*[@id="collapse-payment-method"]//div[2]//input').click();
    await $('//*[@id="collapse-payment-method"]//div[3]//input[1]').click();
    await $('//*[@id="button-payment-method"]').click();
    await $('//*[@id="button-confirm"]').click();
    const successfulMessage = await $('//*[@id="content"]/h1');
    expect(successfulMessage).toHaveTextContaining(messageSuccessful);
  });

  it('should order in history of current user', async () => {
    await $('//*[@id="content"]//a[2]').click();
    await $('//*[@id="content"]//tr[1]/td[7]/a').click();
    const orderProduct = await $(
      '//*[@id="content"]/div[1]/table/tbody/tr/td[1]'
    );
    expect(orderProduct).toHaveTextContaining(product);
  });
});

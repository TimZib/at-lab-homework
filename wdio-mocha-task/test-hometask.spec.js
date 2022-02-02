let shortText = 'apple';
let longText = 'apple, apple, apple';
let medium = 'Medium';
let checkboxTwo = 'Checkbox 2';
let checkboxFour = 'Checkbox 4';
let green = 'Green';
let quantityThree = '3';

describe('Apple Cinema', async () => {
  before('', async () => {
    await browser.url('https://awesome-shop.ru/');
    await $("//a[normalize-space()='Apple Cinema 30\"']").click();
    await $('//*[@id="input-option218"]/div[2]//input').click();
    await $('//*[@id="input-option223"]/div[2]//input').click();
    await $('//*[@id="input-option223"]/div[4]//input').click();
    await $('//*[@id="input-option217"]').click();
    await $('//*[@id="input-option208"]').setValue(shortText);
    await $('//*[@id="input-option217"]/option[4]').click();
    await $('//*[@id="input-option209"]').setValue(longText);
    await $('//*[@id="input-quantity"]').setValue(quantityThree);
    await $('//*[@id="button-cart"]').click();
    await $('//*[@id="cart-total"]').click();
    await $('//*[@id="cart"]//li[2]//a[1]').click();
  });

  it('should applied selected options', async () => {
    const mediaumRadio = await $(
      '//*[@id="content"]//div/table//td[2]/small[1]'
    );
    await expect(mediaumRadio).toHaveTextContaining(medium);
    const CheckboxTwoOption = await $(
      '//*[@id="content"]//table//td[2]/small[2]'
    );
    await expect(CheckboxTwoOption).toHaveTextContaining(checkboxTwo);
    const CheckboxFourOption = await $('//*[@id="content"]//tbody//small[3]');
    await expect(CheckboxFourOption).toHaveTextContaining(checkboxFour);
    const textShort = await $('//*[@id="content"]/form//small[4]');
    await expect(textShort).toHaveTextContaining(shortText);
    const textLong = await $('//*[@id="content"]/form//small[6]');
    await expect(textLong).toHaveTextContaining(longText);
    const greenMenu = await $('//*[@id="content"]/form//small[5]');
    await expect(greenMenu).toHaveTextContaining(green);
    const threeQuantity = await $('//*[@id="content"]/form//input');
    await expect(threeQuantity).toHaveValueContaining(quantityThree);
  });

  it('should VAT 20% calculate correctly', async () => {
    const subTotal = await $('//*[@id="content"]/div[2]//td[2]').getText();
    const vat = await $('//*[@id="content"]/div[2]//tr[2]/td[2]').getText();
    const total = await $('//*[@id="content"]/div[2]//tr[3]/td[2]').getText();

    const totalWithoutVat = total.substr(1) - vat.substr(1);

    expect(totalWithoutVat).toHaveValueContaining(subTotal);
  });
});

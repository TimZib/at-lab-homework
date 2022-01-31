const { Girl } = require('../unit-testing-task/Girl');
const { Boy } = require('../unit-testing-task/Boy');
const { expect, assert } = require('chai');
const { describe } = require('mocha');

let girl = new Girl();

describe('Girl mood', () => {
  it('should be excellent', () => {
    if (!girl.isBoyFriendWillBuyNewShoes())
      expect(girl.getMood()).to.equal('EXCELLENT');
  });

  it('should be good', () => {
    if (girl.isPretty() || girl.isBoyfriendRich())
      expect(girl.getMood()).to.equal('GOOD');

    // girl.isPretty() does not set as a function
  });

  it('should be neutral', () => {
    if (girl.isSlimFriendBecameFat())
      expect(girl.getMood()).to.equal('NEUTRAL');

    // in method girl.isSlimFriendBecameFat() function girl.isSlimFriendGotAFewKilos() does not set
  });

  // it('should be bad in other cases');
  // expect(girl.getMood()).to.equal('BAD');

  // how can i check bad mood in other cases?
});

describe('Girl boyfriend', () => {
  it('should spend money', () => {
    if (girl.isBoyfriendRich())
      expect(girl.spendBoyFriendMoney(girl.amountForSpending)).to.equal(
        girl.boyFriend.spendSomeMoney(girl.amountForSpending)
      );
  });

  // properti of 'spendSomeMoney' in method girl.spendBoyFriendMoney() does not set
});

describe('Girl boyfriend', () => {
  it('should be rich', () => {
    assert.equal(girl.isBoyfriendRich(), !girl.boyFriend?.isRich());
  });
});

describe('Girl boyfriend', () => {
  it('should buy new schoes', () => {
    if (girl.isBoyfriendRich() && girl.isPretty)
      assert.isTrue(girl.isBoyFriendWillBuyNewShoes());
  });
});

describe('Girl slim friend', () => {
  it('should became fat', () => {
    expect(girl.isSlimFriendBecameFat()).to.equal(
      girl.isSlimFriendGotAFewKilos() && !girl.isPretty
    );

    // in method girl.isSlimFriendBecameFat() function girl.isSlimFriendGotAFewKilos() does not set
  });
});

let boy = new Boy();

describe('Boy mood', () => {
  it('should be excellent', () => {
    if (boy.isRich() && boy.isPrettyGirlFriend() && boy.isSummerMonth())
      expect(boy.getMood()).to.equal('EXCELLENT');
  });

  it('should be good', () => {
    if (boy.isRich() && boy.isPrettyGirlFriend())
      expect(boy.getMood()).to.equal('GOOD');
  });

  it('should be neutral', () => {
    if (boy.isRich() || boy.isSummerMonth() || boy.isPrettyGirlFriend())
      expect(boy.getMood()).to.equal('NEUTRAL');

      //method toLowerCase() does not work in method boy.isSummerMonth()
  });

  // it('should be bad in other cases');
  // expect(boy.getMood()).to.equal('BAD');

  // how can i check bad mood in other cases?
});

describe('Boy', () => {
  it('should spend some money', () => {
    if (amountForSpending <= boy.wealth())
      expect(boy.spendSomeMoney(amountForSpending)).to.equal(
        (boy.wealth += amountForSpending)
      );
    else
      throw new Error(
        `Not enough money! Requested amount is ${amountForSpending}, but you can't spend more then ${boy.wealth}`
      );
  });

  // value 'amountForSpending' does not set
});

describe('Boy birthday', () => {
  it('should be summer month', () => {
    assert.equal(
      boy.isSummerMonth(),
      boy.birthdayMonth.toLowerCase() === 'JUNE' ||
        (boy.birthdayMonth.toUpperCase() === 'JULY' &&
          boy.birthdayMonth.toUpperCase() === 'AUGUST')
    );
  });

  //method toLowerCase() does not work
});

describe('Boy', () => {
  it('should be rich', () => {
    expect(boy.isRich()).to.satisfy((n) => n <= 100_000);
  });

  // ?
});

describe('Boy', () => {
  it('should have pretty girl friend', () => {
    expect(boy.isPrettyGirlFriend()).to.equal(boy.girlFriend?.isPretty);
  });
});

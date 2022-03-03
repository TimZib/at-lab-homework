const { Girl } = require('./Girl');
const { Boy } = require('./Boy');
const { expect, assert } = require('chai');
const { describe } = require('mocha');

let boy = new Boy();

describe('Boy', () => {
  it('should have proper getters and setters', () => {
    boy.birthdayMonth = 'April';
    boy.wealth = 1000;
    boy.girlFriend = new Girl();
    expect(boy.birthdayMonth).to.equal('April');
    expect(boy.wealth).to.equal(1000);
    expect(boy.girlFriend instanceof Girl).to.be.true;
  });

  it('should have proper getMood implementation', () => {
    const excellentMoodBoy = new Boy('August', 200_000);
    excellentMoodBoy.girlFriend = new Girl(true);
    expect(excellentMoodBoy.getMood()).to.be.deep.equal('EXCELLENT');

    const neutralMoodBoy = new Boy(150_000 || 'July');
    neutralMoodBoy.girlFriend = new Girl();
    expect(neutralMoodBoy.getMood()).to.deep.equal('NEUTRAL');

    const goodMoodBoy = new Boy(300_000);
    goodMoodBoy.girlFriend = new Girl(true);
    expect(goodMoodBoy.getMood()).to.deep.equal('GOOD');

    const badMoodBoy = new Boy('January', 95_000);
    badMoodBoy.girlFriend = new Girl(false);
    expect(badMoodBoy.getMood()).to.deep.equal('BAD');
  });

  it('should proper spendSomeMoney implementation', () => {
    boy.wealth = 120_000;
    expect(boy.spendSomeMoney(50_000)).to.equal(170_000);
    expect(boy.spendSomeMoney(200_000)).to.throw(Error);
  });

  it('should proper isSummerMonth implementation', () => {
    const boyBirthdayMonth = new Boy('June');
    expect(boyBirthdayMonth.isSummerMonth()).to.be.true;
  });

  it('should proper isRich implementation', () => {
    boy.wealth = 500_000;
    assert.isTrue(boy.isRich());
  });

  it('should proper isPrettyGirlFriend implementation', () => {
    boy.girlFriend = new Girl(true);
    assert.isTrue(boy.isPrettyGirlFriend());
  });
});

let girl = new Girl();

describe('Girl', () => {
  it('should have proper getters and setters', () => {
    girl.isPretty = true;
    girl.isSlimFriendGotAFewKilos = 2;
    girl.boyFriend = new Boy();
    expect(girl.isPretty).to.be.true;
    expect(girl.isSlimFriendGotAFewKilos).to.equal(2);
    expect(girl.boyFriend instanceof Boy).to.be.true;
  });

  it('should have proper getMood implementation', () => {
    girl.isPretty = true;
    girl.boyFriend = new Boy();
    expect(girl.getMood()).to.be.deep.equal('EXCELLENT');

    girl.boyFriend = new Boy();
    girl.isPretty = true;
    expect(girl.getMood()).to.deep.equal('GOOD');

    const neutralMoodGirl = new Girl(2);
    expect(neutralMoodGirl.getMood()).to.deep.equal('NEUTRAL');

    const badMoodGirl = new Girl();
    girl.isPretty = false;
    expect(badMoodGirl.getMood()).to.deep.equal('BAD');
  });

  it('should proper spendBoyFriendMoney implementation', () => {
    girl.boyFriend = new Boy();
    expect(girl.spendBoyFriendMoney(50_000)).to.equal(50_000);
  });

  it('should proper isBoyfriendRich implementation', () => {
    girl.boyFriend = new Boy();
    expect(girl.isBoyfriendRich()).to.be.true;
  });

  it('should proper isBoyFriendWillBuyNewShoes implementation', () => {
    girl.boyFriend = new Boy();
    girl.isPretty = true;
    assert.isTrue(girl.isBoyFriendWillBuyNewShoes());
  });

  it('should proper isSlimFriendBecameFat implementation', () => {
    girl.isPretty = false;
    assert.isTrue(girl.isSlimFriendBecameFat());
  });
});

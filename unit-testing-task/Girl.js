class Girl {
  constructor(isPretty, isSlimFriendGotAFewKilos) {
    this._isPretty = isPretty;
    this._isSlimFriendGotAFewKilos = isSlimFriendGotAFewKilos;
  }

  get isPretty() {
    return this._isPretty;
  }

  set isPretty(isPretty) {
    this._isPretty = isPretty;
  }

  get isSlimFriendGotAFewKilos() {
    return this._isSlimFriendGotAFewKilos;
  }

  set isSlimFriendGotAFewKilos(isSlimFriendGotAFewKilos) {
    this._isSlimFriendGotAFewKilos = isSlimFriendGotAFewKilos;
  }

  get boyFriend() {
    return this._boyFriend;
  }

  set boyFriend(boyFriend) {
    this._boyFriend = boyFriend;
  }

  // a bug - logical NOT (!) operator takes truth to falsity
  // a bug - this.isPretty set as a function
  getMood() {
    if (!this.isBoyFriendWillBuyNewShoes()) {
      return 'EXCELLENT';
    } else if (this.isPretty() || this.isBoyfriendRich()) {
      return 'GOOD';
    } else if (this.isSlimFriendBecameFat()) {
      return 'NEUTRAL';
    } else {
      return 'BAD';
    }
  }
  // a bug - no return in if statement
  spendBoyFriendMoney(amountForSpending) {
    if (this.isBoyfriendRich()) {
      this.boyFriend.spendSomeMoney(amountForSpending);
    }
  }
  // a bug - logical NOT (!) operator takes truth to falsity
  isBoyfriendRich() {
    return !this.boyFriend?.isRich();
  }

  isBoyFriendWillBuyNewShoes() {
    return this.isBoyfriendRich() && this.isPretty;
  }
// a bug - this.isSlimFriendGotAFewKilos set as a function
  isSlimFriendBecameFat() {
    return this.isSlimFriendGotAFewKilos() && !this.isPretty;
  }
}

module.exports = { Girl };

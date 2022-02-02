class Boy {
  constructor(birthdayMonth, wealth) {
    this._birthdayMonth = birthdayMonth;
    this._wealth = wealth;
  }

  get birthdayMonth() {
    return this._birthdayMonth;
  }

  set birthdayMonth(birthdayMonth) {
    this._birthdayMonth = birthdayMonth;
  }

  get wealth() {
    return this._wealth;
  }

  set wealth(wealth) {
    this._wealth = wealth;
  }

  get girlFriend() {
    return this._girlFriend;
  }

  set girlFriend(girlFriend) {
    this._girlFriend = girlFriend;
  }

  getMood() {
    if (this.isRich() && this.isPrettyGirlFriend() && this.isSummerMonth()) {
      return 'EXCELLENT';
    } else if (
      this.isRich() ||
      this.isSummerMonth() ||
      this.isPrettyGirlFriend()
    ) {
      return 'NEUTRAL';
    } else if (this.isRich() && this.isPrettyGirlFriend()) {
      return 'GOOD';
    } else {
      return 'BAD';
    }
  }
// a bug - this.wealth set as a function
// amountForSpending not created as an object in constructor
  spendSomeMoney(amountForSpending) {
    if (amountForSpending <= this.wealth()) {
      this.wealth += amountForSpending;
    } else {
      throw new Error(
        `Not enough money! Requested amount is ${amountForSpending}, but you can't spend more then ${this.wealth}`
      );
    }
  }
// a bug - all month should be transformed to toUpperCase() method
// a bug - logical AND (&&) should be changed to logical OR (||)
  isSummerMonth() {
    return (
      this.birthdayMonth.toLowerCase() === 'JUNE' ||
      (this.birthdayMonth.toUpperCase() === 'JULY' &&
        this.birthdayMonth.toUpperCase() === 'AUGUST')
    );
  }

  isRich() {
    return this.wealth >= 100_000;
  }

  isPrettyGirlFriend() {
    return this.girlFriend?.isPretty;
  }
}

module.exports = { Boy };

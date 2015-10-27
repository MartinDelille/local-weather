var assert = require('assert');

module.exports = function() {

  this.Given(/^I am going to the website "([^"]*)"$/, function (url, next) {
    browser
      .url(url)
      .call(next);
  });

  this.When(/^I look at the title$/, function (next) {
      browser
        .call(next);
  });

  this.Then(/^the title is "([^"]*)"$/, function (expectedTitle, next) {
    browser
      .getTitle().then(function(title) {
        assert.equal(title, expectedTitle);
      }, next)
      .call(next);
  });
};

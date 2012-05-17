var torpedo = require('..');

describe('torpedo lib test suite', function() {
  it('should have semver', function() {
    torpedo.version.should.match(/^\d+\.\d+\.\d+$/);
  });
});

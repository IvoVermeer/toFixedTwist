module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'browserify'],
    files: [
      'src/**/*.js',
      'tests/**/*_spec.js'
    ],
    preprocessors: {
      'src/**/*.js': ['eslint', 'browserify'],
      'tests/**/*.js': ['eslint', 'browserify']
    },
    browsers: ['PhantomJS'],
    browserify: {
      debug: true
    },
    reporters: ['mocha']
  });
};

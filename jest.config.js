module.exports = {
  verbose: true,
  collectCoverage: true,
  // collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  collectCoverageFrom: ['./src/composition-lib/*.js'],
  coverageReporters: ['html', 'text-summary'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/composition-lib/$1',
    '^@utils': '<rootDir>/src/utils/index'
  },
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "transform": {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
}

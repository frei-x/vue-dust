module.exports = {
  verbose: true,
  collectCoverage: true,
  // 测试文件
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  // 报告
  coverageReporters: ['html', 'text-summary']
};

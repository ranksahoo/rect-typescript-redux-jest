module.exports = {
  semi: false,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  // overrides: [
  //   {
  //     files: ["**/*.css", "**/*.scss", "**/*.html", ".prettierrc.js"],
  //     options: {
  //       singleQuote: false,
  //     },
  //   },
  // ],
  trailingComma: 'all',
  // jsxSingleQuote: true,
  bracketSpacing: true,
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
}

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    "projects/**/*"
  ],
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: [
          "tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      rules: {
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "ot",
            style: "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case"
          }
        ],
        "no-console": "error",
        "eqeqeq" :"error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-explicit-any": "error"
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    },
    {
      files: [
        "*.component.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended"
      ],
      rules: {}
    }
  ]
}
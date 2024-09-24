import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["src/**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js", "*.js"], 
    rules: {
      "no-undef": "off",
      "semi": ["error", "never"],  
      "quotes": ["error", "single"], 
      "indent": ["error", 2],        
      "no-console": "off",
    },
    languageOptions: {
      ecmaVersion: 2021,  
      sourceType: "module", 
    },
  },
];
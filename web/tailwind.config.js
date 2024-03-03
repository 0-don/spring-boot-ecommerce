const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    join(__dirname, "components/**/*.{ts,html}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

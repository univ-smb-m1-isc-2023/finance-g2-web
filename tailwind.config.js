/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind');
const colors = require('./src/utils/Constant').COLORLIST;
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite-react/lib/esm/**/*.js',
        flowbite.content(),
    ],
    theme: {
        extend: {
            colors: colors,
        },
    },
    plugins: [flowbite.plugin()],
};

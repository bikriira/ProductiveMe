/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            blue: {
                100: "#0B4FFF",
            },
            title: "#595959",
            detail: "#606060",
        },

        fontFamily: {
            pthin: ["Poppins-Thin", "sans-serif"],
            pextralight: ["Poppins-ExtraLight", "sans-serif"],
            plight: ["Poppins-Light", "sans-serif"],
            pregular: ["Poppins-Regular", "sans-serif"],
            pmedium: ["Poppins-Medium", "sans-serif"],
            psemibold: ["Poppins-SemiBold", "sans-serif"],
            pbold: ["Poppins-Bold", "sans-serif"],
            pextrabold: ["Poppins-ExtraBold", "sans-serif"],
            pblack: ["Poppins-Black", "sans-serif"],
        },
    },
    plugins: [],
};

module.exports = {
    mode: "jit",
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: '#151F31',
                box: '#243A54',
                box2: '#202225',
                line: '#202225',
                text: {
                    blue: '#3993E4',
                    pink: '#D86AA7',
                    ice: '#CFDCFF'
                },
                border: '#AA7CC2',
                blurple: '5865F2'
            }
        },
    },
    plugins: [],
};

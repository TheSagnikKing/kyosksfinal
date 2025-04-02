import { createSlice } from '@reduxjs/toolkit';

const themeColors = {
    Dark: {
        color1: "#09090B",
        color2: "#585858",
        inputColor: "#27272A80",
        borderColor: "hsl(240, 3.7%, 15.9%)",
        color3: "#fff",
        textColor: "#F4F4F5B2",
        color4: "#09090B"
    },
    Light: {
        color1: "#F6F6F4",
        color2: "#A7A7A7",
        inputColor: "#D8D8D580",
        borderColor: "hsl(60, 3.7%, 85%)",
        color3: "#000",
        textColor: "#0B0B0AB2",
        color4: "#fff"
    }
};

const storedTheme = localStorage.getItem("theme") || "Dark";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: storedTheme,
        availableThemes: Object.keys(themeColors),
        colors: themeColors[storedTheme],
    },
    reducers: {
        setTheme: (state, action) => {
            if (state.availableThemes.includes(action.payload)) {
                state.currentTheme = action.payload;
                state.colors = themeColors[action.payload];
                localStorage.setItem("theme", action.payload);
            }
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;

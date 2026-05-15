export const THEME_STORAGE_KEY = "madsjeez-theme";

export type ThemeMode = "light" | "dark" | "system";

/** Ejecutar antes de pintar para evitar flash; debe coincidir con ThemeProvider. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var s=localStorage.getItem(k);var d;if(s==="dark")d=true;else if(s==="light")d=false;else d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

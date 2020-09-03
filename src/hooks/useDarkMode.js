import { useEffect, useState } from 'react';
export default function useDarkMode() {
    const [theme, setTheme] = useState('light');

    const setMode = mode => {
        window.localStorage.setItem('oowgnoj_dev', mode);
        setTheme(mode);
    };
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('oowgnoj_dev');
        localTheme && setTheme(localTheme);
    }, []);
    return [theme, themeToggler];
}

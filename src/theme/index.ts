import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    styles: {
        global: {
            body: {
                bg: 'gray.900',
                color: 'white',
            },
        },
    },
    colors: {
        brand: {
            50: '#ffe5e5',
            100: '#fbb8b8',
            200: '#f48a8a',
            300: '#ee5c5c',
            400: '#e82e2e',
            500: '#cf1414',
            600: '#a10f0f',
            700: '#730b0b',
            800: '#450606',
            900: '#1a0101',
        },
    },
})

export default theme

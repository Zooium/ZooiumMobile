import { light } from '@eva-design/eva';
import { Platform } from 'react-native';

export default {
    ...light,

    "color-primary-100": "#DCE4FD",
    "color-primary-200": "#BAC8FB",
    "color-primary-300": "#95A8F4",
    "color-primary-400": "#778DEA",
    "color-primary-500": "#4D65DC",
    "color-primary-600": "#384CBD",
    "color-primary-700": "#26369E",
    "color-primary-800": "#18247F",
    "color-primary-900": "#0E1769",

    "color-success-100": "#D3FADA",
    "color-success-200": "#A9F5BD",
    "color-success-300": "#79E3A0",
    "color-success-400": "#53C88A",
    "color-success-500": "#24a46d",
    "color-success-600": "#1A8D67",
    "color-success-700": "#12765F",
    "color-success-800": "#0B5F54",
    "color-success-900": "#064E4C",

    "color-info-100": "#CEFEF6",
    "color-info-200": "#9FFDF5",
    "color-info-300": "#6EFAF9",
    "color-info-400": "#4AE8F5",
    "color-info-500": "#11cdef",
    "color-info-600": "#0CA0CD",
    "color-info-700": "#0879AC",
    "color-info-800": "#05578A",
    "color-info-900": "#033F72",

    "color-warning-100": "#FFF2CC",
    "color-warning-200": "#FFE299",
    "color-warning-300": "#FFCD66",
    "color-warning-400": "#FFB93F",
    "color-warning-500": "#ff9800",
    "color-warning-600": "#DB7900",
    "color-warning-700": "#B75E00",
    "color-warning-800": "#934500",
    "color-warning-900": "#7A3400",

    "color-danger-100": "#FEDED6",
    "color-danger-200": "#FEB5AE",
    "color-danger-300": "#FC8687",
    "color-danger-400": "#F96776",
    "color-danger-500": "#f5365c",
    "color-danger-600": "#D22759",
    "color-danger-700": "#B01B55",
    "color-danger-800": "#8E114D",
    "color-danger-900": "#750A48",
};

// @see https://github.com/facebook/react-native/issues/25696
export const customMapping = Platform.select({
    android: {
        "strict": {
            "text-heading-1-font-weight": "bold",       // 800
            "text-heading-2-font-weight": "bold",       // 800
            "text-heading-3-font-weight": "bold",       // 800
            "text-heading-4-font-weight": "bold",       // 800
            "text-heading-5-font-weight": "bold",       // 800
            "text-heading-6-font-weight": "bold",       // 800
    
            "text-subtitle-1-font-weight": "bold",      // 600
            "text-subtitle-2-font-weight": "bold",      // 600
    
            "text-paragraph-1-font-weight": "normal",   // 400
            "text-paragraph-2-font-weight": "normal",   // 400
    
            "text-caption-1-font-weight": "normal",     // 400
            "text-caption-2-font-weight": "bold",       // 600
    
            "text-label-font-weight": "bold",           // 800
        },
    },
});

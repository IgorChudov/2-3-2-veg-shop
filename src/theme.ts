import { createTheme, type MantineColorsTuple, Loader} from '@mantine/core';
import { CustomLoader }  from "./shared/CustomLoader"

const buttons: MantineColorsTuple = [
  '#e7faeb',
  '#d6f0dc',
  '#b9e1c2',
  '#94d0a1',
  '#74c186',
  '#60b874',
  '#54b46a',
  '#449e59',
  '#398d4d',
  '#2a7a3f'
];

const main: MantineColorsTuple = [
  '#ffffff',
  '#f3f5fa',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#ced4da',
  '#868e96',
  '#495057',
  '#343a40',
  '#212529'

]

export const theme = createTheme({
  colors: {
    buttons,
    main,
  },
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "600",
  },
  fontSizes: {
    xs: "14px",
    sm: "16px",
    md: "18px",
    lg: "20px",
    xl: "22px",
    xxl: "32px"
  },
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CustomLoader },
        type: 'custom',
      },
    }),
  },
});
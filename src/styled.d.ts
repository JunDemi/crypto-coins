import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string,
    bgColor: string,
    accentColor: string,
    cardBgColor: string,
    cardTextColor: string,
    shadow: string,
    btnColor: string
  }
}
import { Constants } from '../constants'
import { Icons } from '../icons'

export function UiMode() {
  let mode = getUiMode()

  switch (mode) {
    case Constants.UiMode.light:
      return (<>{Icons.light}</>)

    case Constants.UiMode.dark:
    default:
      return (<>{Icons.DarkMode}</>)
  }
}

export const switchTheme = () => {
  if (isMounted) {
    setTheme(theme === "light" ? "dark" : "light");
  }
};
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import de from 'vuetify/lib/locale/de'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const theme = {
  primary: colors.amber.accent4
}

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { decrypt } from '@/aes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      visible: false,
      text: ''
    },
    passwort: '',
    dienststelle: '',
    schuldaten: null
  },
  mutations: {
    OPEN_SNACKBAR (state, text) {
      state.snackbar.text = text
      state.snackbar.visible = true
    },
    CLOSE_SNACKBAR (state) {
      state.snackbar.visible = false
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    klassen: state => {
      let tmp = state.schuldaten?.daten

      if (!tmp) return []

      tmp = decrypt(state.passwort, state.dienststelle, tmp)

      try {
        tmp = JSON.parse(tmp)
        tmp.sort((a, b) => a.klasse < b.klasse ? -1 : 1)
      } catch (e) {
        state.snackbar.text = 'Fehler beim Verarbeiten der Schülerdaten! Müssen neu importiert/eingegeben werden'
        state.snackbar.visible = true
        return []
      }

      return tmp
    }
  }
})

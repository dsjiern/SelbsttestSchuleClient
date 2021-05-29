<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>Selbsttest-Schule</v-toolbar-title>
      <v-tabs
        v-model="currentItem"
        show-arrows
      >
        <v-tab to="/">Startseite</v-tab>
        <v-tab to="/login">Login</v-tab>
        <v-tab to="/impressum">Impressum</v-tab>
        <v-tab to="/datenschutz">Datenschutz</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer
      fixed
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary"
      >
        <v-card-text
          class="white--text text-center"
        >
          Selbsttest-Schule &copy; 2021, v0.9, 29.05.2021
        </v-card-text>
      </v-card>
    </v-footer>

    <confirm ref="confirm" />

    <v-snackbar
      v-model="error_visible"
      class="error_snack"
      :timeout="5000"
      top
    >
      {{ error_text }}

      <template #action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="error_visible = false"
        >
          Schließen
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Confirm from '@/components/Confirm'

export default {
  name: 'App',

  components: {
    Confirm
  },

  data: () => ({
    currentItem: 0
  }),

  computed: {
    error_text () {
      return this.$store.state.snackbar.text
    },
    error_visible: {
      get () {
        return this.$store.state.snackbar.visible
      },
      set (v) {
        if (!v) this.$store.commit('CLOSE_SNACKBAR')
      }
    }
  }
}
</script>

<style>
body {
  padding-bottom: 60px;
}

.error_snack .v-snack__wrapper {
  background-color: red !important;
}

.v-toolbar__title {
  width: 200px;
}
</style>

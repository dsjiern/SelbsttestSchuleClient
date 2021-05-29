<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>Intern</v-card-title>
      <v-card-text>
        <v-tabs>
          <v-tab to="/intern/">Übersicht</v-tab>
          <v-tab to="/intern/schueler">Schüler</v-tab>
          <v-tab to="/intern/testergebnisse">Testergebnisse verschicken</v-tab>
        </v-tabs>
        <router-view />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Intern',

  data: () => ({
    dienststelle: '',
    passwort: ''
  }),

  mounted () {
    if (!this.$store.state.passwort || !this.$store.state.schuldaten) {
      this.$router.replace('/login')
    }
  }
}
</script>

<template>
  <v-container>
    <h1>Bestätigung</h1>
    <p v-if="!id">
      Bitte besuchen Sie diese Seite über den QR-Code/Link auf der Bestätigung!
    </p>
    <p v-else-if="loading">
      Bitte warten, lade Daten...
    </p>
    <p v-else-if="!Testdaten">
      Zu diesem Code liegen keine aktuellen Testdaten vor!<br>
      <i>Hinweis: nach 24 Stunden werden diese automatisch aus der Datenbank gelöscht.</i>
    </p>
    <template v-else>
      <h2>Der angeforderte Test beinhaltet folgende Daten:</h2>
      <v-text-field
        v-model="Testdaten.name"
        label="Name"
        outlined
        disabled
        class="black-text"
      />
      <v-text-field
        v-model="Testdaten.zeitpunkt"
        label="Test durchgeführt am"
        outlined
        disabled
        class="black-text"
      />
      <v-text-field
        v-model="Testdaten.schule.name"
        label="Durchführende Schule"
        outlined
        disabled
        class="black-text"
      />
    </template>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Bestätigen',

  props: ['id'],

  data: () => ({
    loading: true,
    Testdaten: null
  }),

  apollo: {
    Testdaten: {
      query: gql`query($id: UUID!) { Test(id: $id) { name zeitpunkt schule { name } } }`,
      update (data) {
        this.loading = false
        return data.Test
      },
      variables () {
        return {
          id: this.id
        }
      },
      skip () {
        return !this.id
      }
    }
  }
}
</script>

<style>
.black-text input {
  color: black !important;
  font-weight: bold;
}
</style>

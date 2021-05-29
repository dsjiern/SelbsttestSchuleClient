<template>
  <v-card flat>
    <v-card-title>Daten</v-card-title>
    <v-card-text>
      Hier sehen Sie eine Übersicht der registrierten Daten:
      <v-text-field
        v-model="name"
        label="Name"
        outlined
        disabled
      />
      <v-text-field
        v-model="dienststelle"
        label="Dienststellenschlüssel"
        outlined
        disabled
      />
      <v-text-field
        v-model="ansprechperson"
        label="Ansprechperson"
        outlined
        disabled
      />
      <v-text-field
        v-model="email"
        label="E-Mail Poststelle oder Schulleitung"
        outlined
        disabled
      />
      <v-text-field
        v-model="telefon"
        label="Telefon Schule"
        outlined
        disabled
      />
      <v-btn
        block
        elevation="2"
        x-large
        @click="delschule"
      >Schule löschen</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import sha512 from 'js-sha512'

export default {
  name: 'Daten',

  data: () => ({
  }),

  computed: {
    name () {
      return this.$store.state.schuldaten?.name
    },
    dienststelle () {
      return this.$store.state.schuldaten?.dienststelle
    },
    ansprechperson () {
      return this.$store.state.schuldaten?.ansprechperson
    },
    email () {
      return this.$store.state.schuldaten?.email
    },
    telefon () {
      return this.$store.state.schuldaten?.telefon
    }
  },

  methods: {
    async delschule () {
      if (!(await this.$root.$children[0].$refs.confirm.open('Löschen?', 'Soll die Schule wirklich gelöscht werden? Sämtliche dazugehörigen Daten werden hierbei gelöscht! Dieser Vorgang kann nicht rückgängig gemacht werden.'))) return
      if (!(await this.$root.$children[0].$refs.confirm.open('Löschen?', 'Bitte nochmals bestätigen...'))) return

      const pwd = sha512(`${this.$store.state.dienststelle}- ${this.$store.state.passwort}-${this.$store.state.dienststelle}`)

      this.$apollo.mutate({
        mutation: gql`mutation ($dienststelle: String!, $passwort: String!) {
          DelSchule(dienststelle: $dienststelle, passwort: $passwort)
        }`,
        variables: {
          dienststelle: this.$store.state.dienststelle,
          passwort: pwd
        }
      }).catch(e => {
        this.$store.commit('OPEN_SNACKBAR', e.networkError ? e.networkError.result.errors.map(e => e.message) : e)
      }).then(() => {
        this.$store.state.schuldaten = null
        this.$store.state.passwort = ''
        this.$store.state.dienststelle = ''
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<template>
  <v-container
    style="margin: auto; width: 500px;"
  >
    <v-card class="mb-4">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        Hier können Sie sich anmelden, wenn Sie bereits einen Zugang haben:
        <v-card
          flat
          max-width="500"
        >
          <v-text-field
            v-model="dienststelle"
            label="Dienststellenschlüssel"
            placeholder="01234567"
            outlined
            @keydown.enter="login"
          />
          <v-text-field
            v-model="passwort"
            label="Passwort"
            type="password"
            placeholder="************"
            outlined
            @keydown.enter="login"
          />
          <v-btn
            block
            elevation="2"
            x-large
            @click="login"
          >Login</v-btn>
        </v-card>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Registrierung</v-card-title>
      <v-card-text>
        Sollten Sie noch keinen Zugang haben, so können Sie hier einen beantragen:
        <v-btn
          block
          elevation="2"
          x-large
          to="/registrierung"
        >Registrierung</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import sha512 from 'js-sha512'
import gql from 'graphql-tag'

export default {
  name: 'Login',

  data: () => ({
    dienststelle: '',
    passwort: ''
  }),

  methods: {
    login () {
      const pwd = sha512(`${this.dienststelle}-${this.passwort}-${this.dienststelle}`)

      this.$apollo.query({
        query: gql`query($dienststelle: String!, $passwort: String!) {
          Daten(dienststelle: $dienststelle, passwort: $passwort) {
            _id
            name
            dienststelle
            ansprechperson
            email
            telefon
            daten
          }
        }`,
        variables: {
          dienststelle: this.dienststelle,
          passwort: pwd
        }
      }).catch(e => {
        this.$store.commit('OPEN_SNACKBAR', e.networkError ? e.networkError.result.errors.map(e => e.message) : e)
      }).then(result => {
        const pwd = `${this.dienststelle}-${this.passwort}-${this.dienststelle}`
        this.$store.state.dienststelle = this.dienststelle
        this.$store.state.passwort = pwd
        this.$store.state.schuldaten = result.data.Daten

        this.$router.replace('/intern')
      })
    }
  }
}
</script>

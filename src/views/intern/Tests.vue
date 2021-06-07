<template>
  <v-card flat>
    <v-card-title>Ausgestellte Tests</v-card-title>
    <v-card-text>
      <v-col>
        <v-text-field
          v-model="filter"
          label="Filter"
        />
      </v-col>
      <v-data-table
        :headers="headers"
        :items="Tests"
        sort-by="name"
        :items-per-page="25"
        mobile-breakpoint="0"
        :search="filter"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import sha512 from 'js-sha512'

export default {
  name: 'Tests',

  data: () => ({
    filter: '',
    Tests: [],
    headers: [
      {
        text: 'Zeitpunkt',
        value: 'zeitpunkt',
        sortable: false
      },
      {
        text: 'Name',
        value: 'name',
        sortable: false
      }
    ]
  }),

  apollo: {
    Tests: {
      query: gql`query($dienststelle: String!, $passwort: String!) { Tests(dienststelle: $dienststelle, passwort: $passwort) { _id name zeitpunkt } }`,
      variables () {
        const ds = this.$store.state.dienststelle
        const pw = this.$store.state.passwort
        const pwd = sha512(`${ds}-${pw}-${ds}`)
        return {
          dienststelle: ds,
          passwort: pwd
        }
      }
    }
  }
}
</script>

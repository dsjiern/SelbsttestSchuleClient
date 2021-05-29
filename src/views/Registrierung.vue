<template>
  <v-container>
    <v-card
      v-if="registriert"
    >
      <v-card-title>Registrierung wurde gespeichert</v-card-title>
      <v-card-text>
        Ihre Registrierung wurde gespeichert. Sobald diese überprüft und freigeschaltet wurde erhalten Sie eine E-Mail.
      </v-card-text>
    </v-card>
    <v-card
      v-else
    >
      <v-card-title>Registrierung</v-card-title>
      <v-card-text>
        Hier können Sie Ihre Schule für diesen Dienst registrieren:
        <v-form
          ref="login"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            label="Schulname"
            placeholder="Muster-Gymnasium Musterhausen"
            outlined
            :rules="rules.name"
          />
          <v-text-field
            v-model="dienststelle"
            label="Dienststellenschlüssel"
            placeholder="01234567"
            outlined
            :rules="rules.dienststelle"
          />
          <v-text-field
            v-model="ansprechperson"
            label="Ansprechperson"
            placeholder="Max Mustermann"
            outlined
            :rules="rules.ansprechperson"
          />
          <v-text-field
            v-model="email"
            label="E-Mail Poststelle oder Schulleitung"
            placeholder="poststelle@01234567.schule.bwl.de"
            outlined
            :rules="rules.email"
          />
          <v-text-field
            v-model="telefon"
            label="Telefon Schule"
            placeholder="+49 123 456789"
            outlined
            :rules="rules.telefon"
          />
          Da das Passwort zur Verschlüsselung der Schülerdaten verwendet wird, gelten dafür folgende Regeln:
          <ul>
            <li>Mindestens 12 Zeichen lang</li>
            <li>Mindestens 1 Kleinbuchstabe</li>
            <li>Mindestens 1 Großbuchstabe</li>
            <li>Mindestens 1 Ziffer</li>
            <li>Mindestens 1 Sonderzeichen</li>
          </ul>
          <v-text-field
            v-model="passwort"
            label="Passwort"
            type="password"
            placeholder="************"
            outlined
            :rules="rules.passwort"
          />
          <v-text-field
            v-model="passwort2"
            label="Passwort wiederholen"
            type="password"
            placeholder="************"
            outlined
            :rules="rules.passwort2"
          />
          <v-checkbox
            v-model="datenschutz"
            label="Ich habe die Datenschutzinformationen gelesen und akzeptiere diese."
          />
          <v-btn
            block
            elevation="2"
            x-large
            :disabled="!datenschutz"
            @click="register"
          >Registrieren</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import sha512 from 'js-sha512'
import gql from 'graphql-tag'

export default {
  name: 'Login',

  data () {
    return {
      valid: true,
      registriert: false,
      name: '',
      dienststelle: '',
      ansprechperson: '',
      email: '',
      telefon: '',
      passwort: '',
      passwort2: '',
      datenschutz: false,
      rules: {
        name: [
          v => !!v || 'Name wird benötigt!'
        ],
        dienststelle: [
          v => !!v || 'Dienststellenschlüssel wird benötigt!'
        ],
        ansprechperson: [
          v => !!v || 'Ansprechperson wird benötigt!'
        ],
        email: [
          v => !!v || 'E-Mail wird benötigt!'
        ],
        telefon: [
          v => !!v || 'Telefonnummer wird benötigt!'
        ],
        passwort: [
          v => !!v || 'Passwort wird benötigt!',
          v => v.length >= 12 || 'Passwort muss mindestens 12 Zeichen umfassen!',
          v => !!v.match(/[a-z]/) || 'Passwort muss Kleinbuchstaben enthalten!',
          v => !!v.match(/[A-Z]/) || 'Passwort muss Großbuchstaben enthalten!',
          v => !!v.match(/[0-9]/) || 'Passwort muss Zahlen enthalten!',
          v => !!v.match(/[^A-Za-z0-9]/) || 'Passwort muss Sonderzeichen enthalten!'
        ],
        passwort2: [
          v => !!v || 'Passwortwiederholung wird benötigt!',
          v => v === this.passwort || 'Passwörter stimmen nicht überein!'
        ]
      }
    }
  },

  methods: {
    async register () {
      if (!this.$refs.login.validate()) {
        return
      }

      const pwd = sha512(`${this.dienststelle}-${this.passwort}-${this.dienststelle}`)

      this.$apollo.mutate({
        mutation: gql`mutation($name: String!, $dienststelle: String!, $passwort: String!, $ansprechperson: String!, $email: EmailAddress!, $telefon: String!) {
          Register(name: $name, dienststelle: $dienststelle, passwort: $passwort, ansprechperson: $ansprechperson, email: $email, telefon: $telefon) {
            _id
          }
        }`,
        variables: {
          name: this.name,
          dienststelle: this.dienststelle,
          passwort: pwd,
          ansprechperson: this.ansprechperson,
          email: this.email,
          telefon: this.telefon
        }
      }).catch(e => {
        this.$store.commit('OPEN_SNACKBAR', e.networkError ? e.networkError.result.errors.map(e => e.message) : e)
      }).then(() => {
        this.registriert = true
      })
    }
  }
}
</script>

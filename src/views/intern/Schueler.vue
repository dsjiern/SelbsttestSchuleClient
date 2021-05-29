<template>
  <v-card flat>
    <v-card-title>Schüler</v-card-title>
    <v-card-text>
      <v-form
        ref="neueklasse"
        @submit.prevent="addklasse"
      >
        <v-row>
          <v-col
            cols="8"
            sm="10"
          >
            <v-text-field
              v-model="neueklasse"
              label="Neue Klasse anlegen"
              placeholder="5a"
              outlined
            />
          </v-col>
          <v-col
            cols="4"
            sm="2"
          >
            <v-btn
              block
              elevation="2"
              x-large
              @click="addklasse"
            >anlegen</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col
          cols="12"
        >
          <p>
            Sie haben hier die Möglichkeit, eine csv-Datei mit den Schülerdaten hochzuladen. Nutzen Sie als Basis hierfür die
            <a href="data:file/csv;base64,bmFtZTtlbWFpbDtnZWJ1cnRzZGF0dW07a2xhc3NlO2dydXBwZQ1CZWlzcGllbHNjaMO8bGVyO2VtYWlsQGV4YW1wbGUuY29tOzEuMS4yMDAxOzVhO0ENTWF4IE11c3Rlcm1hbm47bWF4QG11c3Rlcm1hbm4uZGU7Mi4yLjIwMDI7NWI7Qg==" target="_blank" download="schueler.csv">Beispieldatei</a>.
          </p>
          <p><b>Wichtig:</b> verändern Sie nicht die angegebenen Einträge in der Kopfzeile!</p>
          <p>
            Beim Import werden neue Klassen und Schüler angelegt. Ist ein Schüler bereits in der Klasse enthalten (identifizierbar durch Name + E-Mail-Adresse),
            so wird dessen Geburtsdatum sowie Gruppenzugehörigkeit aktualisiert. <b>Es werden jedoch keine Schüler durch den Import gelöscht!</b>
          </p>
        </v-col>
        <v-col
          cols="8"
          sm="10"
        >
          <v-file-input
            v-model="csvfile"
            label="CSV-Datei importieren"
            outlined
            show-size
            accept="text/csv"
          />
        </v-col>
        <v-col
          cols="4"
          sm="2"
        >
          <v-btn
            block
            elevation="2"
            x-large
            :disabled="!this.csvdata"
            @click="csvimport"
          >Importieren</v-btn>
        </v-col>
        <v-col
          v-if="changed"
          cols="6"
        >
          <v-btn
            class="primary"
            block
            elevation="2"
            x-large
            @click="save"
          >Änderungen speichern</v-btn>
        </v-col>
        <v-col
          v-if="changed"
          cols="6"
        >
          <v-btn
            class="primary"
            block
            elevation="2"
            x-large
            @click="init"
          >Änderungen zurücksetzen</v-btn>
        </v-col>
      </v-row>
      <div
        v-if="klassen.length === 0"
      >
        noch keine Klassen angelegt
      </div>
      <v-tabs
        v-else
        v-model="tab"
      >
        <v-tab
          v-for="klasse in klassen"
          :key="klasse"
          :href="'#klasse-'+klasse"
        >{{ klasse }}</v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
      >
        <v-tab-item
          v-for="(klasse, index) in klassen"
          :key="klasse"
          :value="'klasse-'+klasse"
        >
          <v-card
            flat
            class="mt-6"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  absolute
                  top
                  right
                  fab
                  small
                  style="margin-right:60px"
                  @click="delklasse(klasse, index)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-account-multiple-minus-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Klasse löschen</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  absolute
                  top
                  right
                  fab
                  small
                  @click="addschueler(klasse)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-account-plus-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>Schüler hinzufügen</span>
            </v-tooltip>

            <h2 class="mt-4">Klasse {{ klasse }} ({{ schueler(klasse).length }} Schüler)</h2>

            <v-data-table
              :headers="headers"
              :items="schueler(klasse)"
              :items-per-page="15"
              mobile-breakpoint="0"
            >
              <template #item.name="{item}">
                <v-edit-dialog
                  :return-value.sync="item.name"
                  @save="changed=true"
                >
                  {{ item.name }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.name"
                      label="Name bearbeiten"
                    />
                  </template>
                </v-edit-dialog>
              </template>
              <template #item.email="{item}">
                <v-edit-dialog
                  :return-value.sync="item.email"
                  @save="changed=true"
                >
                  {{ item.email }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.email"
                      label="E-Mail bearbeiten"
                    />
                  </template>
                </v-edit-dialog>
              </template>
              <template #item.geburtsdatum="{item}">
                <v-edit-dialog
                  :return-value.sync="item.geburtsdatum"
                  @save="changed=true"
                >
                  {{ item.geburtsdatum }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.geburtsdatum"
                      label="Geburtsdatum bearbeiten"
                    />
                  </template>
                </v-edit-dialog>
              </template>
              <template #item.gruppe="{item}">
                <v-edit-dialog
                  :return-value.sync="item.gruppe"
                  @save="changed=true"
                >
                  {{ item.gruppe }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="item.gruppe"
                      label="Gruppe bearbeiten"
                    />
                  </template>
                </v-edit-dialog>
              </template>
              <template #item.delete="{item}">
                <v-btn
                  fab
                  small
                  text
                  @click="delschueler(klasse, item)"
                >
                  <v-icon>
                    mdi-delete-forever-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

    <confirm ref="confirm" />
  </v-card>
</template>

<script>
import { encrypt } from '@/aes'
import Confirm from '@/components/Confirm'
import gql from 'graphql-tag'
import sha512 from 'js-sha512'
import * as parse from 'csv-parse/lib/sync'

export default {
  name: 'Schueler',

  components: {
    Confirm
  },

  data: () => ({
    tab: null,
    changed: false,
    neueklasse: '',
    csvfile: null,
    csvdata: null,
    daten: null,
    headers: [
      {
        text: 'Name',
        value: 'name',
        sortable: false
      },
      {
        text: 'E-Mail',
        value: 'email',
        sortable: false
      },
      {
        text: 'Geburtsdatum',
        value: 'geburtsdatum',
        sortable: false
      },
      {
        text: 'Gruppe',
        value: 'gruppe',
        sortable: false,
        align: 'center'
      },
      {
        text: 'Löschen',
        value: 'delete',
        sortable: false,
        width: 50,
        align: 'center'
      }
    ]
  }),

  computed: {
    klassen () {
      return this.daten?.map(e => e.klasse) || []
    },
    csvklassen () {
      return this.csvdata?.map(k => k.klasse)?.filter((val, i, arr) => arr.indexOf(val) === i)?.sort() || []
    }
  },

  methods: {
    addklasse () {
      if (!this.neueklasse) {
        return false
      }

      this.daten.push({ klasse: this.neueklasse, schueler: [] })

      this.neueklasse = ''
      this.changed = true
      return false
    },
    addschueler (klasse) {
      this.changed = true
      return this.daten?.find(e => e.klasse === klasse)?.schueler?.unshift({ name: '', email: '', geburtsdatum: '', gruppe: '' })
    },
    async delschueler (klasse, item) {
      const index = this.schueler(klasse)?.findIndex(e => e.name === item.name && e.email === item.email)
      if (index === -1) return

      if (await this.$root.$children[0].$refs.confirm.open('Löschen?', 'Schüler wirklich löschen?')) {
        this.schueler(klasse).splice(index, 1)
        this.changed = true
      }
    },
    async delklasse (klasse, index) {
      if (await this.$root.$children[0].$refs.confirm.open('Löschen?', 'Klasse wirklich löschen?')) {
        this.daten.splice(index, 1)
        this.changed = true
      }
    },
    schueler (klasse) {
      return this.daten?.find(e => e.klasse === klasse)?.schueler || []
    },
    save () {
      const pwd = sha512(`${this.$store.state.dienststelle}- ${this.$store.state.passwort}-${this.$store.state.dienststelle}`)

      const enc = encrypt(this.$store.state.passwort, this.$store.state.dienststelle, JSON.stringify(this.daten))

      this.$apollo.mutate({
        mutation: gql`mutation ($dienststelle: String!, $passwort: String!, $daten: String!) {
          SetDaten(dienststelle: $dienststelle, passwort: $passwort, daten: $daten) {
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
          dienststelle: this.$store.state.dienststelle,
          passwort: pwd,
          daten: enc
        }
      }).catch(e => {
        this.$store.commit('OPEN_SNACKBAR', e.networkError ? e.networkError.result.errors.map(e => e.message) : e)
      }).then(result => {
        this.$store.state.schuldaten = result.data.SetDaten
        this.changed = false
        this.init()
      })
    },
    init () {
      this.daten = JSON.parse(JSON.stringify(this.$store.getters.klassen))
      this.changed = false
      return this.daten?.forEach(k => k?.schueler?.sort((a, b) => a?.name > b?.name))
    },
    csvimport () {
      this.csvklassen.forEach(k => {
        if (!this.klassen.find(kl => kl === k)) {
          this.daten.push({ klasse: k, schueler: [] })
          this.changed = true
        }
      })

      this.csvdata.forEach(p => {
        const klasse = this.daten.find(k => k.klasse === p.klasse)

        if (!klasse) return

        const schueler = klasse.schueler.find(s => s.name === p.name && (s.email === p.email || !s.email))

        if (!schueler) {
          klasse.schueler.push({ name: p.name, email: p.email, geburtsdatum: p.geburtsdatum, gruppe: p.gruppe })
        } else {
          schueler.geburtsdatum = p.geburtsdatum
          schueler.gruppe = p.gruppe
        }

        this.changed = true
      })

      this.csvfile = null
    }
  },

  mounted () {
    this.init()
  },

  async beforeDestroy () {
    if (this.changed && await this.$root.$children[0].$refs.confirm.open('Änderungen speichern?', 'Sollen die änderungen gespeichert werden?')) {
      this.save()
    }
  },

  watch: {
    csvfile () {
      this.csvdata = null

      if (!this.csvfile) return

      const reader = new FileReader()
      reader.onload = (() => (e) => {
        let tmp = parse(e.target.result, {
          columns: true,
          skip_empty_lines: true,
          delimiter: ';',
          ignore_last_delimiters: true
        })

        if (tmp.length === 0) {
          return this.$store.commit('OPEN_SNACKBAR', 'Keine Einträge in Datei!')
        }
        if (tmp[0].name === undefined || tmp[0].email === undefined || tmp[0].geburtsdatum === undefined || tmp[0].klasse === undefined || tmp[0].gruppe === undefined) {
          tmp = parse(e.target.result, {
            columns: true,
            skip_empty_lines: true,
            ignore_last_delimiters: true
          })
        }

        if (tmp.length === 0) {
          return this.$store.commit('OPEN_SNACKBAR', 'Keine Einträge in Datei!')
        }
        if (tmp[0].name === undefined || tmp[0].email === undefined || tmp[0].geburtsdatum === undefined || tmp[0].klasse === undefined || tmp[0].gruppe === undefined) {
          return this.$store.commit('OPEN_SNACKBAR', 'Kann Datei nicht lesen, falsche Spalten in Datei!')
        }

        this.csvdata = tmp
      })(this.csvfile)

      reader.readAsText(this.csvfile)
    }
  }
}
</script>

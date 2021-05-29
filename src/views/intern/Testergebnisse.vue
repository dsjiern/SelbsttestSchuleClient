<template>
  <v-card flat>
    <v-card-title>Testergebnisse</v-card-title>
    <v-card-text>
      <v-stepper
        v-model="step"
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Testdaten eingeben
          </v-stepper-step>

          <v-divider/>

          <v-stepper-step
            :complete="step > 2"
            step="2"
          >
            Klassen auswählen
          </v-stepper-step>

          <v-divider/>

          <v-stepper-step
            :complete="step > 3"
            step="3"
          >
            Schüler auswählen
          </v-stepper-step>

          <v-divider/>

          <v-stepper-step
            :complete="step > 4"
            step="4"
          >
            Übersicht und verschicken
          </v-stepper-step>

          <v-divider/>

          <v-stepper-step
            :complete="step > 4"
            step="5"
          >
            Abgeschlossen
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            step="1"
          >
            <v-card>
              <v-card-title>Testdaten</v-card-title>
              <v-card-text>
                <date-time-selector
                  v-model="testzeitpunkt"
                  label="Testzeitpunkt"
                />
                <v-text-field
                  v-model="hersteller"
                  label="Testhersteller (optional)"
                />

                <h3 class="mt-4">Getestete Gruppen:</h3>

                <v-checkbox
                  v-for="gruppe in groups"
                  v-model="gruppen"
                  :label="'Gruppe ' + gruppe"
                  :key="gruppe"
                  :value="gruppe"
                  dense
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary"
                  :disabled="testzeitpunkt.length !== 19 || gruppen.length === 0"
                  @click="step = 2"
                >
                  Weiter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content
            step="2"
          >
            <v-card>
              <v-card-title>Klassen auswählen</v-card-title>
              <v-card-text>
                <v-btn
                  v-if="klassen.length !== classes.length"
                  block
                  @click="klassen = classes.map(k => k.klasse)"
                >Alle Klassen auswählen</v-btn>
                <v-btn
                  v-else
                  block
                  @click="klassen = []"
                >Alle Klassen abwählen</v-btn>
                <v-checkbox
                  v-for="klasse in classes"
                  v-model="klassen"
                  :label="'Klasse ' + klasse.klasse"
                  :key="klasse.klasse"
                  :value="klasse.klasse"
                  dense
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="step = 1"
                >
                  Zurück
                </v-btn>
                <v-spacer/>
                <v-btn
                  color="primary"
                  :disabled="klassen.length === 0"
                  @click="step = 3"
                >
                  Weiter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content
            step="3"
          >
            <v-card>
              <v-card-title>Schüler auswählen</v-card-title>
              <v-card-text>
                <v-tabs
                  v-model="tab"
                >
                  <v-tab
                    v-for="k in klassen"
                    :key="k"
                    :href="'#klasse-'+k"
                  >{{ k }}</v-tab>
                </v-tabs>
                <v-tabs-items
                  v-model="tab"
                >
                  <v-tab-item
                    v-for="k in klassen"
                    :key="k"
                    :value="'klasse-'+k"
                  >
                    <h3>Klasse {{ k }}:</h3>
                    <v-btn
                      block
                      @click="addallschueler(k)"
                    >Alle Schüler auswählen</v-btn>
                    <v-checkbox
                      v-for="p in pupils(k)"
                      v-model="schueler"
                      :key="p.id"
                      :value="p.id"
                      :label="p.name+' ('+p.email+')'"
                      :disabled="!p.email"
                    />
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="step = 2"
                >
                  Zurück
                </v-btn>
                <v-spacer/>
                <v-btn
                  color="primary"
                  @click="step = 4"
                >
                  Weiter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content
            step="4"
          >
            <v-card>
              <v-card-title>Übersicht und verschicken</v-card-title>
              <v-card-text>
                <ul>
                  <li>Insgesamt sind {{ allpupils.filter(p => p.email).length }} Schüler in den aktivierten Gruppen</li>
                  <li>Das Testergebnis wird an {{ schueler.length }} ausgewählte Schüler verschickt</li>
                  <li>{{ allpupils.filter(p => !p.email).length }} Schüler haben keine E-Mail-Adresse</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="step = 3"
                >
                  Zurück
                </v-btn>
                <v-spacer/>
                <v-btn
                  color="primary"
                  @click="send"
                >
                  Mails verschicken
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
          <v-stepper-content
            step="5"
          >
            <v-card>
              <v-card-title>E-Mails verschicken</v-card-title>
              <v-card-text
                v-if="!confirmed"
              >
                Bitte warten, Bestätigungen werden generiert und verschickt...
              </v-card-text>
              <v-card-text
                v-else
              >
                Fertig: {{ successful }}/{{ schueler.length }} wurden erfolgreich verschickt!
              </v-card-text>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import gql from 'graphql-tag'
import sha512 from 'js-sha512'

export default {
  name: 'Testergebnisse',

  data: () => ({
    step: null,
    tab: null,
    testzeitpunkt: '',
    hersteller: '',
    gruppen: [],
    klassen: [],
    schueler: [],
    confirmed: false,
    successful: 0
  }),

  computed: {
    groups () {
      return this.$store.getters.klassen
        .reduce((acc, curr) => {
          acc.push(...(curr?.schueler?.map(s => s.gruppe) || []))
          return acc
        }, [])
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
    },
    classes () {
      return this.$store.getters.klassen.filter(k => !!k?.schueler.find(s => !!this.gruppen.find(g => g === s.gruppe)))
    },
    allpupils () {
      return this.classes
        .reduce((acc, curr) => {
          acc.push(...curr.schueler.map(s => ({ ...s, klasse: curr.klasse, id: curr.klasse + s.name + s.email })))
          return acc
        }, [])
    }
  },

  methods: {
    pupils (klasse) {
      return this.$store.getters.klassen
        .find(k => k.klasse === klasse)?.schueler
        ?.filter(s => !!this.gruppen.find(g => g === s.gruppe))
        ?.map(p => ({ ...p, id: klasse + p.name + p.email, klasse })) || []
    },
    addallschueler (klasse) {
      this.pupils(klasse).filter(p => p.email).map(p => p.id).forEach(p => {
        if (!this.schueler.find(s => s === p)) this.schueler.push(p)
      })
    },
    async send () {
      if (!(await this.$root.$children[0].$refs.confirm.open('Bestätigungen verschicken?', 'Sollen die Bestätigungen wirklich verschickt werden? Ich bin mir bewusst, dass die Schule die Verantwortung für ggf. falsch ausgestellte Bescheinigungen trägt.'))) {
        return
      }

      const daten = this.allpupils.filter(p => !!this.schueler.find(s => s === p.id)).map(p => ({ name: p.name, email: p.email, geburtsdatum: p.geburtsdatum }))

      const pwd = sha512(`${this.$store.state.dienststelle}- ${this.$store.state.passwort}-${this.$store.state.dienststelle}`)

      this.step = 5

      this.$apollo.mutate({
        mutation: gql`mutation ($dienststelle: String!, $passwort: String!, $zeitpunkt: DateTime!, $daten: [ITest!]!, $hersteller: String) {
          SendTests(dienststelle: $dienststelle, passwort: $passwort, zeitpunkt: $zeitpunkt, daten: $daten, hersteller: $hersteller)
        }`,
        variables: {
          dienststelle: this.$store.state.dienststelle,
          passwort: pwd,
          zeitpunkt: this.testzeitpunkt,
          hersteller: this.hersteller,
          daten
        }
      }).catch(e => {
        this.$store.commit('OPEN_SNACKBAR', e.networkError ? e.networkError.result.errors.map(e => e.message) : e)
      }).then(result => {
        this.successful = result.data.SendTests
        this.confirmed = true
      })
    }
  }
}
</script>

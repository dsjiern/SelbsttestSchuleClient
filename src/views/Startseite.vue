<template>
  <v-container>
    <h1>Selbsttest-Schule</h1>
    <h2>Worum geht es?</h2>
    <p>
      Seit einigen Wochen müssen Schüler in Präsenzphasen zwei mal pro Woche unter Aufsicht einen Selbsttest durchführen.
      Hierzu kann die Schule nach <a href="https://www.baden-wuerttemberg.de/de/service/aktuelle-infos-zu-corona/aktuelle-corona-verordnung-des-landes-baden-wuerttemberg/" target="_blank">§4a der Corona-Verordnung</a>
      auch einen Testnachweis ausstellen (<a href="https://www.baden-wuerttemberg.de/de/service/presse/pressemitteilung/pid/landesregierung-erweitert-testmoeglichkeiten-1/" target="_blank">Quelle</a>).
    </p>
    <p>Da es den Schulen jedoch kaum zuzumuten ist, zwei mal wöchentlich mehrere hundert Bestätigungen auszudrucken und auszufüllen, wurde dieser Service entwickelt.</p>
    <h2>Wie funktioniert es?</h2>
    <p>
      Schulen können sich registrieren und erhalten daraufhin einen Zugang. Über diesen Zugang kann eine Schule dann Klassen und Schüler anlegen und verwalten sowie für Wechselunterricht die
      Schüler in mehrere Gruppen unterteilen. Anschließend lassen sich - gefiltert nach Gruppen und ggf. Klassen - Schüler auswählen und einen automatisch generierten Testnachweis per E-Mail an diese verschicken.
    </p>
    <h2>Ist es sicher?</h2>
    <p>
      Alle eingegebenen Daten werden verschlüsselt gespeichert (vgl. <router-link to="/datenschutz">Datenschutz</router-link>).
    </p>
    <p>
      Die ausgestellten Testnachweise enthalten einen QR-Code, mit dem die Bescheinigung online verifiziert werden kann. Dadurch sind diese fälschungssicher.
    </p>
    <h2>Wo kann ich meine Schule registrieren?</h2>
    <p>
      Unter <router-link to="/registrierung">Registrierung</router-link> können Sie Ihre Schule registrieren. Es erfolgt <b>keine</b> automatische Freischaltung! Nach der manuellen Überprüfung
      und Freischaltung erhalten Sie eine E-Mail.
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<template>
  <v-container>
    <h1>Datenschutz</h1>
    <h2>Allgemeine Informationen</h2>
    <p>Der Schutz der in dieses System eingegebenen Daten steht an höchster Stelle! Um die von der DSGVO geforderten Richtlinien und noch mehr darüber hinaus einzuhalten, wurde dieses System mit mehreren Schutzmechanismen ausgestattet.</p>
    <h2>Verschlüsselte Übertragung</h2>
    <p>Die Kommunikation zwischen Client/Browser und Server erfolgt TLS-verschlüsselt nach aktuellen Standards.</p>
    <h2>Schuldaten</h2>
    <p>Die bei der Registrierung einer Schule erhobenen Daten werden unverschlüsselt gespeichert. Dies sind:</p>
    <ul>
      <li>Schulname</li>
      <li>Dienststellenschlüssel</li>
      <li>Eine Ansprechperson</li>
      <li>E-Mail-Adresse der Schule</li>
      <li>Telefonnummer der Schule</li>
    </ul>
    <p>Diese Daten werden genutzt, und ggf. auch öffentlich angezeigt um Testergebnisse verifizieren zu können.</p>
    <p>Der Dienststellenschlüssel bildet den Nutzernamen für die Anmeldung am internen Bereich.</p>
    <h2>Passwort</h2>
    <p>
      Vom eingegebenen Passwort wird clientseitig bereits ein SHA512-Hashwert gebildet. Dieser Hashwert wird an den Server übertragen und dort nochmals mittels bcrypt abgespeichert.
      Dieses Verfahren entspricht heutigen Standards und gilt als sehr sicher.
    </p>
    <p>
      Gleichzeitig kann dadurch sichergestellt werden, dass das Klartextpasswort in keinem Fall den Client verlässt, sowie es nicht möglich ist, dieses Passswort auf dem Übertragungsweg oder
      auf dem Server abzufangen. Das Passwort wird deshalb gleichzeitig auch dafür verwendet, um die eingegebenen Schülerdaten zu verschlüsseln. (s. nächster Abschnitt)
    </p>
    <p>
      <b>Achtung:</b> ein vergessenes Passwort kann deshalb nicht zurückgesetzt werden, bzw. hat einen Datenverlust zur Folge! Auch der Betreiber der Seite hat keinen Zugriff auf die Daten und kann diese weder einsehen noch wiederherstellen!
    </p>
    <h2>Schülerdaten</h2>
    <p>
      Sämtliche eingegebene Schülerdaten werden zunächst verschlüsselt gespeichert. Hierfür wird eine AES256-Verschlüsselung verwendet, zusammen mit dem eingegebenen Passwort. Zusätzlich wird
      der Dienststellenschlüssel als weiterer Salt verwendet um eine Entschlüsselung ohne korrektes Passwort - nach heutigem Stand - unmöglich zu machen.
    </p>
    <p>
      Da das eingegebene Passwort lediglich auf dem Client verbleibt, wird auch die Ver- und Entschlüsselung auf dem Client durchgeführt. Weder auf dem Server noch auf dem Übertragungsweg besteht somit
      die Möglichkeit, diese Daten zu entschlüsseln! Ein vergessenes Passwort bedeutet deshalb auch einen kompletten Datenverlust.
    </p>
    <p><b>Verschlüsselte</b> Schülerdaten sind:</p>
    <ul>
      <li>Name</li>
      <li>E-Mail-Adresse</li>
      <li>Geburtsdatum (optional)</li>
      <li>Klasse</li>
      <li>Gruppenzugehörigkeit</li>
    </ul>
    <p></p>
    <p>
      Werden die Test-Bestätigungen verschickt, so werden einige Daten unverschlüsselt auf den Server übertragen, damit dort die Bestätigungen erstellt und verschickt werden können.
      <span style="font-size:85%;font-style: italic">(Anmerkung: Die Kommunikation an sich ist hierbei natürlich weiterhin TLS-Verschlüsselt. Nur der Server empfängt diese Daten.)</span>
    </p>
    <p>Hier wird <b>unverschlüsselt übertragen</b>:</p>
    <ul>
      <li>Name</li>
      <li>E-Mail-Adresse</li>
      <li>ggf. Geburtsdatum</li>
    </ul>
    <p></p>
    <p>Diese Daten werden jedoch nur genutzt, um die Bestätigungen zu erstellen und zu verschicken. Auf dem Server <b>unverschlüsselt gespeichert</b> wird hiervon lediglich:</p>
    <ul>
      <li>Name</li>
      <li>Testzeitpunkt</li>
      <li>Schule</li>
    </ul>
    <p>
      Diese Daten dienen zur Verifizierung der ausgestellten Bescheinigungen mittels QR-Code/Link. Externe Personen/Dienstleister können - mittels dem auf der Bescheinigung
      gedruckten QR-Code/Link - diese verifizieren, um nachzuprüfen, ob diese (noch) gültig ist oder gefälscht wurde.
    </p>
    <p>Weder die erstellten Bestätigungen, noch die verschickten E-Mails werden gespeichert.</p>
    <h2>Löschfristen</h2>
    <p>
      Die im letzten Abschnitt genannten, unverschlüsslt gespeicherten Daten dienen zur Verifizierung durch externe Personen. Da ein Testergebnis eines Schnelltests lediglich 24 Stunden
      gültig ist, werden diese Daten auch 24 Stunden - technisch bedingt bis zu 25 Stunden möglich - nach dem Testzeitpunkt gelöscht.
    </p>
    <p>
      Löst eine Schule einen Zugang auf, so werden alle damit verbundenen Daten sofort gelöscht.
    </p>
    <h2>Quellcode</h2>
    <p>Der Quellcode des gesamten Systems ist auf GitHub einsehbar:</p>
    <ul>
      <li><a href="https://github.com/dsjiern/SelbsttestSchuleClient" target="_blank">Client</a></li>
      <li><a href="https://github.com/dsjiern/SelbsttestSchuleServer" target="_blank">Server</a></li>
    </ul>
  </v-container>
</template>

<script>
export default {
  name: 'Datenschutz'
}
</script>

## Step 1 – Sortieren und Löschen

### What was new to me
- Wenn man Einträge löschen will, muss die Reihenfolge auf der Seite zur
  Reihenfolge im Array passen. Deshalb wird das `runs`-Array selbst sortiert
  und nicht nur die Anzeige.
- Mit `confirm()` kann man vor einer Aktion, die man nicht rückgängig machen
  kann, ganz einfach nachfragen.

### New things I did learn
- Datum + Uhrzeit als Text im Format "2026-11-21 18:00" lassen sich direkt
  vergleichen und sortieren (`localeCompare`), ohne Date-Objekte.
- Doppelten Code (die drei `show...`-Aufrufe) in eine Funktion
  (`showAllSections`) zusammenfassen macht spätere Änderungen leichter.

## Step 2 – Wochenübersicht, Notizen, Export/Import

### What was new to me
- Eine Datei direkt im Browser erzeugen und herunterladen (`Blob` + Link mit
  `download`), ganz ohne Server.
- Eine Datei, die der Nutzer auswählt, mit `FileReader` einlesen.
- Der Browser kann alte Versionen von HTML/JS im Cache behalten. Nach
  Änderungen hilft ein harter Reload (Cmd+Shift+R).

### New things I did learn
- Daten von außen (Import) darf man nicht einfach übernehmen. Man muss jedes
  Feld prüfen (Datum, Uhrzeit, km > 0, Schmerz 1–10), sonst landen kaputte
  Daten im Speicher.
- Leere Wochen findet man nur, wenn man selbst Woche für Woche weiterzählt
  (+7 Tage). Aus den gespeicherten Läufen allein sieht man sie nicht.
- Prozentveränderung: (diese Woche − Vorwoche) / Vorwoche × 100. Durch 0
  teilen muss man abfangen.

## Step 6 – Schmerz-Schieberegler

### What was new to me
- Ein Schieberegler (`<input type="range">`) ist cool und richtig nützlich:
  Man wählt den Schmerz-Wert mit einem Wisch statt eine Zahl zu tippen. Das geht
  am Handy viel schneller, und durch die Live-Farbe (grün/gelb/rot) sieht man
  sofort, wo man steht.
- Mit `accent-color` in CSS kann man die Farbe des Reglers ganz einfach ändern.

### New things I did learn
- Ein Regler hat immer einen Wert, er kann nicht „leer“ sein. Damit er trotzdem
  ein Pflichtfeld ist, merkt man sich, ob er berührt wurde, und blockiert vorher
  das Speichern mit `setCustomValidity`.

## Arbeiten mit KI
- Die Regeln in `AGENTS.md` (einfacher Code, nur das Verlangte umsetzen)
  haben gut funktioniert: Die KI hat erst Ideen vorgeschlagen und erst nach
  meinem OK umgesetzt.
- `PROGRESS.md` als Gedächtnis zu führen hilft, weil man später sieht, was
  gemacht wurde und warum (Decisions).
- Kleine Schritte und nach jedem Schritt committen machen es leicht,
  Änderungen nachzuvollziehen oder zurückzunehmen.
- Ich habe zwei KI-Tools ausprobiert (Copilot und Claude). Was mir dabei
  aufgefallen ist: Claudo Pro Code Opus 5.5 ist echt gut!

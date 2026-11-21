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

## Arbeiten mit KI
- Die Regeln in `AGENTS.md` (einfacher Code, nur das Verlangte umsetzen)
  haben gut funktioniert: Die KI hat erst Ideen vorgeschlagen und erst nach
  meinem OK umgesetzt.
- `PROGRESS.md` als Gedächtnis zu führen hilft, weil man später sieht, was
  gemacht wurde und warum (Decisions).
- Kleine Schritte und nach jedem Schritt committen machen es leicht,
  Änderungen nachzuvollziehen oder zurückzunehmen.
- Ich habe zwei KI-Tools ausprobiert (Copilot und Claude). Was mir dabei
  aufgefallen ist: …

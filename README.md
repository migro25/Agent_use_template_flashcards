return to sport Lauftagebuch

# Usage: 
Öffne index.html in Browser ode ein VSCode preview. 
# Daten sichern (Export/Import)
Unter „Daten sichern“ kann man alle Läufe als `.json`-Datei exportieren und
wieder importieren (über „Datei auswählen“ oder per Drag & Drop).
Beim Import werden die aktuellen Läufe nach einer Rückfrage ersetzt.

## Aufbau der Datei
Am einfachsten einmal exportieren und die Datei anschauen. Beispiel:

```json
[
  {
    "date": "2026-11-10",
    "time": "08:00",
    "kilometers": 4,
    "pain": 2,
    "note": ""
  },
  {
    "date": "2026-11-17",
    "time": "07:00",
    "kilometers": 5.5,
    "pain": 5,
    "note": "Sprunggelenk ab km 3 gespürt"
  }
]
```

| Teil | Muss so sein | Beispiel | Falsch wäre |
|---|---|---|---|
| Ganze Datei | eine Liste in eckigen Klammern `[ … ]` | `[ {…}, {…} ]` | ein einzelner Lauf ohne `[ ]` |
| `date` | Text im Format `JJJJ-MM-TT` | `"2026-11-17"` | `"17.11.2026"` |
| `time` | Text im Format `HH:MM` | `"07:00"` | `"7:00"`, `"07:00:00"` |
| `kilometers` | Zahl größer als 0, Punkt statt Komma, ohne Anführungszeichen | `5.5` | `"5,5"`, `0`, `-3` |
| `pain` | ganze Zahl von 1 bis 10 | `5` | `5.5`, `0`, `11`, `"5"` |
| `note` | optional, Text | `"Sprunggelenk gespürt"` | – (darf fehlen) |

## Typische Fehler beim Bearbeiten von Hand
- Feldnamen und Texte brauchen doppelte Anführungszeichen (`"date"`), keine einfachen.
- Nach dem letzten Eintrag einer Liste oder eines Objekts steht kein Komma.
- Zahlen mit Punkt (`5.5`) und ohne Anführungszeichen schreiben.

## Gut zu wissen
- Die Reihenfolge der Läufe ist egal, die Seite sortiert sie selbst.
- Ist ein einziger Lauf ungültig, wird die ganze Datei abgelehnt und die
  bisherigen Läufe bleiben erhalten (`isValidRun` in `script.js`).

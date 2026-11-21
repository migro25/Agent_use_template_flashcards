# Progress
Website konnte gut erstellt werden, die Funktionen führte Co-Pilot so aus, wie ich es wollte. 

## Done
- Ein einfaches Lauftagebuch mit Datum, Uhrzeit, Distanz und Schmerz-Wert von 1 bis 10 erstellt.
- Datum und Uhrzeit werden beim Öffnen des Formulars vorausgefüllt; Pflichtfelder und Wertebereiche werden geprüft.
- Schmerz-Werte werden als Grün (1–3), Gelb (4–6) oder Rot (7–10) angezeigt.
- Läufe werden im Browser in `localStorage` gespeichert und nach dem Neuladen wieder angezeigt.
- Laufverlauf und Kilometer pro Kalenderwoche (Montag bis Sonntag) werden angezeigt.
- Wochenkilometer und Schmerzverlauf werden zusätzlich als Balkendiagramme dargestellt.
- Läufe werden nach Datum und Uhrzeit sortiert (`sortRuns`), auch wenn sie nachträglich eingetragen werden. Liste: neuester zuerst, Schmerzgrafik: ältester zuerst.
- Jeder Lauf hat einen „Löschen“-Button mit Sicherheitsabfrage (`deleteRun`, `createDeleteButton`). Danach werden Liste, Wochenübersicht, Grafiken und `localStorage` aktualisiert.

## Next
was könnte man verbessern? was wären noch hilfreiche Features?
-> brainstormen

Umsetzung jetzt (mit Claude) – erledigt, siehe Done:
1. Läufe nach Datum und Uhrzeit sortieren: Auch nachträglich eingetragene Läufe sollen an der richtigen Stelle in der Liste und in der Schmerzgrafik erscheinen (Liste: neuester zuerst, Grafik: ältester zuerst).
2. Läufe löschen: Jeder Lauf in der Liste bekommt einen „Löschen“-Button mit Sicherheitsabfrage. Danach werden Liste, Wochenübersicht, Grafiken und Speicher aktualisiert.

Weitere Ideen für später:
- Leere Wochen (ohne Lauf) in der Wochenübersicht anzeigen
- Notizfeld pro Lauf
- Veränderung der Wochenkilometer zur Vorwoche anzeigen
- Durchschnittlicher Schmerz pro Woche
- Export/Import der Läufe als Datei




## Decisions & notes
- Das `runs`-Array wird selbst sortiert (nicht nur die Anzeige). So passt die Position eines Laufs in der Liste immer zum Index im Array, und der Löschen-Button entfernt sicher den richtigen Lauf.
- Löschen fragt mit `confirm()` nach, weil ein gelöschter Lauf nicht wiederhergestellt werden kann.

## Known problems
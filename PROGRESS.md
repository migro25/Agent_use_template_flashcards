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
- Leere Wochen (Pausen) werden in der Wochenübersicht gestrichelt mit „0 km · kein Lauf“ angezeigt, ebenso mit 0 km im Wochenkilometer-Diagramm (`getAllWeekStarts`, `getNextWeekStart`).
- Pro Woche wird die Veränderung zur Vorwoche in Prozent angezeigt, z. B. „+15 % zur Vorwoche“, als reine Info (`describeWeekChange`). Hatte die Vorwoche 0 km, wird nichts angezeigt.
- Pro Woche wird der durchschnittliche Schmerz als farbiges Badge angezeigt, z. B. „Ø Schmerz 3,5/10 (Gelb)“ (`calculateWeeklyStats`, `createAveragePainBadge`).
- Optionales Notizfeld pro Lauf (max. 200 Zeichen). Die Notiz steht in der Laufliste unter dem Lauf.
- Bereich „Daten sichern“: Läufe als `.json`-Datei exportieren und wieder importieren (`exportRuns`, `importRuns`). Der Import prüft die Datei und ersetzt nach Rückfrage die aktuellen Läufe.

## Next
was könnte man verbessern? was wären noch hilfreiche Features?
-> brainstormen

Umsetzung jetzt (mit Claude) – erledigt, siehe Done:
1. Läufe nach Datum und Uhrzeit sortieren: Auch nachträglich eingetragene Läufe sollen an der richtigen Stelle in der Liste und in der Schmerzgrafik erscheinen (Liste: neuester zuerst, Grafik: ältester zuerst).
2. Läufe löschen: Jeder Lauf in der Liste bekommt einen „Löschen“-Button mit Sicherheitsabfrage. Danach werden Liste, Wochenübersicht, Grafiken und Speicher aktualisiert.

Zweiter Schritt (mit Claude) – erledigt, siehe Done:
3. Leere Wochen (ohne Lauf) in der Wochenübersicht anzeigen
4. Notizfeld pro Lauf
5. Veränderung der Wochenkilometer zur Vorwoche anzeigen
6. Durchschnittlicher Schmerz pro Woche
7. Export/Import der Läufe als Datei




## Decisions & notes
- Das `runs`-Array wird selbst sortiert (nicht nur die Anzeige). So passt die Position eines Laufs in der Liste immer zum Index im Array, und der Löschen-Button entfernt sicher den richtigen Lauf.
- Löschen fragt mit `confirm()` nach, weil ein gelöschter Lauf nicht wiederhergestellt werden kann.
- Die Wochenübersicht zeigt jetzt alle Wochen von der ersten Laufwoche bis zur aktuellen Woche, also mehr als in der SPEC verlangt (dort: aktuelle Woche + Wochen mit Läufen). Grund: Pausen sollen sichtbar sein.
- Die Farbe des Wochen-Durchschnitts wird aus dem gerundeten Durchschnitt berechnet (3,5 → 4 → Gelb), damit dieselben Grenzen wie bei einzelnen Läufen gelten.
- Import ersetzt alle Läufe statt sie hinzuzufügen. So entstehen keine doppelten Einträge, wenn man dieselbe Datei zweimal importiert. Vorher kommt eine Rückfrage.
- Die Notiz ist optional. Ältere Läufe ohne Notiz funktionieren weiter.

## Known problems
- Wenn man nach dem Ändern der Dateien nur normal neu lädt, kann der Browser noch die alte Version aus dem Cache zeigen. Dann hilft ein harter Reload (Cmd+Shift+R).
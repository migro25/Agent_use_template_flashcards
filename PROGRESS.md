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
- Die aktuelle Woche zeigt „Woche läuft noch“ statt eines Vergleichs zur Vorwoche, weil eine halbe Woche sonst wie ein Einbruch aussieht (`getWeekStatusText`).
- Im Datumsfeld können keine Tage nach heute gewählt werden (`max` am Datumsfeld).
- Löschen-Buttons haben ein `aria-label` wie „Lauf vom 17.11.2026 um 07:00 löschen“, damit Screenreader sagen, welcher Lauf gelöscht wird.
- Die Diagramme sind jetzt Säulendiagramme mit Zeitachse nach rechts: links die älteste Woche bzw. der älteste Lauf, rechts die neuesten (`createChartColumn`). Bei vielen Säulen scrollt das Diagramm seitlich in seinem eigenen Kasten und startet ganz rechts bei den neuesten Werten (`scrollChartToNewest`).
- Kennzahl-Karten unter dem Titel: „Diese Woche“, „Läufe gesamt“, „Ø Schmerz (4 Wo.)“ mit Farbgruppe und „Längster Lauf“ (`showStats`, `showRecentAveragePain`, `getLongestRun`). Die Zeile „Diese Woche: … km“ in der Wochenübersicht ist dafür weggefallen.
- Diagramme: Skala links mit Maximum, Hälfte und 0 (`createChartAxis`), Hilfslinien bei 25/50/75/100 %, Säulen wachsen beim Laden animiert nach oben, die aktuelle Woche ist dunkler und fett beschriftet (`createWeekColumn`), und beim Drüberfahren wird die Säule betont.
- Neuer Look: Kopfbereich mit grünem Farbverlauf, Systemschrift, weichere Schatten und runde Ecken. Die Karten blenden beim Laden nacheinander ein.
- Dark Mode, der sich automatisch nach der Einstellung von Mac oder Handy richtet. Alle Farben stehen dafür als Variablen am Anfang von `style.css`.
- Wer in den Systemeinstellungen „Bewegung reduzieren“ aktiviert hat, bekommt keine Animationen.
- Läufe bearbeiten: Jeder Lauf hat einen „Bearbeiten“-Button. Der Lauf wird ins Formular geladen („Lauf bearbeiten“, „Änderung speichern“, „Abbrechen“) und in der Liste grün umrandet (`startEditing`, `stopEditing`, `cancelEditing`, `saveRunFromForm`).
- Der Schmerz-Wert wird mit einem Schieberegler (1–10) gewählt. Er färbt sich live grün/gelb/rot. Solange er nicht berührt wurde, ist er grau und das Formular lässt sich nicht speichern (`choosePain`, `resetPainChoice`).
- Beschädigte gespeicherte Daten legen die Seite nicht mehr lahm: Ungültige Einträge werden übersprungen, die Originaldaten werden unter `runs-backup` gesichert und es erscheint eine Meldung (`readRunsFromStorage`, `backupBrokenData`).
- Auf dem Handy stehen Schmerz-Badge und Buttons unter dem Lauftext, damit der Text Platz hat.

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

Dritter Schritt (mit Claude) – erledigt, siehe Done:
- Laufende Woche nicht mit der Vorwoche vergleichen
- Keine Läufe in der Zukunft eintragen
- Verständliche Löschen-Buttons für Screenreader

Vierter Schritt (mit Claude) – erledigt, siehe Done:
- Diagramme als Säulen mit Zeitachse nach rechts statt Zeilen untereinander

Fünfter Schritt (mit Claude) – erledigt, siehe Done:
- Kennzahl-Karten oben
- Diagramme aufwerten (Skala, Hilfslinien, Animation, aktuelle Woche)
- Header und Gesamtlook
- Dark Mode

Sechster Schritt (mit Claude) – erledigt, siehe Done:
- Lauf bearbeiten
- Schmerz als Schieberegler
- Seite stürzt bei kaputtem Speicher nicht mehr ab

Weitere Ideen für später:
- Strava-Anbindung, damit Läufe automatisch kommen und man nur den Schmerz einträgt. Eine echte automatische Synchronisierung braucht einen Server, weil Strava ein geheimes Client Secret verlangt, das nicht in öffentliches HTML/JS darf. Das passt nicht zur SPEC (kein Server, keine Synchronisierung). Ohne Server ginge ein Import der Datei `activities.csv` aus dem Strava-Datenexport; danach trägt man bei jedem Lauf nur noch den Schmerz nach.
- „Rückgängig“ nach dem Löschen statt Nachfrage
- Begrüßungskarte, wenn noch keine Läufe da sind
- Doppelte Läufe (gleiches Datum und Uhrzeit) erkennen
- Am Handy wie eine App nutzen (PWA, braucht 2 neue Dateien)
- Lange Listen kürzen (z. B. nur die letzten 8 Wochen, Rest über „Alle anzeigen“)
- Kalenderwoche anzeigen („KW 47“)
- Dauer eintragen und Pace (min/km) berechnen
- Schmerz am Folgetag erfassen (weicht von der SPEC ab)
- Erinnerung an den letzten Export
- Tippfehler im README korrigieren („ode ein“ → „oder in“)




## Decisions & notes
- Das `runs`-Array wird selbst sortiert (nicht nur die Anzeige). So passt die Position eines Laufs in der Liste immer zum Index im Array, und der Löschen-Button entfernt sicher den richtigen Lauf.
- Löschen fragt mit `confirm()` nach, weil ein gelöschter Lauf nicht wiederhergestellt werden kann.
- Die Wochenübersicht zeigt jetzt alle Wochen von der ersten Laufwoche bis zur aktuellen Woche, also mehr als in der SPEC verlangt (dort: aktuelle Woche + Wochen mit Läufen). Grund: Pausen sollen sichtbar sein.
- Die Farbe des Wochen-Durchschnitts wird aus dem gerundeten Durchschnitt berechnet (3,5 → 4 → Gelb), damit dieselben Grenzen wie bei einzelnen Läufen gelten.
- Import ersetzt alle Läufe statt sie hinzuzufügen. So entstehen keine doppelten Einträge, wenn man dieselbe Datei zweimal importiert. Vorher kommt eine Rückfrage.
- Die Notiz ist optional. Ältere Läufe ohne Notiz funktionieren weiter.
- Für die Schrift wird die Systemschrift (`system-ui`) verwendet statt einer Google-Schrift. So braucht die Seite keine externen Dateien und lädt auch offline.
- Ein Schieberegler hat immer einen Wert (Start: 5). Damit der Schmerz-Wert trotzdem ein Pflichtfeld bleibt, merkt sich `painWasChosen`, ob der Regler berührt wurde. Vorher meldet `setCustomValidity` beim Speichern „Bitte wähle mit dem Regler einen Schmerz-Wert.“
- Beim Löschen oder Importieren wird ein offenes Bearbeiten beendet, weil sich dabei die Positionen in der Liste verschieben und sonst der falsche Lauf überschrieben werden könnte.
- Die Seite bleibt einspaltig, wie es die SPEC verlangt. Nur die Kennzahl-Karten stehen nebeneinander (2 auf dem Handy, 4 am Computer).

## Known problems
- Wenn man nach dem Ändern der Dateien nur normal neu lädt, kann der Browser noch die alte Version aus dem Cache zeigen. Dann hilft ein harter Reload (Cmd+Shift+R).
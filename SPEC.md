# Spec Sheet: Return to Sport – Lauftagebuch

## Ziel
Eine einfache Website, auf der eine Person Läufe und den dazugehörigen Schmerz-Wert eintragen kann. Die Website zeigt den Laufverlauf und die gelaufenen Kilometer pro Kalenderwoche.

## Zielgruppe
Eine Person, die nach einer Sportpause ihre Läufe dokumentieren möchte.

## Funktionen

1. Einen Lauf mit Datum, Uhrzeit, Distanz in Kilometern und einem Schmerz-Wert eintragen.
2. Datum und Uhrzeit beim Öffnen des Formulars mit der aktuellen lokalen Zeit vorbelegen.
3. Schmerz-Werte ganzzahlig von 1 bis 10 erfassen und farblich einordnen:
   - 1–3: Grün
   - 4–6: Gelb
   - 7–10: Rot
4. Eine Vorschau der Schmerz-Farbe während der Eingabe anzeigen.
5. Gespeicherte Läufe mit Datum, Uhrzeit, Distanz und farblich markiertem Schmerz-Wert auflisten.
6. Kilometer pro Kalenderwoche zusammenrechnen. Die Woche beginnt am Montag und endet am Sonntag. Die aktuelle Woche und Wochen mit gespeicherten Läufen werden angezeigt.
7. Läufe im Browser speichern, sodass sie nach einem Neuladen der Seite erhalten bleiben.

## Abnahmekriterien

- Datum, Uhrzeit, Distanz und Schmerz-Wert sind Pflichtfelder.
- Die Distanz muss größer als 0 km sein.
- Der Schmerz-Wert muss eine ganze Zahl zwischen 1 und 10 sein.
- Nach einem gültigen Eintrag erscheint der Lauf im Verlauf, die Wochenkilometer werden aktualisiert und Distanz sowie Schmerz-Eingabe werden geleert.
- Die Schmerz-Farbe entspricht für die Grenzwerte 3, 4, 6 und 7 jeweils der festgelegten Farbgruppe.
- Läufe von Montag bis Sonntag werden derselben Woche zugeordnet; ein Lauf am folgenden Montag zählt zur nächsten Woche.
- Gespeicherte Läufe und Wochenwerte sind nach einem Neuladen weiterhin vorhanden.

## Technik

- Nur HTML, CSS und JavaScript.
- Dateien: `index.html`, `style.css` und `script.js`.
- Keine Frameworks, Bibliotheken, Node.js, npm oder Build-Tools.
- Speicherung ausschließlich im Browser mit `localStorage`; kein Server und keine Datenbank.

## Darstellung und Umfang

- Einfache, gut lesbare und einspaltige Oberfläche.
- Schmerz-Farben erhalten zusätzlich Textbeschriftungen, damit die Einstufung nicht allein von der Farbe abhängt.
- Die Farben dienen nur zur visuellen Einordnung der eingegebenen Werte und stellen keine medizinische Bewertung dar.
- Keine Anmeldung, keine Synchronisierung und keine medizinischen Empfehlungen.
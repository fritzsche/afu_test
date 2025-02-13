# Simulator für Lizenzprüfung (ab 24.6.2024)
Dieses kleine Programm(Website) generiert per Zufallsgenerator Fragen und Antworten für die Amateurfunkprüfung (gültig ab 24.5.2024).

Es gibt ein Version für den Druck (Papier) und eine Version für das Bearbeiten am Bildschirm.

* Ausdrucken: https://fritzsche.github.io/afu_test/
* Bildschirm: https://fritzsche.github.io/afu_test/online.html

Es können jeweils 25 Fragen (mit Antworten) für die folgenden Prüfungsteile generiert werden:

1) Vorschriften
2) Betriebstechnik
3) Technik Klasse N
4) Technik Klasse E
5) Technik Klasse A

__Achtung:__ Bei jedem Aufruf (auch Reload) wird ein neuer Fragebogen per Zufallsgenerator erzeugt.

# Youtube
Ein Bericht auf dem Youtube Kanal Funkwelle über AFU-Test. 
(*Anmerkung*: Dieses Video bezieht sich auf eine alte Version von AFU-Test und ist nicht mehr aktuell):

[![Video Funkwelle](https://img.youtube.com/vi/dTlOy99aC1A/0.jpg)](https://www.youtube.com/watch?v=dTlOy99aC1A)

# Erfahrung und Ausblick
AFU-Test wurde in wenigen Tagen entwickelt und zum Start der Klasse N bereits auf der HAM Radio 2024 mit Erfolg(!) von DN9KEN und DN9KAI zur Prüfungsvorbereitung getestet. 
Auswahl der Fragen und Formatierung kommen einem echten Test bei der BNetzA (Erfahrungsbericht) bereits sehr nahe.

In der Praxis hat sich vor allem die (bislang im Quelltext versteckte) Funktion zur gezielten Generierung von Fragen als nützlich erwiesen (z.B. besonders schwere Fragen) und soll als nächstes in dem Projekt einfach nutzbar gemacht werden. Über weitere Ideen / Anregungen / Wünsche freue ich mich. Gerne als Github Issue oder Github-Pull-Request.

# Prüfungsfragen

## Quelle 
Die Fragen die hier zum Einsatz kommen sind von der Bundesnetzagentur am 16.6.2024 in der maschienenlesbaren Version heruntergeladen worden.
Dies entspricht der 3. Auflage, März 2024.
Der Fragenkatalog wird unverändert verwendet, allerdings wurde ein Formatierungsfehler in Frage AF305 behoben (siehe Commit in Github).

https://www.bundesnetzagentur.de/995320

Die Fragen, die in einem echten Test zum Einsatz ausgewählt werden sind unbekannt.

## DARC 50&#8486; Lernplattform
Ursprünglich konnte mit Afu-Test entsprechend der realen Prüfung bei der BNetzA nur der Prüfungsteil (z.B. Vorschriften oder Betriebstechnik) ausgewählt werden. Dadurch konnte Afu Test erst zur finalen Prüfungsvorbereitung verwendet werden.
Mit Version 0.15 gibt es jetzt die Möglichkeit begleitend zur DARC 50Ohm.de Lernplattform zu üben. Wenn der Modus "DARC 50&#8486;" ausgewählt wurde, wird nicht mehr der Prüfungsteil ausgewählt, sondern das individuelle Lernziel (z.B. Klasse N) und die Kapitel auf 50Ohm. 
Es werden nur Fragen aus den Ausgewählten 5050&#8486; Kapitel berücksichtigt. 

## Auswahl der Fragen
Die Fragen werden mittels Zufallsgenerator ausgewählt. Die Auswahl ist nicht ganz zufällig: 
Alle sortierten Fragen eines Prüfungsteils werden in 25 gleich große Pakete unterteilt für jede Frage ein Paket. Aus jedem Paket wird dann per Zufallsgenerator eine Frage ausgewählt. Du bekommst also Fragen aus allen Teilen des Kataloges.

Auch die BnetzA wird vermutlich auch möglichst viele Bereiche des Prüfungskataloges testen.

# Beta Code
Der Code wurde unter Zeitdruck (nahe Prüfung) in kurzer Zeit entstanden. 
Ich teste die App aktuell nur mit Google Chrome Browser.
Keine Garantie!

# Versionen
* 0.16 - (14. Februar 2025) Es ist nun möglich die Anzahl der Fragen zu verwenden + Kleine Korrekturen.
* 0.15 - (10. Februar 2025) Mit Afu Test kann jetzt entlang der DARC Lernplattform 50&#8486; gelernt werden. Diese Funktionen sollen den aktuell gestarteten Klasse-N Kurs des OV A02 Bruchsal unterstützen. Vielen Dank an Prof. Dr. Matthias Jung (DL9MJ) für die Informationen über die 50&#8486; Kapitel.
* 0.14 - (31. Dezember 2024) Fix: Der Firefox Browser einige Fragen nicht als SVG darstellen, so dass für diese Fragen Grafiken im PNG Format verwendet werden.
Grafiken: BE207, BE208, BE209, NE209, NF101, NF102, NF103, NF104, NF105, NF106, NG302
* 0.13 - (7. Oktober 2024) Aufräumen: Entferne JSONPath Bibliothek als Abhängigkeit (Verwendet Object.entries).
* 0.12 - (6. Oktober 2024) Restrukturierung des Programms, in der Online Version wird die Anzahl der unbeantworteten Fragen angezeigt. Das Ergebnis der Bildschirmauswertung wird mit stärker sichtbaren Farben angezeigt, damit falsche Antworten einfacher zu finden sind.
* 0.11 - (4. Oktober 2024) Druckoptionen mit denen Seitenumbruch in Fragen verhindert und mehr Abstände eingefügt werden können (bessere Optik aber mehr Papierverbrauch)
* 0.10 - (4. Oktober 2024) Ausgewählter Prüfungsteil bleibt bei einem reload ausgewählt.
* 0.09 - (3. Oktober 2024) Javascript wird als Module geladen + kleine Fehler im "Strict" Modus behoben.
* 0.08 - (25. Juni 2024) Fix: Auswahl Prüfungsteil + undokumentiertes Feature: URL query parameter um individuelle Test zu erzeugen.
* 0.07 - (22. Juni 2024) Zufallsgenerator wird Fragen gleichmäßiger über den Fragenkatalog verteilt auswählen.
* 0.06 - (22. Juni 2024) Verbesserung der Online Version mit Flex-Layout für mobile Geräte.
* 0.05 - (21. Juni 2024) Die Fragebögen können jetzt direkt am Bildschirm beantwortet werden.
* 0.04 - (20. Juni 2024) Bildskalierung etwas verbessert.
* 0.03 - (19. Juni 2024) Prüfungsteile können separat generiert werden + Technik E + Technik A.
* 0.02 - (17. Juni 2024) Verwende KaTeX um Formeln korrekt auszugeben.
* 0.01 - (16. Juni 2024) Initiale Version.

# Lizenzen
* Der Fragenkatalog wird unter der Lizenz der BNetzA weitergegeben: [https://www.govdata.de/dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0)
* Die Bibliothek KaTeX unterlieft der MIT Lizenz.
* Das Projekt selbst unterliegt der Public Domain (Unlicense).
* DARC 50&#8486; ist eine unabhängige Lernplattform des DARC, seit Version 0.15 ist es möglich die Kapitel-Struktur der Lernplattform bei der Auswahl der Fragen zu berücksichtigen. Vielen Dank an Prof. Dr. Matthias Jung (DL9MJ) für die Bereitstellung der Meta-Daten.


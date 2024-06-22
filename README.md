# Simulator für Lizenzprüfung (ab 24.6.2024)
Dieses kleine Programm(Website) generiert per Zufallsgenerator Fragen und Antworten für die Amateufunkprüfung (gültig ab 24.5.2024).

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


# Prüfungsfragen
Die Fragen die hier zum Einsatz kommen sind von der Bundesnetzagentur am 16.6.2024 in der maschienenlesbaren Version heruntergeladen worden.
Dies entspricht der 3. Auflage, März 2024.
Der Fragenkatalog wird unverändert verwendet, allerdings wurde ein Formatierungsfehler in Frage AF305 behoben (siehe Commit in Github).

https://www.bundesnetzagentur.de/995320

Die Fragen, die in einem echten Test zum Einsatz kommen, können natürlich abweichen. Wie beschrieben, werden die Fragen für die einzelnen Prüfungsteile (und die Reihenfolge der Antworten) per Zufallsgenerator bestimmt. 


# Beta Code
Der Code wurde unter Zeitdruck (nahe Prüfung) in kurzer Zeit entstanden. 
Ich teste die App aktuell nur mit Google Chrome Browser.
Keine Garantie!

# Version
* 0.06 - (22. Juni 2024) Verbesserung der Online Version mit Flex-Layout für mobile Geräte.
* 0.05 - (21. Juni 2024) Die Fragebögen können jetzt direkt am Bildschirm beantwortet werden
* 0.04 - (20. Juni 2024) Bildskalierung etwas verbessert
* 0.03 - (19. Juni 2024) Prüfungsteile können separat generiert werden + Technik E + Technik A
* 0.02 - (17. Juni 2024) Verwende KaTeX um Formeln korrekt auszugeben
* 0.01 - (16. Juni 2024) Initiale Version

# Lizenzen
* Der Fragenkatalog wird unter der Lizenz der BNetzA weitergegeben: [https://www.govdata.de/dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0)
* Die Bibliothek JSONPath unterliegt MIT Lizenz.
* Die Bibliothek KaTeX unterlieft der MIT Lizenz.
* Das Projekt selbst unterliegt der Public Domain (Unlicense).


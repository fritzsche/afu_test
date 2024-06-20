# Generiere Fragebögen für die Lizenzprüfung zur Afu Klasse N
Dieses kleine Programm(Website) generiert per Zufallsgenerator Fragen und Antworten für die Amateufunkprüfung der Klasse N.

Achtung: Bei jedem Aufruf (auch Reload) wird ein neuer Fragebogen per Zufallsgenerator erzeugt.
Link: https://fritzsche.github.io/afu_test/

Es können jeweils 25 Fragen (mit Antworten) für die folgenden Prüfungsteile generiert werden:
1) Vorschriften
2) Betriebstechnik
3) Technik Klasse N
4) Technik Klasse E
5) Technik Klasse A

Die Ausgabe ist aktuell für den Druck bestimmt (Papier). Die Lösungen werden beim Druck auf eine separate Seite gedruckt. Um Papier zu sparen kannst Du auch zunächst NUR in ein PDF drucken.

Eine Lösung die Fragen Online (ohne Papier) zu beantworten wäre auch hilfreich wird aber aktuell (noch?) nicht unterstützt. Siehe unten: [Alpha Code](#alpha_code)

# Prüfungsfragen
Die Fragen die hier zum Einsatz kommen sind von der Bundesnetzagentur am 16.6.2024 in der maschienenlesbaren Version heruntergeladen worden.
Dies entspricht der 3. Auflage, März 2024.
Der Fragenkatalog wird unverändert verwendet, allerdings wurde ein Formatierungsfehler in Frage AF305 behoben (siehe Commit in Github).

https://www.bundesnetzagentur.de/995320

Die Fragen die tatsächlich zu Einsatz kommen können natürlich abweichen. Auch wird die Bundesnetzagentur die Fragen anders auswählen. Wie beschrieben, werden die Fragen für die einzelnen Kategorien (und die Reihenfolge der Antworten) nur mit dem Zufallsgenerator bestimmt. 


# Alpha Code
Der Code wurde unter Zeitdruck (nahe Prüfung) in 1-2 Stunden zusammengeschustert. Es ist ein Wunder, dass er überhaupt funktioniert. Keine Garantie, dass dies auch bei Dir so ist.

# Version
* 0.04 - (20. Juni 2024) Bildskalierung etwas verbessert
* 0.03 - (19. Juni 2024) Prüfungsteile können separat generiert werden + Technik E + Technik A
* 0.02 - (17. Juni 2024) Verwende KaTeX um Formeln korrekt auszugeben
* 0.01 - (16. Juni 2024) Initiale Version

# Lizenzen
* Der Fragenkatalog wird unter der Lizenz der BNetzA weitergegeben: [https://www.govdata.de/dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0)
* Die Bibliothek JSONPath unterliegt MIT Lizenz.
* Die Bibliothek KaTeX unterlieft der MIT Lizenz.
* Das Projekt selbst unterliegt der Public Domain (Unlicense).


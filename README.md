# ShopAdmin-Demo Angular-Client

Für eine kleine Shop-Verwaltung Demo die ich gebastelt habe ist dies das Frontend.

Zu diesem Frontend gibt es ein passendes Backend (mit SpringBoot). Das Repository "shopDemoBackend" dazu findet ihr auch auf meiner GitHub-Seite.

Mit dieser kleinen Demo-App können verschiedene Fachobjekte gepflegt werden (CRUD-Operationen). Die passenden REST-Services werden vom Backend bereitgestellt.

## Features

* CRUD-Operationen für verschiedene Entitäten, Übersichtsdarstellung in Tabelle und Detailansichten über Dialog
* Verwendet angular/material
* Pflege und Neuanlage einer Entität erfolgen über den gleichen Dialog
* Löschen Aktion muss über Sicherheitsabfrage bestätigt werden

## Kurzbeschreibung Fachlichkeit

* Kunden (Customers) können gepflegt werden, alle CRUD-Operationen werden bereitgestellt.
* Kunden können mehrere Adressen haben. Adressen können nur angelegt und gelöscht werden.
* Es gibt Produkte (Product), alle CRUD-Operationen werden bereitgestellt.
* Produkte können in einer Bestellung (Order) gesammelt werden. 
* Die Zuweisung von Produkten zu einer Bestellung erfolgt über ein OrderItem.
* Der Preis eines Produkts kann in einer Bestellung abweichen.

## Start

Die Anwendung kann im Entwickler-Modus gestartet werden über
```
npm start
```
(dieses führt ein np serve aus).

Die Anwendung ist dann über `http://localhost:4200/` erreichbar.
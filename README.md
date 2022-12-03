# API | EPE-M Worship Library

##  Installation

Lancer l'appli avec la commande
```
docker-compose up
```

Lancer la base de données
```
sudo docker-compose run app npm install sequelize
sudo docker-compose run app npx sequelize-cli db:migrate
```

Vos tables seront normalement crées en base de données.

Les clients suivants suivants seront disponibles aux ports suivants :

- L'API Node : port 8085
- Adminer: port 8080


Insérer des valeurs de tests en base de données : 

```
docker-compose run app npx sequelize db:seed:all
```


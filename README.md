# GetThereSafe

https://gettheresafe-flytewizard.herokuapp.com

GetTherSsafe is a Google Maps API web application to map out the safest route to your destination depending on the time of day.

https://www.victoria.ca/EN/main/online-services/open-data-catalogue.html?media=zoom&media=zoom

http://opendata.victoria.ca/

## Why?

Created for NWHacks 2016

## Awards

Won 1st Prize for Best Use of Open Data during NWHacks 2016

## Install

```bash 
pip3 install -r requirements.txt
```

## Run

```bash
python3 app.py
```

### Notes

Download the repo

Change into the directory

Install python with home-brew

pip3 install -r requirements.txt

pip3 install virtualenv

pip3 install Flask

flask run / python3 app.py

pip install python-dotenv

——

CHANGE main.py to app.py

----

Google Maps API

2 api keys 

* Backend (Private)
* Frontend (Public w/ Restrictions)

Select all options for api

Create a new project

Create a Cloud Platform Account

Activate Google Maps API

add restrictions: https://developers.google.com/maps/documentation/embed/get-api-key#key-restrictions

app API key to file / os.environ

----

https://github.com/FlyteWizard/get-there-safe/tree/update

https://able.bio/rhett/how-to-set-and-get-environment-variables-in-python--274rgt5

http://127.0.0.1:5000/

https://getbootstrap.com/docs/4.3/components/buttons/

https://kite.com/python/docs/os.environ

https://pypi.org/project/python-dotenv/

https://getbootstrap.com

https://gunicorn.org

---

postgre db

heroku create app

add-on heroku postgreql

??? create data ???
postgre locally? push to heroku?

----

Heroku Postgres Add-on -> Dev Hobby Free Tier

---

https://devcenter.heroku.com/articles/heroku-postgresql#local-setup

Install https://postgresapp.com/

Install CLI Tools https://postgresapp.com/documentation/cli-tools.html

Open PostgreSQL app

Initialize

Start

createdb gettheresafe

psql gettheresafe

CREATE TABLE coords (ID integer, LNG float, LAT float);

\copy coords FROM './citylight.csv' WITH (FORMAT csv);

TABLE coords;

heroku pg:reset

heroku pg:push mylocaldb HEROKU_POSTGRESQL_MAGENTA --app sushi

----

python3 manage.py db init

python3 manage.py db migrate

python3 manage.py db upgrade
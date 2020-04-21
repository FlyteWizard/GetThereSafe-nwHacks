# GetThereSafe

GetThereSafe is an application that uses the [Google Maps Platform](https://cloud.google.com/maps-platform/) and the [City of Victoria Open Data](http://opendata.victoria.ca) to map out the route with the most city lights.

The [original application](https://devpost.com/software/gettheresafe) was created during [nwHacks 2016](https://2016.nwhacks.io). GetThereSafe won 1st prize for "Best Use of Data Analytics to Solve a Social Problem" during [nwHacks 2016](https://2016.nwhacks.io).

## Live Demo

There is no live demo because Google Maps Platform no longer has a free tier, and pricing is too expensive for a developer making no income on an application. 

## Contributers

* [moxuz](https://github.com/moxuz)
* [FlyteWizard](https://github.com/FlyteWizard)
* [ajdeziel](https://github.com/ajdeziel)

## Getting Started

By following the instructions below, you should be able to get a local copy working and be able to deploy your own instance of the GetThereSafe application. 

### Requirements

* [git](https://git-scm.com)
* [Python 3](https://www.python.org)
  * Pip
* [Google Maps Platform Account](https://cloud.google.com/maps-platform/)
* [Heroku Account](https://www.heroku.com)
  * [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Local Development

1. Clone the repository on your local machine in your working directory and change into the gettheresafe directory.

```sh
cd working-directory

git clone git@github.com:FlyteWizard/gettheresafe.git

cd gettheresafe
```

2. Install all the dependencies with requirements.txt.

```sh
pip install -r requirements.txt

# or

pip3 install -r requirements.txt
```

3. Create a `.env` file from `.env.example`.

.env
```.env
GOOGLE_API_KEY=
DATABASE_URL=
```

4. Create a Google Maps Platform Project.

* Follow the instructions here: [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)
* Create 1 API Key for the frontend (we will secure this key before deploying).
* Create 1 API Key for the backend.

5. Add backend API Key to `.env`file. 

.env
```.env
GOOGLE_API_KEY=YOUR_SUPER_SECRET_KEY
DATABASE_URL=
```

6. Add frontend API Key to `index.html` file.

index.html
```html
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_NOT_SO_SECRET_KEY&callback=initMap" async defer></script> <!-- Google Map -->
```

7. Install Postgres App.

* Install [https://postgresapp.com/](https://postgresapp.com/)
* Install CLI Tools [https://postgresapp.com/documentation/cli-tools.html](https://postgresapp.com/documentation/cli-tools.html)
* Open Postgres App
* Initialize the Postgres App
* Start the Postgres App

8. Create a local database.

```sh
createdb gettheresafe

psql gettheresage
```

9. Populate local database with contents from `citylightsdb.csv`.

If you have new data points to add to `citylights.csv` you can add them and then run `formatcsv.py` to format the new data points.

```sh
python formatcsv.py

# or

python3 formatcsv.py
```

```psql
CREATE TABLE coords (ID integer, LNG float, LAT float);

\copy coords FROM './citylightsdb.csv' WITH (FORMAT csv);

TABLE coords;
```

10. Add database URL to `.env`file. 

.env
```.env
GOOGLE_API_KEY=YOUR_SUPER_SECRET_KEY
DATABASE_URL=postgresql://localhost/gettheresafe
```

11. Run the app locally.

```sh
flask run

# or 

python app.py

# or 

python3 app.py
```

12. Head over to [http://127.0.0.1:5000/](http://127.0.0.1:5000/) to view your application.

### Deploying

1. Add API Key restrictions to your frontend API Key. 

* Follow instructions here: [https://developers.google.com/maps/documentation/embed/get-api-key#key-restrictions](https://developers.google.com/maps/documentation/embed/get-api-key#key-restrictions)

2. Create a new app on Heroku.

```sh
heroku create gettheresafe-username
```

3. Add Heroku Postgres.

```sh
heroku addons:create heroku-postgresql:hobby-dev --app gettheresafe-username
```

4. Add your local database to the Heroku Postgres database.

Run `heroku pg:info --app gettheresafe-username` to find your database name. Replace [HEROKU_POSTGRESQL_MAGENTA] with your Heroku database name.

```sh
heroku pg:push gettheresafe HEROKU_POSTGRESQL_MAGENTA --app gettheresafe-username
```

5. Add your Heroku Postgres database URL to Heroku config vars.

```sh
heroku pg:promote HEROKU_POSTGRESQL_MAGENTA --app gettheresafe-username
```

6. Set your backend API Key in Heroku config vars.

```sh
heroku config:set GOOGLE_API_KEY=YOUR_SUPER_SECRET_KEY --app gettheresafe-username
```

7. Push app to Heroku

```sh
git push heroku master
```

## Tools

* [Bootstrap](https://getbootstrap.com)
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [Gunicorn](https://gunicorn.org)
* [Heroku](https://www.heroku.com)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
* [Heroku Add-ons: Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql)
* [Postgres App](https://postgresapp.com/)
* [Google Maps Platform](https://cloud.google.com/maps-platform/)

## Resources

* [https://devcenter.heroku.com/articles/heroku-postgresql#local-setup](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)
* [https://developers.google.com/maps/documentation/](https://developers.google.com/maps/documentation/)

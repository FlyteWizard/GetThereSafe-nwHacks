# Import googlemaps, os, json, and psycopg2
import googlemaps
import os
import json
import psycopg2

# Import fask, flask_sqlalchemy, math, and polyline.codec, dotenv
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from math import sin, cos, sqrt, atan2, radians
from polyline.codec import PolylineCodec
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

DATABASE_URL = os.getenv('DATABASE_URL')
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
gmaps = googlemaps.Client(key=GOOGLE_API_KEY)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/route', methods=['POST'])
def get_routes():
    data = request.json
    start = data['start']
    end = data['end']

    app.logger.info('%s AND %s' % (start, end))

    routes = gmaps.directions(start, end, alternatives=True)

    if not routes:
        raise Exception

    sorted_routes = _get_best_route(routes)
    return json.dumps(sorted_routes)


def _get_best_route(routes):
    from model import Coord

    # GET THE COORDS FROM DATABASE
    all_coordinates = Coord.query.all()

    light_source_coords = []
    for coord in all_coordinates:
        light_source_coords.append([float(coord.lat), float(coord.lng)])

    route_rank = []
    for route in routes:
        polyline = route['overview_polyline']['points']

        decoded_route_coords = _get_coords_from_polyline(polyline)

        # Calculate number of lightsources on the route
        light_sources = 0
        last_light_coord = None
        for coord in decoded_route_coords:
            # Get close lightsource or return None
            nearby_light_source = _get_nearby_lightsource(coord, light_source_coords)

            # Make sure the lightsource we found hasn't already been used
            if nearby_light_source and nearby_light_source != last_light_coord:
                light_sources += 1
                last_light_coord = nearby_light_source

        route_rank.append([light_sources, route, decoded_route_coords])

    # Sort the best routes
    route_rank.sort(key=lambda route: route[0], reverse=True)

    return route_rank


def _get_coords_from_polyline(polyline):
    return PolylineCodec().decode(polyline)


def _get_nearby_lightsource(coord, light_source_coords):
    # Check if any lightsource in the light_source_coords is within eight meters of the route coordinate
    for light_coord in light_source_coords:
        if _get_distance_between_points(coord, light_coord) <= 8:
            return light_coord
    return None


def _get_distance_between_points(coord_tuple_a, coord_tuple_b):
    # Taken from http://bit.ly/21AAYXb
    R = 6373.0

    # Set lat and lon to compare
    lat1 = radians(coord_tuple_a[0])
    lon1 = radians(coord_tuple_a[1])
    lat2 = radians(coord_tuple_b[0])
    lon2 = radians(coord_tuple_b[1])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    # Return distance in meters, as an integer
    return int((R * c) * 1000)


# python3 app.py
if __name__ == '__main__':
    app.run()

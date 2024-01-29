"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Clients, Motorbikes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    print(username, password)
    user = User.query.filter_by(email = username).first()
    if user and user.password == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Wrong user or password"}), 400
    
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route("/new_client", methods=["POST"])
@jwt_required()
def newClient():
    name = request.json.get("name", None)
    surname = request.json.get("surname", None)
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)
    if not name or not surname or not phone:
        return jsonify({"msg":"Fields required"}), 400
    newClient = Clients(name = name,
                        surname = surname,
                        email = email,
                        phone = phone)
    db.session.add(newClient)
    db.session.commit()
    return jsonify({"msg":"New client added", "id":newClient.id}), 201

@api.route("/clients_list", methods=["GET"])
@jwt_required()
def clients_list():
    clients_list = Clients.query.all()
    return jsonify(clients_list=[client.serialize() for client in clients_list])

@api.route("/new_motorbike", methods=["POST"])
@jwt_required()
def newMotorbike():
    brand = request.json.get("brand", None)
    model = request.json.get("model", None)
    mileage = request.json.get("mileage", None)
    year = request.json.get("year", None)
    tasks = request.json.get("tasks", None)
    client_id = request.json.get("client_id", None)
    if not brand or not model or not year or not mileage or not tasks or not client_id:
        return jsonify({"msg":"Fields required"}), 400
    newMotorbike = Motorbikes(brand = brand,
                        model = model,
                        mileage = mileage,
                        year = year,
                        tasks = tasks,
                        status = False,
                        client_id = client_id)
    db.session.add(newMotorbike)
    db.session.commit()
    return jsonify({"msg":"New motorbike added"}), 201

@api.route("/motorbikes_list", methods=["GET"])
@jwt_required()
def motorbikes_list():
    motorbikes_list = Motorbikes.query.all()
    return jsonify(motorbikes_list=[motorbike.serialize() for motorbike in motorbikes_list])

@api.route("/update_tasks", methods=["PUT"])
@jwt_required()
def update_tasks():
    update_tasks = request.json.get("tasks", None)
    motorbike_id = request.json.get("motorbike_id", None)
    motorbikeBDD = Motorbikes.query.filter_by(id = motorbike_id).first()
    motorbikeBDD.query.update({"tasks":update_tasks})
    db.session.commit()
    return jsonify({"msg":"Task updated"})

@api.route("/update_status", methods=["PUT"])
@jwt_required()
def update_status():
    motorbike_id = request.json.get("motorbike_id", None)
    motorbikeBDD = Motorbikes.query.filter_by(id = motorbike_id).first()
    motorbikeBDD.query.update({"status":True})
    db.session.commit()
    return jsonify({"msg":"Status updated"})

@api.route("/delete_moto", methods=["DELETE"])
@jwt_required()
def delete_moto():
    motorbike_id = request.json.get("motorbike_id", None)
    motorbikeBDD = Motorbikes.query.filter_by(id = motorbike_id).first()
    db.session.delete(motorbikeBDD)
    db.session.commit()
    return jsonify({"msg":"Motorbike deleted"})

if __name__ == "__main__":
    app.run()


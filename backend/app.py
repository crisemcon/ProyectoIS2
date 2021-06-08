from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/ProyectoIS2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Persona(db.Model):
    __tablename__ = "Persona"
    RUT = db.Column(db.String(10), primary_key=True, nullable=False)
    Nombres = db.Column(db.String(50), nullable=False)
    Apellidos = db.Column(db.String(50), nullable=False)
    Correo = db.Column(db.String(100), nullable=False)
    Telefono = db.Column(db.String(15))
    Direccion = db.Column(db.String(250))

    def __init__(self, RUT, Nombres, Apellidos, Correo, Telefono, Direccion):
        self.RUT = RUT,
        self.Nombres = Nombres,
        self.Apellidos = Apellidos,
        self.Correo = Correo,
        self.Telefono = Telefono,
        self.Direccion = Direccion

class PersonaSchema(ma.Schema):
    class Meta:
        fields = ('RUT', 'Nombres','Apellidos','Correo','Telefono','Direccion')

persona_schema = PersonaSchema()
personas_schema = PersonaSchema(many=True)


@app.route('/personas', methods = ['GET'])
def get_personas():
    all_personas = Persona.query.all()
    results = personas_schema.dump(all_personas)
    return jsonify(results)

@app.route('/personas/<rut>', methods = ['GET'])
def get_persona(rut):
    persona = Persona.query.get(rut)
    if(persona == None):
        response = jsonify({"error": "No existe una persona con el RUT especificado"})
        response.status_code = 404
        return response
    return persona_schema.jsonify(persona)

@app.route('/personas', methods = ['POST'])
def add_persona():
    request_data = request.get_json()
    
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    if 'Nombres' in request_data:
        Nombres = request_data['Nombres']
    else: 
        response = jsonify({"error": "Nombres requeridos"})
        response.status_code = 400
        return response

    if 'Apellidos' in request_data:
        Apellidos = request_data['Apellidos']
    else: 
        response = jsonify({"error": "Apellidos requeridos"})
        response.status_code = 400
        return response

    if 'Correo' in request_data:
        Correo = request_data['Correo']
    else: 
        response = jsonify({"error": "Correo requerido"})
        response.status_code = 400
        return response

    if 'Telefono' in request_data:
        Telefono = request_data['Telefono']
    else: Telefono = ""

    if 'Direccion' in request_data:
        Direccion = request_data['Direccion']
    else: Direccion = ""

    persona = Persona(RUT, Nombres, Apellidos, Correo, Telefono, Direccion)

    try:
        db.session.add(persona)
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response

    return persona_schema.jsonify(persona)

@app.route('/personas/<rut>', methods = ['PUT'])
def update_persona(rut):
    request_data = request.get_json()
    persona = Persona.query.get(rut)

    if(persona == None):
        response = jsonify({"error": "No existe una persona con el RUT especificado"})
        response.status_code = 404
        return response
    if 'Nombres' in request_data:
        persona.Nombres = request_data['Nombres']
    if 'Apellidos' in request_data:
        persona.Apellidos = request_data['Apellidos']
    if 'Correo' in request_data:
        persona.Correo = request_data['Correo']
    if 'Telefono' in request_data:
        persona.Telefono = request_data['Telefono']
    if 'Direccion' in request_data:
        persona.Direccion = request_data['Direccion']
    try:
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response
    return persona_schema.jsonify(persona)

@app.route('/personas/<rut>', methods = ['DELETE'])
def delete_persona(rut):
    persona = Persona.query.get(rut)
    if(persona == None):
        response = jsonify({"error": "No existe una persona con el RUT especificado"})
        response.status_code = 404
        return response
    try:
        db.session.delete(persona)
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response
    return persona_schema.jsonify(persona)



if __name__ == "__main__":
    app.run(port=5000, debug=True)
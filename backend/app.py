from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy import text

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/ProyectoIS2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


### MODELOS
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

class Administrador(db.Model):
    __tablename__ = "Administrador"
    RUT_Adm = db.Column(db.String(10), db.ForeignKey(Persona.RUT), primary_key=True)
    alerta = db.Column(db.Integer, nullable=False)

    def __init__(self, RUT_Adm, alerta):
        self.RUT_Adm = RUT_Adm,
        self.alerta = alerta

class Sala(db.Model):
    __tablename__ = "Sala"
    Sala_ID = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(10), nullable=False)

    def __init__(self, Sala_ID, Nombre):
        self.Sala_ID = Sala_ID,
        self.Nombre = Nombre

class Alumno(db.Model):
    __tablename__ = "Alumno"
    RUT_Alu = db.Column(db.String(10), db.ForeignKey(Persona.RUT), primary_key=True)
    Sala_Alu = db.Column(db.Integer, db.ForeignKey(Sala.Sala_ID), nullable=False)

    def __init__(self, RUT_Alu, Sala_Alu):
        self.RUT_Alu = RUT_Alu,
        self.Sala_Alu = Sala_Alu

class Apoderado(db.Model):
    __tablename__ = "Apoderado"
    RUT_Apo = db.Column(db.String(10), db.ForeignKey(Persona.RUT), primary_key=True)
    RUT_Pup = db.Column(db.String(10), db.ForeignKey(Alumno.RUT_Alu), nullable=False)

    def __init__(self, RUT_Apo, RUT_Pup):
        self.RUT_Apo = RUT_Apo,
        self.RUT_Pup = RUT_Pup

class Profesor(db.Model):
    __tablename__ = "Profesor"
    RUT_Pro = db.Column(db.String(10), db.ForeignKey(Persona.RUT), primary_key=True)
    Sala_Pro = db.Column(db.Integer, db.ForeignKey(Sala.Sala_ID), nullable=False)

    def __init__(self, RUT_Pro, Sala_Pro):
        self.RUT_Pro = RUT_Pro,
        self.Sala_Pro = Sala_Pro

class Colegio(db.Model):
    __tablename__ = "Colegio"
    ID_Colegio = db.Column(db.Integer, primary_key=True)
    Estado_Colegio = db.Column(db.Integer, nullable=False)
    Nombre_Colegio = db.Column(db.String(50), nullable=False)

    def __init__(self, ID_Colegio, Estado_Colegio, Nombre_Colegio):
        self.ID_Colegio = ID_Colegio,
        self.Estado_Colegio = Estado_Colegio,
        self.Nombre_Colegio = Nombre_Colegio

class Contagio(db.Model):
    __tablename__ = "Contagio"
    Contagio_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    RUT_Con = db.Column(db.String(10), db.ForeignKey(Persona.RUT))
    Fecha = db.Column(db.Date, nullable=False)
    revisada = db.Column(db.Boolean, nullable=False)
    
    #Fue necesario quitar esta parte para poder funcionar con el 
    #auto increment de la BD
    #def __init__(self, Contagio_ID, RUT_Con, Fecha, revisada):
    def __init__(self, RUT_Con, Fecha, revisada):
        #self.Contagio_ID = Contagio_ID,
        self.RUT_Con = RUT_Con,
        self.Fecha = Fecha,
        self.revisada = revisada


### ESQUEMAS
class PersonaSchema(ma.Schema):
    class Meta:
        fields = ('RUT', 'Nombres','Apellidos','Correo','Telefono','Direccion')

class AdministradorSchema(ma.Schema):
    class Meta:
        fields = ('RUT_Adm', 'alerta')

class SalaSchema(ma.Schema):
    class Meta:
        fields = ('Sala_ID', 'Nombre')

class AlumnoSchema(ma.Schema):
    class Meta:
        fields = ('RUT_Alu', 'Sala_Alu')

class ApoderadoSchema(ma.Schema):
    class Meta:
        fields = ('RUT_Apo', 'RUT_Pup')

class ProfesorSchema(ma.Schema):
    class Meta:
        fields = ('RUT_Pro', 'Sala_Pro')

class ColegioSchema(ma.Schema):
    class Meta:
        fields = ('ID_Colegio', 'Estado_Colegio', 'Nombre_Colegio')

class ContagioSchema(ma.Schema):
    class Meta:
        fields = ('Contagio_ID', 'RUT_Con', 'Fecha', 'revisada')

class AlumnoEstadoSchema(ma.Schema):
    class Meta:
        fields = ('RUT_Alu','Apellidos','Nombres')

class PupilosDeApoderadoSchema(ma.Schema):
    class Meta:
        fields = ('RUT','Apellidos','Nombres')

aluEstado_schema = AlumnoEstadoSchema()
alusEstado_schema = AlumnoEstadoSchema(many=True)

pupApo_schema = PupilosDeApoderadoSchema()
pupsApo_schema = PupilosDeApoderadoSchema(many=True)

administrador_schema = AdministradorSchema()
administradores_schema = AdministradorSchema(many=True)

persona_schema = PersonaSchema()
personas_schema = PersonaSchema(many=True)

sala_schema = SalaSchema()
salas_schema = SalaSchema(many=True)

alumno_schema = AlumnoSchema()
alumnos_schema = AlumnoSchema(many=True)

apoderado_schema = ApoderadoSchema()
apoderados_schema = ApoderadoSchema(many=True)

profesor_schema = ProfesorSchema()
profesores_schema = ProfesorSchema(many=True)

colegio_schema = ColegioSchema()
colegios_schema = ColegioSchema(many=True)

contagio_schema = ContagioSchema()
contagios_schema = ContagioSchema(many=True)


### RUTAS
@app.route('/login', methods = ['POST'])
def login():
    request_data = request.get_json()
    print("/////////////////////////////////////")
    print(request_data)
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    persona = Persona.query.get(RUT)
    if(persona == None):
        response = jsonify({"error": "No existe una persona con el RUT especificado"})
        response.status_code = 404
        return response
    response = persona_schema.dump(persona)
    
    admin = Administrador.query.get(RUT)
    if(admin != None):
        response.update({"Rol":"Administrador"})
        return jsonify(response)
    alumno = Alumno.query.get(RUT)
    if(alumno != None):
        response.update({"Rol":"Alumno"})
        return jsonify(response)
    apoderado = Apoderado.query.get(RUT)
    if(apoderado != None):
        response.update({"Rol":"Apoderado"})
        return jsonify(response)
    profesor = Profesor.query.get(RUT)
    if(profesor != None):
        response.update({"Rol":"Profesor"})
        return jsonify(response)
    
    err = jsonify({"error": "La persona no posee ningun rol en un Colegio"})
    err.status_code = 404
    return  err

@app.route('/admin', methods = ['GET'])
def get_admins():
    all_admins = Administrador.query.all()
    results = administradores_schema.dump(all_admins)
    return jsonify(results)

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

@app.route('/US4', methods = ['GET'])
def get_estadocolegio():
    colegioActual = Colegio.query.get(0)

    return colegio_schema.jsonify(colegioActual)

@app.route('/US4', methods = ['POST'])
def confirmar_cuarentena():
    #Como administrador quiero confirmar cuarentena establecida por el SEREMI para seguir el decreto oficial del pais.

    #este caso de uso permite al administrador confirmar
    #o no el establecimiento de cuarentena total en el
    #establecimiento
    request_data = request.get_json()
    #Como request solicita el rut de la persona que hace el
    #request, y luego un estado, que puede ser 0 o 1 para
    #confirmar o no la decision tomada

    #{
    #    "RUT": "12532639-0",
    #    "Estado": "0
    #}
    
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    if 'Estado' in request_data:
        Estado = request_data['Estado']
    else: 
        response = jsonify({"error": "Se requiere el estado para cambiar el estado"})
        response.status_code = 400
        return response

    print(RUT + " desea cambiar a estado: " + Estado)

    UserType = check_user_type(RUT)

    if(UserType != 0): 
        response = jsonify({"Error": "Usted no puede realizar esta accion"})
        #Forbidden
        response.status_code = 403
        return response

    #Esta es la logica real del codigo, donde crea una instancia
    #local del colegio (colegio actual) con la PRIMARY KEY = 0
    #ed, ID_Colegio = 0
    #---
    #Luego setea el attributo del colegio actual llamado estado colegio
    #a "Estado"
    colegioActual = Colegio.query.get(0)
    setattr(colegioActual, 'Estado_Colegio', int(Estado))

    #print(type(Estado))
    #print(Estado)

    #Hacemos commit a los cambios, EOC mostramos error
    try:
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response

    #{
    #   esto es lo que retorna, uno de estos 2 mensajes
    #}
    if(int(Estado) == 0):
        return jsonify(message="Se ha levantado la cuarentena total establecida por el MINSAL")
    else:
        return jsonify(message="Cuarentena establecida por el MINSAL se ha confirmado")
    
'''
US1: Como apoderado quiero informar contagio de mi pupilo para que el establecimiento tome las medidas necesarias

Request:
{
    "RUT": "41366409-8"
}
Response:
[
    {
        "Apellidos": "Rutledge Knapp",
        "Nombres": "Paula Bryar",
        "RUT": "24169868-8"
    }
]
'''

##PROBAR CON RUT: 41366409-8

@app.route('/pupiloDeAp', methods = ['GET'])
def get_pupilos():
    #verificar que esta persona es apoderado:
    request_data = request.get_json()
    print(request_data)

    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response
    
    if check_user_type(RUT)!= 3:
        response = jsonify({"error": "Solo apoderados pueden realizar esta acción"})
        response.status_code = 403 #Forbidden
        return response

    #Se buscan los hijos del apoderado según su RUT:
    consultaSQL_rutpupApo = "SELECT RUT_Pup from Apoderado WHERE RUT_Apo = '" + RUT + "'";
    consultaSQL_pupApo = "SELECT RUT, Nombres, Apellidos from Persona, (" + consultaSQL_rutpupApo + ") AS q1 WHERE RUT = q1.RUT_Pup;"
    eng = db.engine.execute(consultaSQL_pupApo)
    results = pupsApo_schema.dump(eng)

    return jsonify(results)

'''
US1
Request:
{
    "RUT": "41366409-8",
    "RUT_Alu": "24169868-8",
    "Fecha": "2021-06-17"
}
Response:
{
    "Contagio_ID": 1,
    "Fecha": "2021-06-17",
    "RUT_Con": "24169868-8",
    "revisada": false
}
'''
@app.route('/US1', methods = ['POST'])
def contagio_pupilo():
    request_data = request.get_json()
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    if 'RUT_Alu' in request_data:
        RUT_Pup = request_data['RUT_Alu']
    else:
        response = jsonify({"error": "RUT Alumno requerido"})
        response.status_code = 400
        return response

    if 'Fecha' in request_data:
        FechaContagio = request_data['Fecha']
    else: 
        response = jsonify({"error": "Fecha requerido"})
        response.status_code = 400
        return response

    #Revisar que son apoderados y alumnos, y que están relacionados
    UserType = check_user_type(RUT)
    AlumnoType = check_user_type(RUT_Pup)

    if(UserType != 3 or AlumnoType != 2):
        response = jsonify({"error": "No se ha encontrado apoderados ni alumnos con los rut indicados"})
        response.status_code = 404
        return response

    consultaSQL_ruts = "SELECT RUT_Pup from Apoderado WHERE RUT_Apo = '" + RUT + "' AND RUT_Pup = '" + RUT_Pup + "';";
    eng = db.engine.execute(consultaSQL_ruts)
    pupilo = []
    for pup in eng:
        pupilo.append(pup.RUT_Pup)
    if not pupilo:
        response = jsonify({"error": "Este pupilo no corresponde al apoderado"})
        response.status_code = 403 #Forbidden
        return response

    #Crear contagio
    cont = Contagio(RUT_Con = RUT_Pup, Fecha = FechaContagio, revisada = 0)

    try:
        db.session.add(cont)
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": "Error BD"})
        response.status_code = 400
        return response

    return contagio_schema.jsonify(cont)

@app.route('/US2', methods = ['POST'])
def informar_contagio():
    #Como persona quiero informar contagio para que el establecimiento pueda realizar oportunamente la trazabilidad

    request_data = request.get_json()
    #Como request solicita el RUT de la persona y la FECHA del contagio
    #{
    #    "RUT": "12532639-0",
    #    "Fecha": "2021-06-17"
    #}  
    
    #Ver si se ingreso el rut
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    if 'Fecha' in request_data:
        FechaContagio = request_data['Fecha']
    else: 
        response = jsonify({"error": "Fecha requerido"})
        response.status_code = 400
        return response


    UserType = check_user_type(RUT)

    if(UserType == 2):
        response = jsonify({"error": "Alumnos no pueden informar contagios"})
        #Forbidden
        response.status_code = 403
        return response

    #falta cambiar el 5 por el auto-increasing 1
    nuevoContagio = Contagio(RUT_Con = RUT, Fecha = FechaContagio, revisada = 0)

    try:
        db.session.add(nuevoContagio)
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response

    return contagio_schema.jsonify(nuevoContagio)

#Esta ruta retorna
#{
#    "Contagio_ID": 13,
#    "Fecha": "2021-06-19",
#    "RUT_Con": "12532639-0",
#    "revisada": false
#}

@app.route('/US3', methods = ['GET'])
def recibir_sugerencias():
    #Como administrador deseo recibir sugerencias sobre la acción a tomar 
    #para actuar de forma adecuada y correcta con el objetivo de aportar 
    #en la recuperación de la normalidad.

    #request_data = request.get_json()
    ##### Hay un problema al realizar request GET con body, y es un debate actual que aun no se resuelve concretamente.
    ##### Solucion: recibir el RUT como parametro y no en el body
    
    request_data = request.args

    #{
    #    "RUT": "12532639-0",
    #}
    print(request_data)
    
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response


    UserType = check_user_type(RUT)

    if(UserType != 0): 
        response = jsonify({"Error": "Usted no puede realizar esta accion"})
        #Forbidden
        response.status_code = 403
        return response

    #Obtener todos los contagiados
    currentContagiados = Contagio.query.with_entities(Contagio.RUT_Con, Contagio.Contagio_ID)

    #Buscamos los ruts de todos los contagiados
    listaContagiados = []
    for contagiado in currentContagiados:
        listaContagiados.append(contagiado.RUT_Con)

    #Con la lista de contagiados podemos ver cuantas
    #personas infectadas tenemos en el colegio
    #for i in range(len(listaContagiados)):
    #    print(listaContagiados[i])

    #Ahora calculamos el tipo de user de cada uno
    listaTipoUser = []
    for i in range(len(listaContagiados)):
        listaTipoUser.append(check_user_type(listaContagiados[i]))
        #print(listaTipoUser[i])

    #Revisamos cuantos contagiados existen por sala

    #query para obtener salas
    currentSalas = Sala.query.with_entities(Sala.Sala_ID, Sala.Nombre)
    
    #Len salas tiene el largo de salas, se usa despues
    #ContagiosSala = cantidad de contagios por sala
    #NombresSala = nombres de cada sala
    #IDsSala = ids de cada sala
    lenSalas = 0
    contagiosSala = []
    nombresSala = []
    idsSala = []
    for salaAux in currentSalas:
        lenSalas += 1
        idsSala.append(salaAux.Sala_ID)
        nombresSala.append(salaAux.Nombre)
        contagiosSala.append(0)

    #Revisamos la lista de contagiados y
    #agregamos los contagios a la sala respectiva
    for i in range(len(listaContagiados)):
        #Revisar contagiado si es alumno
        if(listaTipoUser[i] == 2):
            al = Alumno.query.get(listaContagiados[i])
            contagiosSala[al.Sala_Alu] += 1 

        #Revisar contagiado si es profe
        if(listaTipoUser[i] == 1):
           pr = Profesor.query.get(listaContagiados[i])
           contagiosSala[pr.Sala_Pro] += 1 

    for i in range(len(contagiosSala)):
        print("Sala", nombresSala[i] , "tiene", contagiosSala[i], "contagios")

    #Este es el pedazo de codigo que genera el return para el
    #frontend
    dictReturn = {"ContagiadosTotal": sum(contagiosSala)}
    listaContagios = {}
    for i in range(lenSalas):
        if(contagiosSala[i] == 0):
            sugerencia = "Continuar procedimientos usuales"
        elif(contagiosSala[i]==1):
            sugerencia = "Considerar cerrar la sala temporalmente"
        else:
            sugerencia = "Cerrar sala temporalmente"
        listaContagios["Sala " + nombresSala[i]] = {"Contagiados":contagiosSala[i],"Sugerencia":sugerencia}

    dictReturn["ContagiadosSalas"] = listaContagios
    if(sum(contagiosSala) == 0):
        sugGlobal = "Continuar funcionamiento normal"
    elif(sum(contagiosSala) <= 5):
        sugGlobal = "Considerar cierre temporal del establecimiento"
    else:
        sugGlobal = "Es necesario solicitar cierre temporal del establecimiento"
    dictReturn["Sugerencia"] = sugGlobal

    return jsonify(dictReturn)

'''
localhost:5000/US6    [GET]
Request:
{
    RUT: “1231241”,
    Rol: “admin”
}

Response:
{
    Salas profes estados
}
'''

@app.route('/US6', methods = ['GET'])
def get_estados_salas():
    all_personas = Persona.query.all()
    all_salas = Salas.query.all()
    res_sala = sala_schema.dump(all_salas)
    results = personas_schema.dump(all_personas) #cambiar
    return jsonify(results)

@app.route('/contpend', methods = ['GET'])
def notificaciones_admin():
    #Retorna los contagios que no han sido revisados
    request_data = request.get_json()

    #{
    #    "RUT": "12532639-0",
    #}
    
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    UserType = check_user_type(RUT)

    if(UserType != 0): 
        response = jsonify({"Error": "Usted no puede realizar esta accion"})
        #Forbidden
        response.status_code = 403
        return response


    #Obtener todos los contagiados a revisar
    contagiadosRevisar = Contagio.query.filter_by(revisada = 0).all()

    if(len(contagiadosRevisar) == 0):
        print("No hay ninguno a revisar")
        return jsonify(message="No hay nuevas notificaciones")

    for cont in contagiadosRevisar:
        print("asd")
        cont.revisada = 1
    
    try:
        db.session.commit()
    except Exception as error:
        response = jsonify({"error": str(error.orig)})
        response.status_code = 400
        return response

    results = contagios_schema.dump(contagiadosRevisar)
    return jsonify(results)



def check_user_type(RUT):
    #Dado un rut, encuentra y retorna el tipo de usuario
    #0 admin
    #1 profesor
    #2 alumno
    #3 apoderado

    UserType = -1
    FindUserType = Administrador.query.get(RUT)
    if(FindUserType != None):
        UserType = 0
        #print("Es admin " + str(UserType))

    FindUserType = Profesor.query.get(RUT)
    if(FindUserType != None):
        UserType = 1
        #print("Es profesor " + str(UserType))

    FindUserType = Alumno.query.get(RUT)
    if(FindUserType != None):
        UserType = 2
        #print("Es alumno " + str(UserType))

    FindUserType = Apoderado.query.get(RUT)
    if(FindUserType != None):
        UserType = 3
        #print("Es apoderado " + str(UserType))

    return UserType

@app.route('/US5', methods = ['POST','GET'])
#Como profesor quiero saber los alumnos de mi curso/sala y su estado
#Permite ver ver al profesor sus alumnos de una sala y su estado.
def ver_mis_alumnos():
    request_data = request.get_json()
    if 'RUT' in request_data:
        RUT = request_data['RUT']
    else: 
        response = jsonify({"error": "RUT requerido"})
        response.status_code = 400
        return response

    UserType = check_user_type(RUT)

    if(UserType != 1): 
        response = jsonify({"Error": "Usted no puede realizar esta accion"})
        #Forbidden
        response.status_code = 403
        return response
    #Se Pregunta por todos los alumnos de un Profesor en una sala
    consultaSQL1 = "SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND  Persona.RUT = Alumno.RUT_Alu AND Profesor.RUT_Pro = '" + RUT + "' ORDER BY Apellidos, Nombres"
    y1 = db.engine.execute(consultaSQL1)

    #Se pregunta por todos los alumnos contagiados de un profesor en su sala
    consultaSQL2 = "SELECT RUT_Alu, Apellidos, Nombres FROM Contagio,(" + consultaSQL1 + ") AS q1 WHERE q1.RUT_Alu = Contagio.RUT_Con ORDER BY Apellidos, Nombres"
    y2 = db.engine.execute(consultaSQL2)

    #Se pregunta por todos los alumnos sanos de un profesor en su sala
    consultaSQL2Modif = "SELECT RUT_Alu FROM Contagio,(SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND Persona.RUT = Alumno.RUT_Alu AND Profesor.RUT_Pro = '" + RUT + "')AS q1 WHERE q1.RUT_Alu = Contagio.RUT_Con"
    consultaSQL3 = "SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND Profesor.RUT_Pro = '" + RUT + "' AND Alumno.RUT_Alu NOT IN ( " + consultaSQL2Modif + ") AND Alumno.RUT_Alu = Persona.RUT ORDER BY Apellidos, Nombres"
    y3 = db.engine.execute(consultaSQL3)

    results1 = alusEstado_schema.dump(y1)
    results2 = alusEstado_schema.dump(y2)
    results3 = alusEstado_schema.dump(y3)

    """
    if results1 is None:
        return jsonify({"Usted no tiene alumnos en su sala"})
    if results2 is None:
        results2 = "Felicidades, usted no tiene alumnos contagiados en su sala"
    if results3 is None:
        results3 = "Atencion, usted no tiene alumnos sanos en su sala"
    """

    #Se devuelven los alumnos ordenados por apellido y clasificados en las categorias correspondientes
    return jsonify(todos_los_alumnos = results1, alumnos_contagiados = results2, alumnos_sanos = results3)





### START
if __name__ == "__main__":
    app.run(port=5000, debug=True)

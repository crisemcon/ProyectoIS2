// g++ main.cpp -o output -L/usr/include/mariadb/mysql -lmariadbclient
#include <iostream>
#include <mysql/mysql.h> // /usr/includes/mariadb/mysql.h
#include <string>
#include <cstring>
#include <vector>

using namespace std;

struct connection_details
{
    const char *server, *user, *password, *database;
};

MYSQL* mysql_connection_setup(struct connection_details mysql_details){
    MYSQL *connection = mysql_init(NULL); // mysql instance
    
    //connect database
    if(!mysql_real_connect(connection, mysql_details.server, mysql_details.user, mysql_details.password, mysql_details.database, 0, NULL, 0)){
        std::cout << "Connection Error: " << mysql_error(connection) << std::endl;
        exit(1); 
    }

    return connection;
}

// mysql_res = mysql result
MYSQL_RES* mysql_perform_query(MYSQL *connection, const char *sql_query){
    //send query to db
    if(mysql_query(connection, sql_query)){
        std::cout << "MySQL Query Error: " << mysql_error(connection) << std::endl;
        exit(1);
    }

    return mysql_use_result(connection);
}

int consultarTipoPersona(string rut, MYSQL *connection, MYSQL_RES *res){
    /*
    Revisa que tipo de persona es el rut ingresado

    Si no tiene tipo, retorna -1

    //0 admin
    //1 profesor
    //2 alumno
    //3 apoderado
    */
    int resultado = -1;
    MYSQL_ROW row;
    char * cstr;  
    string consultaSQL;

    string roles[] = {"Administrador", "Profesor", "Alumno", "Apoderado"};
    string rutSql[] = {"RUT_Adm", "RUT_Pro", "RUT_Alu", "RUT_Apo"};

    for (int i = 0; i < 4; ++i)
    {
        consultaSQL = "select * from " + roles[i] + " where " + rutSql[i] + " = '" + rut + "';";
        //cout << consultaSQL << endl;  
        cstr = new char[consultaSQL.length() + 1];
        strcpy(cstr, consultaSQL.c_str());

        res = mysql_perform_query(connection, cstr);

        if ((row = mysql_fetch_row(res)) == NULL){
            //cout << "Usted no es " << roles[i] << endl;
        }
        else{
            cout << "Usted es " << roles[i] << endl;
            resultado = i;
            //cout << row[0] << endl; 
        }
        // clean up the database result
        free(cstr);
        mysql_free_result(res);
    }
        
    return resultado;
}

void consultarDatosPersona(string rut, MYSQL *connection, MYSQL_RES *res){
    /*
    Dado el rut de una persona retorna sus datos: rut, nombres, apellidos, correo, telefono y direccion
    */
    MYSQL_ROW row;
    char * cstr;  
    string consultaSQL;

    consultaSQL = "select * from Persona where RUT = '" + rut + "';";
    cstr = new char[consultaSQL.length() + 1];
    strcpy(cstr, consultaSQL.c_str());

    res = mysql_perform_query(connection, cstr);

    if ((row = mysql_fetch_row(res)) == NULL){
            //err
        }
        else{
            cout << row[0] << " | " << row[1] << " | " << row[2] << " | " << row[3] << " | " << row[4] << " | " << row[5] << endl;
            //cout << row[0] << endl; 
        }
        // clean up the database result
        free(cstr);
        mysql_free_result(res);
}

string getRutPupiloDeApoderado(string rutApo, MYSQL *connection, MYSQL_RES *res){
    /*
        Dado el rut de un apoderado, obtener el rut de su pupilo
    */
    MYSQL_ROW row;
    char * cstr;  
    string consultaSQL;
    string rutPup;

    consultaSQL = "SELECT RUT_Pup from Apoderado WHERE RUT_Apo = '" + rutApo + "';";
    cstr = new char[consultaSQL.length() + 1];
    strcpy(cstr, consultaSQL.c_str());

    res = mysql_perform_query(connection, cstr);

    if ((row = mysql_fetch_row(res)) == NULL){
            //err
        }
        else{
            rutPup = row[0];
            //cout << row[0] << endl; 
        }
        // clean up the database result
        free(cstr);
        mysql_free_result(res);
        return rutPup;
}

void informarContagioRut(string rut,string fechaContagio, MYSQL *connection){
    /*
        Dado el rut de una Persona y la fecha de contagio, insertar en tabla de contagio
    */
    MYSQL_ROW row;
    char * cstr;  
    string consultaSQL;
    int res;

    consultaSQL = "INSERT INTO Contagio (RUT_Con, Fecha) VALUES ('" + rut + "','" + fechaContagio + "');";
    cstr = new char[consultaSQL.length() + 1];
    strcpy(cstr, consultaSQL.c_str());

    res = mysql_query(connection, cstr);
    if (res) {
        cout << "Error al informar contagio" << endl;
    } else {
        cout << "El contagio ha sido informado correctamente" << endl;
    }
    // clean up the string
    free(cstr);

    return;
}


int decretarEstadoColegio(int nivel, int estado, MYSQL *connection, MYSQL_RES *res){
    /*
    nivel es tu nivel de usuario
    estado es el estado_colegio, para saber si esta en cuarentena o no

    Retorna
        0 error
        1 exitoso
    */

    MYSQL_ROW row;
    char * cstr;  
    string consultaSQL;

    if (nivel != 0){
        cout << "Error: Usted no es administrador. No se han efectuado cambios. " << endl;
        return 0;
    }

    consultaSQL = "update Colegio set Estado_Colegio = " + to_string(estado) + " where ID_Colegio = 0;";
    //cout << consultaSQL << endl;  
    
    //cerr << "1\n";
    cstr = new char[consultaSQL.length() + 1];
    strcpy(cstr, consultaSQL.c_str());

    res = mysql_perform_query(connection, cstr);


    //esta parte esta un poco sketchy, aun no se que se retorna exactamente a res
    if (res != NULL){
        cout << "Error al alterar estado" << endl;
    }
    else{
        cout << "Estado alterado. Nuevo estado es: " << estado << endl;
    }
    // clean up the database result
    free(cstr);
    mysql_free_result(res);
    
    return 1;
}

int estadoAlumnos(int nivel, string rut, MYSQL *connection, MYSQL_RES *res){
    //Comprobación para los Profesores
    if (nivel != 1){
        cout << "Error: Usted no es Profesor. No tiene Alumnos que revisar. " << endl;
        return 0;
    }
    //Esta es la consulta para ver la lista completa de estudiantes
    string consultaSQL1;
    consultaSQL1 = "SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND  Persona.RUT = Alumno.RUT_Alu AND Profesor.RUT_Pro = '" + rut + "'";
    //cout<<consultaSQL1<<endl;
    char *cstr;
    cstr = new char[consultaSQL1.length() + 1];
    strcpy(cstr, consultaSQL1.c_str());
    res = mysql_perform_query(connection, cstr);
    
    MYSQL_ROW row;
    int num_filas;
    num_filas = mysql_num_fields(res);

    cout<<"Sus estudiantes son: "<<endl;
    while ((row = mysql_fetch_row(res)))
    {
       unsigned long *largo;
       largo = mysql_fetch_lengths(res);
       //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
       for(int i = 0; i < num_filas; i++)
       {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
       }
       printf("\n");
    }
    free(cstr);
    printf("\n");

    char *cstr2;
    string consultaSQL2;
    consultaSQL2 = "SELECT RUT_Alu, Apellidos, Nombres FROM Contagio,(" + consultaSQL1 + ") AS q1 WHERE q1.RUT_Alu = Contagio.RUT_Con";
    cstr2 = new char[consultaSQL2.length() + 1];
    //Esta es la consulta para ver a los alumnos que esten contagiados
    //cout<<consultaSQL2<<endl;
    bool hayContagios = false; //Para verificar cuando existan almenos un contagiado
    strcpy(cstr2, consultaSQL2.c_str());
    res = mysql_perform_query(connection, cstr2);
    num_filas = mysql_num_fields(res);

    cout<<"Estan Contagiados: "<<endl;
    while ((row = mysql_fetch_row(res)))
    {
        hayContagios = true;
        unsigned long *largo;
        largo = mysql_fetch_lengths(res);
        //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
        for(int i = 0; i < num_filas; i++)
        {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
       }
       printf("\n");
    } 
    //cout<< row <<endl;
    if (hayContagios == false)
    {
        cout<<"NO TIENE ESTUDIANTES CONTAGIADOS"<<endl;
    }
    free(cstr2);
    printf("\n");

    char *cstr3;
    string consultaSQL3;
    string consultaSQL2Modif = "SELECT RUT_Alu FROM Contagio,(SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND Persona.RUT = Alumno.RUT_Alu AND Profesor.RUT_Pro = '" + rut + "')AS q1 WHERE q1.RUT_Alu = Contagio.RUT_Con";
    consultaSQL3 = "SELECT RUT_Alu, Apellidos, Nombres FROM Profesor, Alumno, Persona WHERE Profesor.Sala_Pro = Alumno.Sala_Alu AND Profesor.RUT_Pro = '" + rut + "' AND Alumno.RUT_Alu NOT IN ( " + consultaSQL2Modif + ") AND Alumno.RUT_Alu = Persona.RUT ";
    cstr3 = new char[consultaSQL3.length() + 1];
    //Aqui esta consulta Sirve para ver los estudiantes Sanos, utiliza una variacion de la consulta anterior,
    //por eso se usa consulta2Modif
    //cout<<consultaSQL3<<endl;
    bool haySanos = false; //Para verificar cuando existan almenos un alumno Sano
    strcpy(cstr3, consultaSQL3.c_str());
    res = mysql_perform_query(connection, cstr3);
    num_filas = mysql_num_fields(res);
    
    cout<<"Sus estudiantes Sanos son: "<<endl;
    while ((row = mysql_fetch_row(res)))
    {
        haySanos = true;
        unsigned long *largo;
        largo = mysql_fetch_lengths(res);
        //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
        for(int i = 0; i < num_filas; i++)
        {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
        }
       printf("\n");
    }  
    if (haySanos == false)
    {
        cout<<"NO TIENE ESTUDIANTES SANOS"<<endl;
    }
    //cout<<"error1"<<endl;
    free(cstr3);
    //cout<<"error2"<<endl;
    mysql_free_result(res);

    return 0;
}

bool icompare_pred(unsigned char a, unsigned char b){
    return std::tolower(a) == std::tolower(b);
}

bool comparacionLowerCase(string a,string b){
    if (a.length()==b.length()) {
        return std::equal(b.begin(), b.end(),
                           a.begin(), icompare_pred);
    }
    else {
        return false;
    }
}


int revisionCasos(MYSQL *con,string run){
    MYSQL_RES *res; // the results
    MYSQL_ROW row;  // the results rows (array)
    vector<string> rutInfectados; //Almacenados para hacer querries posteriores
    vector<string> rutApoderadosInfectados;//Para obtener los hijos afectados.
    char *cstr2;
    string consultaSQL2;
    int infectados = 0; //almaceno la cantidad de infecciones totales de los infectados actuales no vistos previamente.

    consultaSQL2 = "SELECT RUT_Alu, Apellidos, Nombres FROM Contagio,Alumno AS q1, Persona as p1 WHERE p1.RUT = q1.RUT_Alu AND q1.RUT_Alu = Contagio.RUT_Con AND revisada = FALSE";
    cstr2 = new char[consultaSQL2.length() + 1];
    //Esta es la consulta para ver a los alumnos que esten contagiados
    //cout<<consultaSQL2<<endl;
    bool hayContagios = false; //Para verificar cuando existan almenos un contagiado
    strcpy(cstr2, consultaSQL2.c_str());
    res = mysql_perform_query(con, cstr2);
    int num_filas = mysql_num_fields(res);

    cout<<"Alumnos Contagiados: "<<endl;
    while ((row = mysql_fetch_row(res)))
    {
        hayContagios = true;
        unsigned long *largo;
        largo = mysql_fetch_lengths(res);
        //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
        for(int i = 0; i < num_filas; i++)
        {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
            rutInfectados.push_back(row[1]);
            infectados++;
       }
       printf("\n");
    }

    free(cstr2);
    mysql_free_result(res);

    cout<<"Personal Contagiado: "<<endl;
    consultaSQL2 = "Select RUT, Nombres, Sala_Pro from Contagio as C, Persona as P, Profesor as PR where C.RUT_Con = P.RUT AND P.RUT = PR.RUT_Pro AND revisada = FALSE;";
    strcpy(cstr2, consultaSQL2.c_str());
    res = mysql_perform_query(con, cstr2);
    num_filas = mysql_num_fields(res);
    while ((row = mysql_fetch_row(res)))
    {
        hayContagios = true;
        unsigned long *largo;
        largo = mysql_fetch_lengths(res);
        //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
        for(int i = 0; i < num_filas; i++)
        {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
            rutInfectados.push_back(row[1]);
            infectados++;
       }
       printf("\n");
    }
    free(cstr2);
    mysql_free_result(res);

    cout<<"Apoderados Contagiados: "<<endl;
    consultaSQL2 = "Select RUT, Nombres from Contagio as C, Persona as P, Apoderado as Ap where C.RUT_Con = P.RUT AND P.RUT = Ap.RUT_Apo AND revisada = FALSE;";
    strcpy(cstr2, consultaSQL2.c_str());
    res = mysql_perform_query(con, cstr2);
    num_filas = mysql_num_fields(res);
    while ((row = mysql_fetch_row(res)))
    {
        hayContagios = true;
        unsigned long *largo;
        largo = mysql_fetch_lengths(res);
        //cout<<*largo<<" = es el largo de la consultaSQL"<<endl;
        for(int i = 0; i < num_filas; i++)
        {
            //cout<<row[i];
            printf("[%.*s] ", (int) largo[i], row[i] ? row[i] : "NULL");
            rutInfectados.push_back(row[1]);
            infectados++;
       }
       printf("\n");
    }
    free(cstr2);
    mysql_free_result(res);


    //Consulta para contagios de Profesores: Select RUT, Nombres, Sala_Pro from Contagio as C, Persona as P, Profesor as PR where C.RUT_Con = P.RUT AND P.RUT = PR.RUT_Pro AND revisada = FALSE; 
    //Consulta para contagios de Apoderado: Select RUT, Nombres from Contagio as C, Persona as P, Apoderado as Ap where C.RUT_Con = P.RUT AND P.RUT = Ap.RUT_Apo AND revisada = FALSE;
    return infectados;
}

void consejoAccion(int inf){
    if (inf == 0){
        cout<<"No hay infecciones actualmente. No hay necesidad de implementar una cuarentena."<<endl;
    }
    else if (1>= inf && inf >= 5){
        cout <<"Recomendacion: Revice la necesidad de implementar una cuarentena parcial."<< endl;
    }
    else {
        cout<<"Recomendacion: Hacer una cuarentena del establecimiento completo."<<endl;
    }
    return;
}


int main(int argc, char const *argv[])
{
    MYSQL *con;	// the connection
    MYSQL_RES *res;	// the results
    MYSQL_ROW row;	// the results rows (array)

    struct connection_details mysqlD;
    mysqlD.server = "localhost";  // where the mysql database is
    mysqlD.user = "root"; // user
    mysqlD.password = "LOTOsan23"; // the password for the database
    mysqlD.database = "ProyectoIS2";	// the databse


    string rut;
    cout << "Ingrese su RUT para login: ";
    cin >> rut;
    string consultaRut;
    char * cstr;
    bool checkInicial = false;
    //cout << rut << endl;

    // connect to the mysql database
    con = mysql_connection_setup(mysqlD);

    // hacemos la query para ver si el rut existe
    consultaRut = "select * from Persona where RUT = '" + rut + "';";
    //para poder usar la consultaRut en mysql_perform_query
    //debemos convertirla a una string en C, no C++
    //por eso usamos strcpy y cstr (C string)
    cstr = new char[consultaRut.length() + 1];

    //cout << consultaRut << endl;
    strcpy(cstr, consultaRut.c_str());
    res = mysql_perform_query(con, cstr);
    //res = mysql_perform_query(con, "select * from Persona where RUT = '12532639-0';");

    //cout << ("Database Output:\n") << std::endl;

    if ((row = mysql_fetch_row(res)) == NULL){
        cout << "Error: Rut no existe en BD\n";
    }
    else{
        //cout << "Persona encontrada\n";
        //cout << row[0] << " | " << row[1] << " | " << row[2] << " | " << row[3] << " | " << row[4] << endl << endl; 
    }

    free(cstr);
    // clean up the database result
    mysql_free_result(res);


    //revisar que tipo de persona es
    //0 admin
    //1 profesor
    //2 alumno
    //3 apoderado
    int tipoPersona = consultarTipoPersona(rut, con, res);
    //cout << tipoPersona << endl;
    

    

    /*
    admin puede
        decretar estado colegio (0 safe 1 cuarentena)
        recibir sugerencias (podria ser algo sencillo de +5 infectados = cuarentena / 1 infectado en sala = clausurar sala)
        revisar alumnos y profesores de una sala junto a estado
    profesor puede
        ver alumnos de su curso y estado
    alumno puede
        ------
    apoderado puede
        informar contagio pupilo
    persona (todos excepto alumno)
        informar contagio propio
    */

    //este es el loop de menu
    while(1){
        if (tipoPersona == 0){
            //si soy admin
            //esta seccion se encarga de mostrar "notificaciones" pendientes
            //que debe revisar el admin

            string seleccion;

            if(!checkInicial){
                MYSQL_RES *resA;
                cout << "Buenas Administrador." << endl << "Buscando por alertas pendientes:"<< endl;
                string consultaAlerta ="Select alerta from Administrador where RUT_Adm = '" + rut + "';";
                cstr = new char[consultaAlerta.length() + 1];
                strcpy(cstr, consultaAlerta.c_str());
                resA= mysql_perform_query(con, cstr);
                row = mysql_fetch_row(resA);
                if (((int)row[0][0]-(int)'0') > 0 ){
                    cout<<"Estimado/a, existen situaciones que requieren su atencion. Desea revisarlos?"<<endl;
                    cout<<"Si/No"<<endl;
                    cin>>seleccion; 
                    if(comparacionLowerCase(seleccion,"Si")){
                        
                        consejoAccion(revisionCasos(con,rut));
                        //UC3
                        //TO DO Funcion que visualiza las infecciones.
                    }
                }
            }
            else if(checkInicial){
                cout<<"No hay alertas pendientes de revision"<<endl;
                checkInicial=true;
            }

            //cout << "Usted es administrador, tiene las siguientes opciones: \n";
            cout << "1. Decretar estado colegio (cuarentena o no)\n";
            cout << "2. Recibir sugerencias de accion\n";
            cout << "3. Revisar alumnos y profesores por sala junto a su estado\n";
            cout << "4. Informar contagio de usted" << endl;
            cout << "5. Salir del programa\n";
            cout << "\nEscriba 1/2/3/4/5 y luego presione enter para elegir opcion: \n";
            int opcion;
            cin >> opcion;
            if (opcion == 1){
                cout << "\n\nDecretar estado colegio\n";
                cout << "Escriba 0 o 1 para decretar estado actual de colegio (0 = normal, 1 = cuarentena)\n";
                cin >> opcion;
                decretarEstadoColegio(tipoPersona, opcion, con, res);
            }
            else if (opcion == 2){
                checkInicial=false;//aca va el caso de uso UC3
            }
            else if (opcion == 3){
                
                //aca va el caso de uso UC6
            }
            else if (opcion == 4) {
                //aca va el caso de uso UC2
                string fechaContagio;
                cout << "Ingrese la fecha del contagio en el formato: YYYY-MM-DD" << endl;
                cin >> fechaContagio;
                informarContagioRut(rut, fechaContagio, con);
            }
            else if (opcion == 5){
                cout << "Saliendo del programa...\n;";
                break;
            }
            else{
                cout << "Opcion no reconocida\n";
                continue;
            }
        }
        if (tipoPersona == 1){
            //si soy profe
            cout << "Usted es Profesor, tiene las siguientes opciones: " << endl;
            cout << "1. Informar contagio de usted" << endl;
            cout << "2. Ver estado de alumnos" << endl;
            cout << "3. Salir del programa" << endl;
            cout << "Escriba 1/2/3 y luego presione enter para elegir opcion: " << endl;
            int opcion;
            cin >> opcion;
            if(opcion == 1) {
                //aca va el caso de uso UC2
                string fechaContagio;
                cout << "Ingrese la fecha del contagio en el formato: YYYY-MM-DD" << endl;
                cin >> fechaContagio;
                informarContagioRut(rut, fechaContagio, con);
            }
            else if (opcion == 2){
                estadoAlumnos(tipoPersona, rut, con, res);
            }
            else if (opcion == 3){
                cout << "Saliendo del programa...;" << endl;
                break;
            }
            else {
                cout << "Opcion no reconocida" << endl;
                continue;
            }
        }
        if (tipoPersona == 2){
            int seleccionN;
            //si soy alumno
            //estos casos de uso se consideraran para la siguiente iteracion
            //aun no se implementan
            cout<<"Usted es alumno. NO puede hacer NADA\n";
            cout<<"Seleccione una accion:"<<endl;
            //cout<<"1.- Listar compañeros de sala."<<endl;
            //cout<<"2.- Estado de mi sala"<<endl;
            cout<<"3.- Salir"<<endl;
            cin>>seleccionN;
            if( seleccionN == 1 ){
                //Inserte funcion
            }
            else if( seleccionN == 2 ){
                //Inserte Funcion
            }
            else if( seleccionN == 3 ){
                cout<<"Terminando"<<endl;
                //free(cstr);
                //mysql_free_result(resA);
                break;
            }
            else{
                cout<<"Por favor seleccione una opcion de la lista."<<endl;
                cin>>seleccionN;
            }
        }
        if (tipoPersona == 3){
            //si soy apoderado
            cout<<"Buenas Sr/Sra"<<endl<<"Seleccione una opcion:"<<endl;
            cout << "1. Ver datos de su pupilo" << endl;
            cout << "2. Informar contagio de su pupilo" << endl;
            cout << "3. Informar contagio de usted" << endl;
            cout << "4. Salir del programa" << endl;
            cout << "Escriba 1/2/3/4 y luego presione enter para elegir opcion: " << endl;
            int opcion;
            cin >> opcion;
            if (opcion == 1){
                consultarDatosPersona(getRutPupiloDeApoderado(rut, con, res), con, res);
            }
            else if (opcion == 2){
                //aca va el caso de uso UC1
                string fechaContagio;
                cout << "Ingrese la fecha del contagio de su pupilo en el formato: YYYY-MM-DD" << endl;
                cin >> fechaContagio;
                informarContagioRut(getRutPupiloDeApoderado(rut, con, res), fechaContagio, con);
            }
            else if (opcion == 3){
                //aca va el caso de uso UC2
                string fechaContagio;
                cout << "Ingrese la fecha del contagio en el formato: YYYY-MM-DD" << endl;
                cin >> fechaContagio;
                informarContagioRut(rut, fechaContagio, con);
            }
            else if (opcion == 4){
                cout << "Saliendo del programa...;" << endl;
                break;
            }
            else{
                cout << "Opcion no reconocida" << endl;
                continue;
            }
        }
        if (tipoPersona == -1){
            cout << "Tipo de persona no reconocido, cerrando programa..." << endl;
            break;
        }

    }

    
    // close database connection
    mysql_close(con);
    return 0;
}


    /*while ((row = mysql_fetch_row(res)) != NULL){
        // the below row[] parametes may change depending on the size of the table and your objective
        std::cout << row[0] << std::endl;
    }*/
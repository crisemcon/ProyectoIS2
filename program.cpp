// g++ main.cpp -o output -L/usr/include/mariadb/mysql -lmariadbclient
#include <iostream>
#include <mysql.h> // /usr/includes/mariadb/mysql.h
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

int main(int argc, char const *argv[])
{
    MYSQL *con;	// the connection
    MYSQL_RES *res;	// the results
    MYSQL_ROW row;	// the results rows (array)

    struct connection_details mysqlD;
    mysqlD.server = "localhost";  // where the mysql database is
    mysqlD.user = "root"; // user
    mysqlD.password = "password"; // the password for the database
    mysqlD.database = "ProyectoIS2";	// the databse


    string rut;
    cout << "Ingrese su RUT para login: ";
    cin >> rut;
    //cout << rut << endl;

    // connect to the mysql database
    con = mysql_connection_setup(mysqlD);

    // hacemos la query para ver si el rut existe
    string consultaRut;
    consultaRut = "select * from Persona where RUT = '" + rut + "';";
    //para poder usar la consultaRut en mysql_perform_query
    //debemos convertirla a una string en C, no C++
    //por eso usamos strcpy y cstr (C string)
    char * cstr;    
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
            cout << "Usted es administrador, tiene las siguientes opciones: \n";
            cout << "1. Decretar estado colegio (cuarentena o no)\n";
            cout << "2. Recibir sugerencias de accion\n";
            cout << "3. Revisar alumnos y profesores por sala junto a su estado\n";
            cout << "4. Salir del programa\n";
            cout << "\nEscriba 1/2/3/4 y luego presione enter para elegir opcion: \n";
            int opcion;
            cin >> opcion;
            if (opcion == 1){
                cout << "\n\nDecretar estado colegio\n";
                cout << "Escriba 0 o 1 para decretar estado actual de colegio (0 = normal, 1 = cuarentena)\n";
                cin >> opcion;
                decretarEstadoColegio(tipoPersona, opcion, con, res);
            }
            else if (opcion == 2){
                //aca va el caso de uso UC3
            }
            else if (opcion == 3){
                //aca va el caso de uso UC6
            }
            else if (opcion == 4){
                cout << "Saliendo del programa...\n;"
                break;
            }
            else{
                cout << "Opcion no reconocida\n";
                continue;
            }
        }
        if (tipoPersona == 1){
            //si soy profe
            
        }
        if (tipoPersona == 2){
            //si soy alumno

        }
        if (tipoPersona == 3){
            //si soy apoderado

        }
        if (tipoPersona == -1){
            cout << "Tipo de persona no reconocido, cerrando programa...\n";
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
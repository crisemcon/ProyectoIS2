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
    Esta funcion esta horrible, seguramente se puede hacer mas
    bonito el codigo, pero me da lata.

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
            cout << "Usted no es " << roles[i] << endl;
        }
        else{
            cout << "Usted es " << roles[i] << endl;
            resultado = i;
            cout << row[0] << endl; 
        }
        // clean up the database result
        free(cstr);
        mysql_free_result(res);
    }
        


    return resultado;
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
    cout << consultaRut << endl;
    strcpy(cstr, consultaRut.c_str());
    res = mysql_perform_query(con, cstr);
    //res = mysql_perform_query(con, "select * from Persona where RUT = '12532639-0';");

    //cout << ("Database Output:\n") << std::endl;

    if ((row = mysql_fetch_row(res)) == NULL){
        cout << "Rut no existe en BD\n";
    }
    else{
        cout << "Persona encontrada\n";
        cout << row[0] << " | " << row[1] << " | " << row[2] << " | " << row[3] << " | " << row[4] << endl << endl; 
    }

    // clean up the database result
    mysql_free_result(res);


    //revisar que tipo de persona es
    //0 admin
    //1 profesor
    //2 alumno
    //3 apoderado
    int tipoPersona = consultarTipoPersona(rut, con, res);

    

    // close database connection
    mysql_close(con);

    return 0;
}


    /*while ((row = mysql_fetch_row(res)) != NULL){
        // the below row[] parametes may change depending on the size of the table and your objective
        std::cout << row[0] << std::endl;
    }*/
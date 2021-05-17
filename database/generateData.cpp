#include <iostream>
#include <fstream>
#include <string>
#include <vector>

using namespace std;
int main(){

    int n;
    cin >> n;

    vector<string> ruts(n);
    string aux;

    srand(4);
    //seed constante para generar los mismos datos siempre

    for (int i = 0; i < n; ++i)
    {
        cin >> aux;
        //cout << aux << endl;
        ruts[i] = aux;
    }

    //vamos a tener
    //1 admin
    //9 profes
    //45 apoderados
    //45 alumnos

    int rutNumber = 0;

    cout << "INSERT INTO Administrador (RUT_Adm) VALUES (\"" << ruts[0] << "\");"<<endl;
    rutNumber = rutNumber + 1;
    //USAR \" para escribir comillas

    //generamos alumnos
    for (int i = 0; i < 45; ++i)
    {
        rutNumber = rutNumber + 1;
        int salaRandom;
        salaRandom = rand()%3;
        cout << "INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES (\"" << ruts[1+i] << "\","<< salaRandom<< ");"<<endl;
    }

    cout << rutNumber << endl;

    for (int i = 0; i < 45; ++i)
    {
        int rutPadre = 46 + i;
        //cout << "Padre: " << rutPadre << endl;
        //cout << "Hijo: " << 1 + i << endl; 
        cout << "INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES (\"" << ruts[rutPadre] << "\",\""<< ruts[1+i]<< "\");"<<endl;
        rutNumber = rutNumber + 1;

    }
    cout << rutNumber << endl;
    for (int i = 0; i < 9; ++i)
    {
        int salaRandom;
        salaRandom = rand()%3;
        int rutProfe = rutNumber;
        cout << "INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES (\"" << ruts[rutProfe] << "\","<< salaRandom<< ");"<<endl;
        rutNumber = rutNumber + 1;

    }
}
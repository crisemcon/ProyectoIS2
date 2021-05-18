CREATE DATABASE ProyectoIS2
USE DATABASE ProyectoIS2

CREATE TABLE `Persona` (
  `RUT` varchar(10) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Telefono` varchar(15),
  `Direccion` varchar(250),
  PRIMARY KEY (`RUT`)
);

INSERT INTO `Persona` (`RUT`,`Nombres`,`Apellidos`,`Correo`,`Telefono`,`Direccion`) VALUES ("12532639-0","Maia Carter","Boone Barr","feugiat.Lorem.ipsum@nec.org","+56979281506","Apartado núm.: 461, 891 Aliquam Calle"),("30254369-0","Alisa Kennan","Middleton Gilbert","Phasellus@Integersem.edu","2396477","378-615 Dapibus C/"),("46247486-5","Skyler Alisa","Mcclure Malone","ac.orci@afacilisisnon.edu","+56979720930","1174 Nisl C."),("30880050-4","Kimberley Hamish","Haney Hendrix","convallis.ante@Curabiturmassa.net","+56998208366","801-5985 Donec Ctra."),("9068609-7","George Justina","Stark Waters","vitae@loremluctusut.ca","+56938731690","Apdo.:174-9429 Mi Carretera"),("35684778-4","Christopher Rachel","Rich Beard","porttitor.interdum@Namconsequatdolor.edu","+56930434842","290-5391 Integer C/"),("46921204-1","Levi Gregory","Dickerson Beach","velit.Quisque.varius@elitNullafacilisi.edu","2243121","1157 Mauris Avda."),("26518150-3","Ria Darryl","Morgan Bright","pede.Suspendisse.dui@eros.ca","+56950076364","Apartado núm.: 237, 874 Sit Avenida"),("16626139-2","Felix Barclay","Phelps Ramirez","penatibus.et@orcilobortisaugue.org","+56940025897","Apdo.:196-9829 Tristique Calle"),("27714436-0","Quon Daryl","Bray Simmons","ornare.In.faucibus@sociisnatoquepenatibus.ca","2983017","2858 Phasellus C."),("33261987-K","Tasha Daryl","Ryan Yates","vitae.orci@imperdiet.edu","2430093","Apartado núm.: 754, 9344 In, Avenida"),("49461277-1","Mark Jaden","Kirk Arnold","enim.Etiam@vehicula.ca","2132375","Apartado núm.: 131, 2069 Justo C/"),("34317335-0","David Shelley","Oliver Shaffer","tortor@urnaVivamus.net","2835311","Apdo.:505-6776 Et Av."),("38535834-2","Lawrence Abbot","Cummings Bright","Suspendisse.eleifend.Cras@maurisipsum.edu","2976273","261-3977 Orci, C."),("23915573-1","Lawrence Sawyer","Washington Cash","sem.molestie@pharetrafelis.net","2217827","Apartado núm.: 409, 8954 Mauris Calle"),("40305107-1","Lev Wyatt","Andrews Morris","Quisque.nonummy@tellussem.com","2316761","968-2681 Tincidunt "),("25807367-3","Victoria Castor","Houston Dillon","facilisi.Sed@Cras.net","2665967","531-5075 Malesuada Avenida"),("41322492-6","Quynn Reagan","Montoya Long","Proin.vel@mifringilla.com","2589454","Apdo.:731-9878 Laoreet C/"),("36137770-2","Aurelia Imani","Jenkins Meadows","enim.nec.tempus@vitae.org","2552871","Apartado núm.: 722, 6406 Eu, C."),("15543286-1","Demetria Chancellor","Phelps Clayton","cubilia@sapien.co.uk","2970790","855-1606 Vivamus Ctra."),("43169863-3","Candice Mariam","Norman Howe","facilisis@Donec.net","+56995513664","2218 Sit Avda."),("39848103-8","Gay Imogene","Carpenter Stafford","Donec@pede.edu","+56950670166","Apartado núm.: 715, 5809 Mi C."),("30808158-3","Guinevere Chancellor","Roach King","Curabitur.massa.Vestibulum@Quisqueornaretortor.com","+56929111437","4942 Integer C/"),("50817862-K","Dominique Lavinia","Conway Petersen","Fusce@Sednec.net","+56925867911","Apartado núm.: 660, 7483 Turpis Avenida"),("29112855-6","Noah Kasimir","Moreno Clay","lectus.pede.ultrices@gravidaAliquamtincidunt.com","+56999662679","Apartado núm.: 512, 5699 Non, Avda."),("47560456-3","Malik Emily","Chavez Bowman","eleifend.Cras@ametorci.com","+56949523433","Apartado núm.: 421, 6101 Nunc Ctra."),("28002750-2","Perry Walter","Chambers Petersen","pellentesque.a.facilisis@etnuncQuisque.ca","2357489","Apartado núm.: 464, 5744 Libero. Av."),("43594004-8","Carol Autumn","Hopper Contreras","congue.elit.sed@ut.edu","2529553","517-811 Facilisis Ctra."),("36986521-8","Carla Brynne","Galloway Moreno","augue.eu@Nullatemporaugue.com","2879808","2218 Quis "),("48361811-5","Rina Howard","Hodges Prince","tortor@enimnisl.net","2431862","Apartado núm.: 774, 5318 Ut Avenida"),("19831634-2","Camden Geraldine","Dean Maddox","et.eros.Proin@eu.edu","+56927560331","Apartado núm.: 936, 2495 Eros C/"),("27752510-0","Nathaniel Ella","Franco Dixon","Cum.sociis.natoque@interdumliberodui.org","+56972803072","7016 Amet "),("20939311-5","Edan Brian","Sosa Irwin","sem@egetmetus.net","+56915331755","3172 Sed "),("24169868-8","Paula Bryar","Rutledge Knapp","risus.Nunc.ac@Donecsollicitudin.ca","2478011","205-684 Enim. "),("29139155-9","Dustin Marshall","Simpson Langley","mauris@ultrices.edu","2278523","680 Mus. Av."),("27241406-8","Jordan Elliott","Francis Frank","nibh@parturient.org","+56919359707","3989 Dignissim Av."),("12593465-K","Quinn Leigh","Chase Hoffman","in.cursus.et@netusetmalesuada.net","2455491","Apdo.:960-5356 Fringilla C/"),("19583393-1","Wilma Aladdin","Bonner Bird","cursus.vestibulum@porttitorinterdumSed.co.uk","2256329","Apdo.:527-8326 Luctus Calle"),("44127484-K","Jacqueline Gil","Estes Ware","ac@tellusNunc.co.uk","2823478","5494 Eu "),("31386431-6","Aristotle India","House Wise","urna.Nunc.quis@Suspendissetristique.ca","2513985","Apdo.:393-8133 Adipiscing Av."),("31102861-8","Gannon Caleb","Hooper Hensley","neque.vitae.semper@velquamdignissim.com","2800931","650-2188 Pede C/"),("47738328-9","Nathan Alika","Patel Mosley","montes@ullamcorper.ca","2686610","Apartado núm.: 887, 5599 Elit, Ctra."),("43619552-4","Cedric Rana","Daniels Ewing","Maecenas.ornare.egestas@ametconsectetueradipiscing.ca","+56948092970","840-5267 Et "),("31456164-3","Yardley Orla","Hopkins Odom","ut.dolor@dictum.org","2604854","404-3067 Gravida. C/"),("44775314-6","Vielka Imelda","Salazar Irwin","adipiscing.fringilla.porttitor@pharetra.com","+56955248209","Apartado núm.: 561, 5083 Ut Carretera"),("47624538-9","Giacomo Hop","Mcmahon Baldwin","sed.consequat@metussit.edu","2294125","Apdo.:341-1086 Quis, Avenida"),("28083850-0","Eric Kelly","Aguirre Mcdonald","dictum.sapien.Aenean@accumsansed.ca","+56946730895","Apartado núm.: 639, 7347 Mauris Calle"),("15758496-0","Nora Priscilla","Horton Horton","Mauris@cursusIntegermollis.net","2512468","909-8910 Et, Avenida"),("26599883-6","Lucy Cyrus","Ortiz Warner","egestas.Aliquam.fringilla@lacusEtiam.org","2971706","466-5303 Lectus Ctra."),("30910097-2","Herman Dahlia","Higgins Fernandez","risus.Quisque.libero@blandit.com","2482717","778-8815 Hendrerit Carretera"),("8071934-5","Walter William","King Goodman","elit.pharetra.ut@ornareFuscemollis.ca","+56996544652","592 Quam Carretera"),("34416216-6","Dominique David","Martinez Barton","amet.nulla@cubiliaCuraeDonec.org","+56945371850","6850 Augue Avda."),("18931101-K","Brenna Andrew","Caldwell Farmer","viverra@Phasellus.ca","+56996968546","3009 Et Ctra."),("44447252-9","Paki Willa","Cobb Peterson","erat@dolorvitae.net","2240313","Apdo.:113-2256 Ipsum Calle"),("42481690-6","Wynne Camilla","Vaughn Jones","nulla.In@feugiattellus.co.uk","+56991313535","Apartado núm.: 132, 7567 Fermentum C."),("41366409-8","Lionel Gannon","Bennett Randolph","justo.sit@lobortis.org","+56921832725","6521 Placerat Ctra."),("7201253-4","Melanie Karina","Meadows Sexton","purus@nonarcu.net","+56962108555","Apartado núm.: 813, 1149 Suspendisse Calle"),("17609704-3","Stella Quinn","Gardner Cross","ipsum.porta@etrisus.ca","+56932652816","Apdo.:385-3573 Montes, C."),("5691367-K","Lois Winter","Scott Russo","vulputate.ullamcorper@convallisligulaDonec.edu","+56967184507","Apdo.:339-7180 Felis Avda."),("19437134-9","Maggie Stone","Lindsey Ratliff","iaculis@pedenecante.ca","+56967214401","6653 Enim Calle"),("44969015-K","Blair Chastity","Pugh Hardin","ipsum.cursus@auctorveliteget.org","2598837","Apdo.:210-790 Nec "),("28153700-8","September Castor","Puckett Farmer","Sed.id.risus@dignissim.net","2993729","475-8819 Eu, Ctra."),("32359130-K","Erica Danielle","Lamb Kelley","tellus@Utsagittislobortis.com","+56988580587","Apdo.:712-7078 Tempus C/"),("39696570-4","Abraham Isadora","Cleveland Butler","magna.Praesent@leoVivamus.co.uk","2205187","Apdo.:496-6081 Condimentum. Calle"),("6465312-1","Cooper Brenda","Medina Boyle","neque@in.ca","+56984774556","Apartado núm.: 972, 2136 Aliquam Av."),("9403375-6","Hedy Faith","Acevedo Merritt","mollis.Duis.sit@in.co.uk","+56987790632","Apartado núm.: 277, 9224 Cras C/"),("30474216-K","Kaye Kyra","Mcneil Flowers","lorem@nectempusmauris.ca","+56969976999","Apdo.:892-7033 Ut Avenida"),("33969997-6","Hamish Velma","Santiago Benton","ullamcorper.nisl.arcu@diamnunc.org","+56960116673","Apartado núm.: 724, 2326 A, "),("33389375-4","Nora Avram","Martinez Yang","mauris.rhoncus.id@vitaesodales.org","+56956237521","Apartado núm.: 424, 5530 Consectetuer Calle"),("50649764-7","Felicia Steel","Villarreal Goff","mauris@acmattis.ca","2400731","Apdo.:492-5836 Ligula. "),("14792146-2","Zia Colby","Weber Torres","facilisis.Suspendisse.commodo@augue.net","2269051","Apartado núm.: 516, 5321 Aliquam C."),("13255581-8","Cameron Rhonda","Faulkner Klein","libero.at.auctor@etmagnis.com","2826225","238-807 Eu, Avenida"),("40277027-9","Xander Brock","Mays Chapman","nibh.Phasellus.nulla@dapibus.net","2772704","Apdo.:322-7752 Duis Avenida"),("41789765-8","Gage Chester","Stein Jordan","nibh.dolor@laciniaSed.edu","+56948820607","Apdo.:696-3321 Nibh Ctra."),("47008596-7","Hedley Anne","Yates Copeland","magna.tellus@ipsum.net","2361067","312-4568 Elit, Ctra."),("16299096-9","Lillith Eliana","Willis Elliott","nunc@amet.co.uk","+56926592699","Apdo.:521-5367 In C."),("41691010-3","Hollee Elizabeth","Olsen Bradshaw","vulputate.velit@semPellentesqueut.ca","+56943306488","6578 Mattis. Calle"),("9483631-K","Lyle Alexis","Fitzpatrick Bates","ipsum.primis.in@diamPellentesquehabitant.com","2434303","813-8769 Curabitur Ctra."),("29677454-5","Hayes Victor","Stout Forbes","natoque.penatibus@SeddictumProin.com","+56933643342","658-2729 Nisl. Av."),("14181442-7","Felix Gareth","French Lane","Quisque@ligulaNullamenim.net","2930508","Apartado núm.: 215, 8284 Nunc Avenida"),("14105509-7","Charlotte Ramona","Mcgowan Diaz","ullamcorper.eu.euismod@sitametlorem.ca","2255570","Apdo.:842-5538 Tempor C."),("50636543-0","Shad Alfreda","Townsend Gutierrez","dolor@pellentesque.org","2888317","Apdo.:243-8701 Amet, Avenida"),("18878684-7","Kamal Callie","Le French","Nunc.ac.sem@diamnuncullamcorper.edu","2850000","Apartado núm.: 402, 3124 Tincidunt, Av."),("29594686-5","Raphael Reese","Mercer Cleveland","non@atortorNunc.com","+56924708392","465-6863 Dictum "),("47174420-4","Maris Uriel","Barry Barber","Integer.vulputate@Inornare.net","2807757","Apartado núm.: 495, 6634 Ac, Ctra."),("25959826-5","Ciara Kaseem","Macdonald Scott","auctor.nunc.nulla@dictum.org","2706466","605-9553 Nulla Avenida"),("21800293-5","Ima Jerome","Thornton Gould","vel@InfaucibusMorbi.edu","+56965554530","Apartado núm.: 718, 331 Eget Avda."),("41085108-3","Addison Melvin","Henson Shepard","leo.Morbi@non.org","+56980662525","Apdo.:520-5185 Egestas Av."),("35941280-0","Xavier Cain","Cardenas Romero","purus.gravida.sagittis@adipiscing.org","2733035","272-6412 Adipiscing, Av."),("35043371-6","Hiroko Kaseem","Norman Bond","nec.tellus.Nunc@sagittisaugue.org","+56924693780","Apdo.:431-419 Nunc Avda."),("40234336-2","Grady Remedios","Jennings Velasquez","neque.sed@in.ca","2573533","785-4073 Gravida Avda."),("6829550-5","Amelia Neve","Roach Hoover","et@vehiculaetrutrum.com","2170943","Apartado núm.: 512, 1203 Semper. Carretera"),("9127699-2","Preston Lila","Gillespie Wade","erat.semper@egestasa.com","2565166","469-3894 Erat "),("40012026-9","Akeem Xavier","George Wolfe","dapibus.quam.quis@sedtortorInteger.com","+56912805877","4783 Ultricies "),("41248575-0","Nina Yvonne","Summers Olsen","fringilla@enimnectempus.net","+56988935694","7592 Cursus Ctra."),("45832874-9","Seth Brandon","Tate Rutledge","Mauris.magna@rutrumeu.org","+56949966318","Apdo.:413-2762 Ridiculus Avenida"),("14450006-7","Stuart Cooper","Justice Sherman","natoque.penatibus.et@dictum.net","+56984613565","8795 Bibendum C/"),("40321590-2","Xandra Claudia","Whitley Gillespie","justo.eu@tempuseu.com","2693907","9143 Maecenas Avenida"),("7597573-2","Herrod Katell","Poole Cooley","in.faucibus.orci@diamPellentesque.net","+56991299668","Apartado núm.: 616, 9626 Mauris Calle"),("19939277-8","Simon Arsenio","Moss Suarez","non@eratSed.co.uk","+56927248224","5001 Montes, Ctra.");



/*
1 admin
9 prof
45 alumno
45 apoderado
*/

CREATE TABLE Sala (
    Sala_ID int NOT NULL,
    Nombre varchar(10) NOT NULL,
    PRIMARY KEY (Sala_ID)
);

INSERT INTO Sala (Sala_ID, Nombre) VALUES (0,"106");
INSERT INTO Sala (Sala_ID, Nombre) VALUES (1,"107");
INSERT INTO Sala (Sala_ID, Nombre) VALUES (2,"108");
INSERT INTO Sala (Sala_ID, Nombre) VALUES (3,"109");

--herencia simple
CREATE TABLE Administrador (
    RUT_Adm varchar(10) NOT NULL,
    PRIMARY KEY (RUT_Adm),
    FOREIGN KEY (RUT_Adm) REFERENCES Persona(RUT)
);

INSERT INTO Administrador (RUT_ADM) VALUES ("12532639-0"); 

--herencia simple
CREATE TABLE Alumno (
    RUT_Alu varchar(10) NOT NULL,
    Sala_Alu int NOT NULL,
    PRIMARY KEY (RUT_Alu),
    FOREIGN KEY (RUT_Alu) REFERENCES Persona(RUT),
    FOREIGN KEY (Sala_Alu) REFERENCES Sala(Sala_ID)
);

INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("12593465-K",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("13255581-8",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("14105509-7",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("14181442-7",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("14450006-7",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("14792146-2",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("15543286-1",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("15758496-0",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("16299096-9",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("16626139-2",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("17609704-3",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("18878684-7",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("18931101-K",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("19437134-9",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("19583393-1",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("19831634-2",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("19939277-8",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("20939311-5",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("21800293-5",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("23915573-1",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("24169868-8",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("25807367-3",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("25959826-5",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("26518150-3",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("26599883-6",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("27241406-8",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("27714436-0",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("27752510-0",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("28002750-2",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("28083850-0",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("28153700-8",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("29112855-6",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("29139155-9",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("29594686-5",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("29677454-5",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("30254369-0",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("30474216-K",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("30808158-3",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("30880050-4",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("30910097-2",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("31102861-8",1);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("31386431-6",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("31456164-3",0);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("32359130-K",2);
INSERT INTO Alumno (RUT_Alu, Sala_Alu) VALUES ("33261987-K",3);

	--apoderado deberia separarse
	--en varias tablas para evitar repetir
	--pero como van a haber tan pocos
	--casos en que un apoderado tiene mas de 1 hijo
	--no lo considere
CREATE TABLE Apoderado (
    RUT_Apo varchar(10) NOT NULL,
    RUT_Pup varchar(10) NOT NULL,
    PRIMARY KEY (RUT_Apo),
    FOREIGN KEY (RUT_Apo) REFERENCES Persona(RUT),
    FOREIGN KEY (RUT_Pup) REFERENCES Alumno(RUT_Alu)
);

INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("33389375-4","12593465-K");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("33969997-6","13255581-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("34317335-0","14105509-7");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("34416216-6","14181442-7");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("35043371-6","14450006-7");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("35684778-4","14792146-2");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("35941280-0","15543286-1");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("36137770-2","15758496-0");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("36986521-8","16299096-9");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("38535834-2","16626139-2");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("39696570-4","17609704-3");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("39848103-8","18878684-7");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("40012026-9","18931101-K");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("40234336-2","19437134-9");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("40277027-9","19583393-1");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("40305107-1","19831634-2");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("40321590-2","19939277-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41085108-3","20939311-5");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41248575-0","21800293-5");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41322492-6","23915573-1");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41366409-8","24169868-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41691010-3","25807367-3");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("41789765-8","25959826-5");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("42481690-6","26518150-3");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("43169863-3","26599883-6");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("43594004-8","27241406-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("43619552-4","27714436-0");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("44127484-K","27752510-0");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("44447252-9","28002750-2");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("44775314-6","28083850-0");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("44969015-K","28153700-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("45832874-9","29112855-6");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("46247486-5","29139155-9");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("46921204-1","29594686-5");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("47008596-7","29677454-5");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("47174420-4","30254369-0");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("47560456-3","30474216-K");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("47624538-9","30808158-3");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("47738328-9","30880050-4");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("48361811-5","30910097-2");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("49461277-1","31102861-8");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("50636543-0","31386431-6");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("50649764-7","31456164-3");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("50817862-K","32359130-K");
INSERT INTO Apoderado (RUT_Apo, RUT_Pup) VALUES ("5691367-K","33261987-K");

CREATE TABLE Profesor (
    RUT_Pro varchar(10) NOT NULL,
    Sala_Pro int NOT NULL,
    PRIMARY KEY (RUT_Pro),
    FOREIGN KEY (RUT_Pro) REFERENCES Persona(RUT),
    FOREIGN KEY (Sala_Pro) REFERENCES Sala(Sala_ID)
);

INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("6465312-1",3);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("6829550-5",1);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("7201253-4",1);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("7597573-2",0);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("8071934-5",1);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("9068609-7",0);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("9127699-2",2);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("9403375-6",0);
INSERT INTO Profesor (RUT_Pro, Sala_Pro) VALUES ("9483631-K",1);


	--estado_colegio
	--determina si el colegio esta en cuarentena o no
CREATE TABLE Colegio (
	ID_Colegio int NOT NULL,
	Estado_Colegio int NOT NULL,
    Nombre_Colegio varchar(50) NOT NULL,	
	PRIMARY KEY (ID_Colegio)
);

INSERT INTO Colegio (ID_Colegio, Estado_Colegio, Nombre_Colegio) VALUES (0,0, "Liceo 921");

CREATE TABLE Contagio (
	Contagio_ID int NOT NULL,
    RUT_Con varchar(10) NOT NULL,
    Fecha date NOT NULL,
    PRIMARY KEY (Contagio_ID),
    FOREIGN KEY (RUT_Con) REFERENCES Persona(RUT)
);

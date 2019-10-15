CREATE DATABASE nodearch_dbconfig;
use nodearch_dbconfig;


CREATE TABLE TBPROFILE(
fiIdProfile           int         NOT NULL  AUTO_INCREMENT,
fcProfileName         varchar(50) NOT NULL,
fdCreateDate          datetime    NOT NULL,
fiStatus              bit,
primary key (fiIdProfile)
);


CREATE TABLE TBUSERS(
fiIdUser             int         NOT NULL AUTO_INCREMENT,
fcUserName           varchar(50) NOT NULL,
fcUserSecondName     varchar(50) NOT NULL,
fcUserLastName       varchar(50) NOT NULL,
fcMail               varchar(50) NOT NULL,
fiPhoneNumber        int         NOT NULL,
fiIdProfile          int         NOT NULL,
fiStatus             int         NOT NULL,
PRIMARY KEY(fiIdUser),
FOREIGN KEY(fiIdProfile) REFERENCES TBPROFILE (fiIdProfile)      
);

/*===============================================================Create profile procedure===========================================*/
DELIMITER $$
CREATE PROCEDURE nodearch_dbconfig.SPWEBPROFILEINSERT(IN FCPROFILENAME VARCHAR(50))
BEGIN

DECLARE   CSIONE              BIT     DEFAULT                  1;
DECLARE   CSISUCCESSRESPONSE  boolean DEFAULT               true;
DECLARE   CSIERRORRESPONSE    boolean DEFAULT              false;

DECLARE EXIT HANDLER FOR SQLEXCEPTION 
BEGIN
      ROLLBACK;
      SELECT CSIERRORRESPONSE AS RESPONSE;
END;

START TRANSACTION;
         
      INSERT INTO nodearch_dbconfig.TBPROFILE (fcProfileName, fdCreateDate, fiStatus)
					    VALUES(FCPROFILENAME, (select now()), CSIONE);
      
COMMIT;
      SELECT  CSISUCCESSRESPONSE AS RESPONSE;
END$$
DELIMITER ;
/*===================================================================================================================================*/


/*===============================================================Create user procedure===============================================*/

DELIMITER  $$

CREATE PROCEDURE nodearch_dbconfig.SPWEBCREATEUSER()
BEGIN

END
END$$
/*===================================================================================================================================*/

/*===============================================================Create user procedure===============================================*/

DELIMITER  $$

CREATE PROCEDURE nodearch_dbconfig.SPWEBRETURNPROFILES()
BEGIN

END
END$$
/*===================================================================================================================================*/


call SPWEBPROFILEINSERT('CLIENTE');
 
SELECT * FROM TBPROFILE;
 
truncate table nodearch_dbconfig.tbprofile;
 
delete from nodearch_dbconfig.tbprofile;

drop procedure nodearch_dbconfig.SPWEBPROFILEINSERT;





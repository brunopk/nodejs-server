# Databases

An easy way to install and run any Maria DB version is through Docker, for instance :

```bash
docker run --name mariadb-container -e MARIADB_ROOT_PASSWORD=root -p 3306:3306 mariadb:10.11
```

Create the *test* database with the following script:

```sql
DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

CREATE TABLE `test`.`table` (
  `field1` VARCHAR(256) NOT NULL,
  `field2` VARCHAR(256) NOT NULL
);

INSERT INTO `test`.`table`   VALUES ('val1', 'val2'), ('val3', 'val4')
```

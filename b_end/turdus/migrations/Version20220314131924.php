<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220314131924 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE allergie (id INT AUTO_INCREMENT NOT NULL, substance VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE allergies_log (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, allergie_id INT NOT NULL, date_time DATETIME NOT NULL, description LONGTEXT DEFAULT NULL, INDEX IDX_83474E096B899279 (patient_id), INDEX IDX_83474E097C86304A (allergie_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bill (id INT AUTO_INCREMENT NOT NULL, customer_id INT NOT NULL, datetime DATETIME NOT NULL, INDEX IDX_7A2119E39395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, postal_code_id INT NOT NULL, family_id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, dni VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) NOT NULL, info LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_81398E09E7927C74 (email), INDEX IDX_81398E09BDBA6A61 (postal_code_id), INDEX IDX_81398E09C35E566A (family_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE diagnosis (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE document (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, visit_id INT NOT NULL, category VARCHAR(255) NOT NULL, date_time DATETIME NOT NULL, url VARCHAR(255) NOT NULL, INDEX IDX_D8698A766B899279 (patient_id), INDEX IDX_D8698A7675FA0FF2 (visit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE family (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient (id INT AUTO_INCREMENT NOT NULL, responsible_id INT DEFAULT NULL, family_id INT DEFAULT NULL, chip BIGINT DEFAULT NULL, birthday DATE NOT NULL, species VARCHAR(255) NOT NULL, race VARCHAR(255) DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, eyes VARCHAR(255) DEFAULT NULL, info LONGTEXT DEFAULT NULL, INDEX IDX_1ADAD7EB602AD315 (responsible_id), INDEX IDX_1ADAD7EBC35E566A (family_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE postal_code (id INT AUTO_INCREMENT NOT NULL, province VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, supplier_id INT NOT NULL, code VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, dose VARCHAR(255) DEFAULT NULL, price DOUBLE PRECISION NOT NULL, species LONGTEXT DEFAULT NULL, stock INT NOT NULL, lot VARCHAR(255) NOT NULL, expiration DATE DEFAULT NULL, life INT DEFAULT NULL, INDEX IDX_D34A04AD2ADD6D8C (supplier_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE products_log (id INT AUTO_INCREMENT NOT NULL, bill_id INT NOT NULL, patient_id INT NOT NULL, product_id INT NOT NULL, date DATE NOT NULL, quantity DOUBLE PRECISION NOT NULL, paid TINYINT(1) NOT NULL, INDEX IDX_4B8D919B1A8C12F5 (bill_id), INDEX IDX_4B8D919B6B899279 (patient_id), INDEX IDX_4B8D919B4584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reminder (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, product_id INT DEFAULT NULL, service_id INT DEFAULT NULL, visit_id INT DEFAULT NULL, category VARCHAR(255) NOT NULL, date DATE NOT NULL, INDEX IDX_40374F406B899279 (patient_id), INDEX IDX_40374F404584665A (product_id), INDEX IDX_40374F40ED5CA9E6 (service_id), UNIQUE INDEX UNIQ_40374F4075FA0FF2 (visit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, category VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, price DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE services_log (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, service_id INT NOT NULL, bill_id INT NOT NULL, date DATE NOT NULL, quantity DOUBLE PRECISION NOT NULL, paid TINYINT(1) NOT NULL, INDEX IDX_82607D66B899279 (patient_id), INDEX IDX_82607D6ED5CA9E6 (service_id), INDEX IDX_82607D61A8C12F5 (bill_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE supplier (id INT AUTO_INCREMENT NOT NULL, postal_code_id INT DEFAULT NULL, code VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, info LONGTEXT DEFAULT NULL, tax INT DEFAULT NULL, INDEX IDX_9B2A6C7EBDBA6A61 (postal_code_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, salary DOUBLE PRECISION NOT NULL, phone INT NOT NULL, collegiate_n INT DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE visit (id INT AUTO_INCREMENT NOT NULL, patient_id INT NOT NULL, user_id INT NOT NULL, category VARCHAR(255) NOT NULL, date_time DATETIME NOT NULL, description LONGTEXT NOT NULL, treatment LONGTEXT DEFAULT NULL, weight DOUBLE PRECISION DEFAULT NULL, done TINYINT(1) NOT NULL, INDEX IDX_437EE9396B899279 (patient_id), INDEX IDX_437EE939A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE visit_diagnosis (visit_id INT NOT NULL, diagnosis_id INT NOT NULL, INDEX IDX_FD07DC2475FA0FF2 (visit_id), INDEX IDX_FD07DC243CBE4D00 (diagnosis_id), PRIMARY KEY(visit_id, diagnosis_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE allergies_log ADD CONSTRAINT FK_83474E096B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE allergies_log ADD CONSTRAINT FK_83474E097C86304A FOREIGN KEY (allergie_id) REFERENCES allergie (id)');
        $this->addSql('ALTER TABLE bill ADD CONSTRAINT FK_7A2119E39395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09BDBA6A61 FOREIGN KEY (postal_code_id) REFERENCES postal_code (id)');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09C35E566A FOREIGN KEY (family_id) REFERENCES family (id)');
        $this->addSql('ALTER TABLE document ADD CONSTRAINT FK_D8698A766B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE document ADD CONSTRAINT FK_D8698A7675FA0FF2 FOREIGN KEY (visit_id) REFERENCES visit (id)');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EB602AD315 FOREIGN KEY (responsible_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EBC35E566A FOREIGN KEY (family_id) REFERENCES family (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD2ADD6D8C FOREIGN KEY (supplier_id) REFERENCES supplier (id)');
        $this->addSql('ALTER TABLE products_log ADD CONSTRAINT FK_4B8D919B1A8C12F5 FOREIGN KEY (bill_id) REFERENCES bill (id)');
        $this->addSql('ALTER TABLE products_log ADD CONSTRAINT FK_4B8D919B6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE products_log ADD CONSTRAINT FK_4B8D919B4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT FK_40374F406B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT FK_40374F404584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT FK_40374F40ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT FK_40374F4075FA0FF2 FOREIGN KEY (visit_id) REFERENCES visit (id)');
        $this->addSql('ALTER TABLE services_log ADD CONSTRAINT FK_82607D66B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE services_log ADD CONSTRAINT FK_82607D6ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE services_log ADD CONSTRAINT FK_82607D61A8C12F5 FOREIGN KEY (bill_id) REFERENCES bill (id)');
        $this->addSql('ALTER TABLE supplier ADD CONSTRAINT FK_9B2A6C7EBDBA6A61 FOREIGN KEY (postal_code_id) REFERENCES postal_code (id)');
        $this->addSql('ALTER TABLE visit ADD CONSTRAINT FK_437EE9396B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE visit ADD CONSTRAINT FK_437EE939A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE visit_diagnosis ADD CONSTRAINT FK_FD07DC2475FA0FF2 FOREIGN KEY (visit_id) REFERENCES visit (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE visit_diagnosis ADD CONSTRAINT FK_FD07DC243CBE4D00 FOREIGN KEY (diagnosis_id) REFERENCES diagnosis (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE allergies_log DROP FOREIGN KEY FK_83474E097C86304A');
        $this->addSql('ALTER TABLE products_log DROP FOREIGN KEY FK_4B8D919B1A8C12F5');
        $this->addSql('ALTER TABLE services_log DROP FOREIGN KEY FK_82607D61A8C12F5');
        $this->addSql('ALTER TABLE bill DROP FOREIGN KEY FK_7A2119E39395C3F3');
        $this->addSql('ALTER TABLE patient DROP FOREIGN KEY FK_1ADAD7EB602AD315');
        $this->addSql('ALTER TABLE visit_diagnosis DROP FOREIGN KEY FK_FD07DC243CBE4D00');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09C35E566A');
        $this->addSql('ALTER TABLE patient DROP FOREIGN KEY FK_1ADAD7EBC35E566A');
        $this->addSql('ALTER TABLE allergies_log DROP FOREIGN KEY FK_83474E096B899279');
        $this->addSql('ALTER TABLE document DROP FOREIGN KEY FK_D8698A766B899279');
        $this->addSql('ALTER TABLE products_log DROP FOREIGN KEY FK_4B8D919B6B899279');
        $this->addSql('ALTER TABLE reminder DROP FOREIGN KEY FK_40374F406B899279');
        $this->addSql('ALTER TABLE services_log DROP FOREIGN KEY FK_82607D66B899279');
        $this->addSql('ALTER TABLE visit DROP FOREIGN KEY FK_437EE9396B899279');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09BDBA6A61');
        $this->addSql('ALTER TABLE supplier DROP FOREIGN KEY FK_9B2A6C7EBDBA6A61');
        $this->addSql('ALTER TABLE products_log DROP FOREIGN KEY FK_4B8D919B4584665A');
        $this->addSql('ALTER TABLE reminder DROP FOREIGN KEY FK_40374F404584665A');
        $this->addSql('ALTER TABLE reminder DROP FOREIGN KEY FK_40374F40ED5CA9E6');
        $this->addSql('ALTER TABLE services_log DROP FOREIGN KEY FK_82607D6ED5CA9E6');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD2ADD6D8C');
        $this->addSql('ALTER TABLE visit DROP FOREIGN KEY FK_437EE939A76ED395');
        $this->addSql('ALTER TABLE document DROP FOREIGN KEY FK_D8698A7675FA0FF2');
        $this->addSql('ALTER TABLE reminder DROP FOREIGN KEY FK_40374F4075FA0FF2');
        $this->addSql('ALTER TABLE visit_diagnosis DROP FOREIGN KEY FK_FD07DC2475FA0FF2');
        $this->addSql('DROP TABLE allergie');
        $this->addSql('DROP TABLE allergies_log');
        $this->addSql('DROP TABLE bill');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE diagnosis');
        $this->addSql('DROP TABLE document');
        $this->addSql('DROP TABLE family');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE postal_code');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE products_log');
        $this->addSql('DROP TABLE reminder');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE services_log');
        $this->addSql('DROP TABLE supplier');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE visit');
        $this->addSql('DROP TABLE visit_diagnosis');
    }
}

<?php

namespace App\Repository;

use App\Entity\Patient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Patient|null find($id, $lockMode = null, $lockVersion = null)
 * @method Patient|null findOneBy(array $criteria, array $orderBy = null)
 * @method Patient[]    findAll()
 * @method Patient[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PatientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Patient::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Patient $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(Patient $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Patient[] Returns an array of Patient objects
    //  */
    
    public function findByVets($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.vet IN (:val)')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByComplex(
        $customers,
        $users,
        $species,
        $sterilised,
        $name
        )
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.responsible IN (:val)')
            ->andWhere('p.vet IN (:usr)')
            ->andWhere('p.species IN (:spe)')
            ->andWhere('p.sterilised LIKE (:ste)')
            ->andWhere('p.name LIKE (:nam)')
            ->setParameter('val', $customers)
            ->setParameter('usr', $users)
            ->setParameter('spe', $species)
            ->setParameter('ste', $sterilised)
            ->setParameter('nam', $name)
            ->getQuery()
            ->getResult()
        ;
    }
    

    /*
    public function findOneBySomeField($value): ?Patient
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

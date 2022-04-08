<?php

namespace App\Repository;

use App\Entity\Visit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Visit|null find($id, $lockMode = null, $lockVersion = null)
 * @method Visit|null findOneBy(array $criteria, array $orderBy = null)
 * @method Visit[]    findAll()
 * @method Visit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VisitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Visit::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Visit $entity, bool $flush = true): void
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
    public function remove(Visit $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return Visit[] Returns an array of Visit objects
    //  */
    public function findByDate($value)
    {
        return $this->createQueryBuilder('v')
        ->andWhere('v.date_time LIKE :val')
        ->setParameter('val', $value)
        ->getQuery()
        ->getResult();
    }

    public function findByDateAndUser($value, $user)
    {
        return $this->createQueryBuilder('v')
        ->andWhere('v.user = :usr')
        ->andWhere('v.date_time LIKE :val')
        ->setParameter('usr', $user)
        ->setParameter('val', $value)
        ->getQuery()
        ->getResult();
    }

    public function findByDateAndPatient($date, $patient)
    {
        return $this->createQueryBuilder('v')
        ->andWhere('v.date_time LIKE :date')
        ->andWhere('v.patient = :pat')
        ->setParameter('date', $date)
        ->setParameter('pat', $patient)
        ->getQuery()
        ->getResult();
    }

    public function findByDateAndVet($date, $vet)
    {
        return $this->createQueryBuilder('v')
        ->andWhere('v.date_time LIKE :date')
        ->andWhere('v.user = :vet')
        ->setParameter('date', $date)
        ->setParameter('vet', $vet)
        ->getQuery()
        ->getResult();
    }
    
    public function findByPatients($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.patient IN (:val)')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findByUsers($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.user IN (:val)')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }

    // public function findByCustomers($value)
    // {
    //     return $this->createQueryBuilder('v')
    //         ->andWhere('v.customer IN (:val)')
    //         ->setParameter('val', $value)
    //         ->getQuery()
    //         ->getResult()
    //     ;
    // }
    /*
    public function findOneBySomeField($value): ?Visit
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

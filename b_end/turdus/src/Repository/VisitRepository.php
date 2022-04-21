<?php

namespace App\Repository;

use App\Entity\Visit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator;
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

    /**
     * PAGINATOR
     */
    public function paginate($dql, $page = 1, $limit = 10)
    {
        $paginator = new Paginator($dql);

        $paginator->getQuery()
            ->setFirstResult($limit * ($page - 1)) // Offset
            ->setMaxResults($limit); // Limit

        return $paginator;
    }
    
    // /**
    //  * @return Visit[] Returns an array of Visit objects
    //  */

    public function findAll($currentPage = 1, $limit = 10)
    {
        $query =  $this->createQueryBuilder('v')
            ->orderBy('v.date_time', 'ASC')
            ->getQuery();

        $all = $query->getResult();
        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    public function findByQuery($q, $currentPage = 1, $limit = 10)
    {

        $query = $this->createQueryBuilder('v')
            ->innerJoin('v.patient', 'p')
            ->innerJoin('v.user', 'u')
            ->innerJoin('p.responsible', 'c')
            ->andWhere('v.date_time LIKE :date')
            ->andWhere('u.name LIKE :vet')
            ->andWhere('c.name LIKE :cust')
            ->andWhere('p.name LIKE :pat')
            ->andWhere('v.category LIKE :cat')
            ->andWhere('v.done LIKE :comp')
            ->setParameter('date', '%'.$q['date'].'%')
            ->setParameter('pat', '%'.$q['patient'].'%')
            ->setParameter('cat', '%'.$q['category'].'%')
            ->setParameter('comp', '%'.$q['completed'].'%')
            ->setParameter('vet', '%'.$q['vet'].'%')
            ->setParameter('cust', '%'.$q['customer'].'%')
            ->orderBy('v.date_time', 'ASC')
            ->getQuery();

        $all = $query->getResult();

        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    public function findByDateAndUser($q)
    {
        return $this->createQueryBuilder('v')
        ->innerJoin('v.user', 'u')
        ->andWhere('u.username = :usr')
        ->andWhere('v.date_time LIKE :val')
        ->setParameter('usr', $q['user'])
        ->setParameter('val', $q['date'].'%')
        ->getQuery()
        ->getResult();
    }

    public function findByDate($q)
    {
        return $this->createQueryBuilder('v')
        ->andWhere('v.date_time LIKE :val')
        ->setParameter('val', $q['date'].'%')
        ->getQuery()
        ->getResult();
    }

    
    // public function findOneBySomeField($value): ?Visit
    // {
    //     return $this->createQueryBuilder('v')
    //         ->andWhere('v.exampleField = :val')
    //         ->setParameter('val', $value)
    //         ->getQuery()
    //         ->getOneOrNullResult()
    //     ;
    // }
    
}

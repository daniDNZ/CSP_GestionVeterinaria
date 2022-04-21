<?php

namespace App\Repository;

use App\Entity\Patient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator;
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
    //  * @return Patient[] Returns an array of Patient objects
    //  */
    public function findAll($currentPage = 1, $limit = 10)
    {
        $query = $this->createQueryBuilder('p')
            ->orderBy('p.name', 'ASC')
            ->getQuery();
        
        $all = $query->getResult();
        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    public function findByQuery($q, $currentPage = 1, $limit = 10)
    {
        $query = $this->createQueryBuilder('p')
            ->innerJoin('p.species', 's')
            ->innerJoin('p.race', 'r')
            ->innerJoin('p.vet', 'v')
            ->innerJoin('p.responsible', 'c')
            ->andWhere('p.name LIKE :name')
            ->andWhere('s.name LIKE :spe')
            ->andWhere('r.name LIKE :race')
            ->andWhere('p.birthday LIKE :birth')
            ->andWhere('p.gender LIKE :gen')
            ->andWhere('p.sterilised LIKE :ster')
            ->andWhere('v.name LIKE :vet')
            ->andWhere('c.name LIKE :resp')
            ->setParameter('name', '%'.$q['name'].'%')
            ->setParameter('spe', '%'.$q['species'].'%')
            ->setParameter('race', '%'.$q['race'].'%')
            ->setParameter('birth', '%'.$q['birthday'].'%')
            ->setParameter('gen', '%'.$q['gender'].'%')
            ->setParameter('ster', '%'.$q['sterilised'].'%')
            ->setParameter('vet', '%'.$q['vet'].'%')
            ->setParameter('resp', '%'.$q['responsible'].'%')
            ->orderBy('p.name', 'ASC')
            ->getQuery();

        $all = $query->getResult();

        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
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

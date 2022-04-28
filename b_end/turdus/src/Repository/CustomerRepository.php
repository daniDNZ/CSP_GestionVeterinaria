<?php

namespace App\Repository;

use App\Entity\Customer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @method Customer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Customer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Customer[]    findAll()
 * @method Customer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomerRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Customer::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(Customer $entity, bool $flush = true): void
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
    public function remove(Customer $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof Customer) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newHashedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
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
    //  * @return Customer[] Returns an array of Customer objects
    //  */

    public function findAll($currentPage = 1, $limit = 10)
    {
        $query =  $this->createQueryBuilder('c')
            ->orderBy('c.name', 'ASC')
            ->getQuery();

        $all = $query->getResult();

        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    
    public function findByQuery($q, $currentPage = 1, $limit = 10)
    {
        $qb = $this->createQueryBuilder('c')
            ->andWhere('c.name LIKE :name')
            ->andWhere('c.last_name LIKE :lname')
            ->andWhere('c.phone LIKE :phone')
            ->andWhere('c.email LIKE :email')
            ->setParameter('name', '%'.$q['name'].'%')
            ->setParameter('lname', '%'.$q['last_name'].'%')
            ->setParameter('phone', '%'.$q['phone'].'%')
            ->setParameter('email', '%'.$q['email'].'%');

        if(array_key_exists('debt', $q))
        {
            $qb->select('c')
                ->innerJoin('c.bills', 'b')
                ->andWhere('b.paymentCompleted = :dbt')
                ->setParameter('dbt', $q['debt']);
        }
        
        $query = $qb->select('c')
            ->orderBy('c.name', 'ASC')
            ->getQuery();

        $all = $query->getResult();
        
        $paginator = $this->paginate($query, $currentPage, $limit);
        
        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    /*
    public function findOneBySomeField($value): ?Customer
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

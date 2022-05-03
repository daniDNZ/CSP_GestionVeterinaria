<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(User $entity, bool $flush = true): void
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
    public function remove(User $entity, bool $flush = true): void
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
        if (!$user instanceof User) {
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
    //  * @return User[] Returns an array of User objects
    //  */
    public function findAll($currentPage = 1, $limit = 10)
    {
        $query =  $this->createQueryBuilder('u')
            ->orderBy('u.name', 'ASC')
            ->getQuery();

        $all = $query->getResult();

        $paginator = $this->paginate($query, $currentPage, $limit);

        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    public function findByQuery($q, $currentPage = 1, $limit = 10)
    {
        $query = $this->createQueryBuilder('u')
            ->andWhere('u.name LIKE :name')
            ->andWhere('u.last_name LIKE :lname')
            ->andWhere('u.area LIKE :area')
            ->setParameter('name', '%'.$q['name'].'%')
            ->setParameter('lname', '%'.$q['last_name'].'%')
            ->setParameter('area', '%'.$q['area'].'%')
            ->orderBy('u.name', 'ASC')
            ->getQuery();

        $all = $query->getResult();
        
        $paginator = $this->paginate($query, $currentPage, $limit);
        
        return array('paginator' => $paginator, 'query' => $query, 'all' => $all);
    }

    public function findByRoles($role)
    {
        return $this->createQueryBuilder('r')
        ->andWhere("r.roles LIKE :role")
        ->setParameter('role', $role)
        ->getQuery()
        ->getResult();
    }
    public function findByName($value)
    {
        return $this->createQueryBuilder('su')
            ->andWhere('u.name LIKE :val')
            ->setParameter('val', '%'.$value.'%')
            ->orderBy('u.name', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

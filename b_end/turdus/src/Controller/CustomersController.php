<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\PatientRepository;
use App\Repository\PostalCodeRepository;
use App\Repository\SpeciesRepository;
use App\Repository\FamilyRepository;
use App\Repository\UserRepository;
use App\Entity\Customer;
use App\Entity\Family;

class CustomersController extends AbstractController
{
    /**
     * @Route("/api/customers_all", name="app_customers_all")
     */
    public function allCustomers(CustomerRepository $customerRepository): Response
    {
        $customerEntities = $customerRepository->findAll();

        foreach ($customerEntities as $customerEntity) 
        {
            $oneCustomer = [];
            $oneCustomer['name'] = $customerEntity->getName();
            $oneCustomer['id'] = $customerEntity->getId();
            $customer[] = $oneCustomer;
        }

        return $this->json($customer);
    }

    function maker($customerEntities)
        {
            foreach ($customerEntities as $customerEntity)
            {
                $customer = [];
                $customer['id'] = $customerEntity->getId();
                $customer['name'] = $customerEntity->getName();
                $customer['lastName'] = $customerEntity->getLastName();
                $customer['phone'] = $customerEntity->getPhone();
                $customer['email'] = $customerEntity->getEmail();
                $customers[] = $customer;
            }
            

            return $customers;
        }

    /**
     * @Route("/api/{currentPage}/customers", name="app_customers_post", methods="POST")
     */
    public function findCustomers( CustomerRepository $customerRepository, int $currentPage, Request $request): Response
    {   
        $limit = 10;
        $customers = [];
        $customerEntities = array();
        $data = $request->toArray();

        $query = array();

        if (array_key_exists('namePicker', $data))      {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if (array_key_exists('lastnamePicker', $data))  {$query['last_name'] = $data['lastnamePicker'];} else {$query['last_name'] = '%';}
        if (array_key_exists('phonePicker', $data))     {$query['phone'] = $data['phonePicker'];} else {$query['phone'] = '%';}
        if (array_key_exists('emailPicker', $data))     {$query['email'] = $data['emailPicker'];} else {$query['email'] = '%';}

        $customersFound = $customerRepository->findByQuery($query, $currentPage, $limit);
        $result = $customersFound['paginator'];

        $maxPages = ceil($customersFound['paginator']->count() / $limit);

        $customers = $this->maker($result);
        $allCustomers = $this->maker($customersFound['all']);

        return $this->json([
            'data' => $customers,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allCustomers
        ]);
    }

     /**
     * @Route("/api/{currentPage}/customers", name="app_customers_get", methods="GET")
     */
    public function getCustomers(CustomerRepository $customerRepository, int $currentPage, Request $request): Response
    {   
        $limit = 10;
        $customersFound = $customerRepository->findAll($currentPage, $limit);
        $result = $customersFound['paginator'];

        $maxPages = ceil($customersFound['paginator']->count() / $limit);

        $customers = $this->maker($result);
        $allCustomers = $this->maker($customersFound['all']);

        return $this->json([
            'data' => $customers,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allCustomers
        ]);
    }

   /**
     * @Route("/api/customers/{id}", name="app_one_customer", methods="GET")
     */
    public function singleCustomer(PatientRepository $patientRepository, CustomerRepository $customerRepository, int $id, Request $request): Response
    {
    
        $customerEntity = $customerRepository->findOneBy(array('id' => $id));
    
        $customer = [];
        $customer['id'] = $customerEntity->getId();
        $customer['dni'] = $customerEntity->getDni();
        $customer['name'] = $customerEntity->getName();
        $customer['info'] = $customerEntity->getInfo();
        $customer['phone'] = $customerEntity->getPhone();
        $customer['email'] = $customerEntity->getEmail();
        $customer['address'] = $customerEntity->getAddress();
        $customer['lastName'] = $customerEntity->getLastName();
        $customer['postalCode'] = $customerEntity->getPostalCode()->getId();

        return $this->json($customer);
    }

    /**
     * @Route("/api/customer/update", name="app_customer_update", methods="POST" )
     */
    public function update(CustomerRepository $customerRepository, PostalCodeRepository $postalCodeRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $customer = $customerRepository->find($data['id']);

        $customer->setRoles([]);
        $customer->setDni($data['dni']);
        $customer->setName($data['name']);
        $customer->setInfo($data['info']);
        $customer->setPhone($data['phone']);
        $customer->setEmail($data['email']);
        $customer->setAddress($data['address']);
        $customer->setLastName($data['last_name']);
        $customer->setPostalCode($postalCodeRepository->find($data['postal_code']));

        $entityManager->persist($customer);
        $entityManager->flush();
    

        return $this->json($data);
        
    }

    /**
     * @Route("/api/customer/add", name="app_customer_add", methods="POST" )
     */
    public function add(CustomerRepository $customerRepository, PostalCodeRepository $postalCodeRepository, FamilyRepository $familyRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();

        $family = New Family();

        $family->setName($data['last_name'].'Fam');
        

        $customer = New Customer();

        $customer->setEmail($data['email']);
        $customer->setRoles([]);
        $customer->setDni($data['dni']);
        $customer->setName($data['name']);
        $customer->setLastName($data['last_name']);
        $customer->setPostalCode($postalCodeRepository->find($data['postal_code']));
        $customer->setAddress($data['address']);
        $customer->setPhone($data['phone']);
        $customer->setInfo($data['info']);
        $customer->setPassword($data['password']);
        $customer->setFamily($family);

        $entityManager->persist($family);
        $entityManager->persist($customer);
        $entityManager->flush();

        $data['id'] = $customer->getId();

        return $this->json($data);
        
    }
}

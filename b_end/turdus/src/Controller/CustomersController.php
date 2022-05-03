<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\PostalCodeRepository;
use App\Repository\BillRepository;
use App\Entity\Customer;
use App\Entity\Family;
use App\Controller\BillController;

class CustomersController extends AbstractController
{

    function maker($customerEntities, $billRepository = [])
        {
            foreach ($customerEntities as $customerEntity)
            {
                $customer = [];
                $customer['id'] = $customerEntity->getId();
                $customer['name'] = $customerEntity->getName();
                $customer['lastName'] = $customerEntity->getLastName();
                $customer['phone'] = $customerEntity->getPhone();
                $customer['email'] = $customerEntity->getEmail();

                
                $debt = 0;

                if($billRepository != [])
                {
                    $billEntities = $billRepository->findBy(array('customer' => $customer['id']));
                    foreach ($billEntities as $billEntity) {
                        if (!$billEntity->getPaymentCompleted())
                        {
                            $paid = floatval($billEntity->getPaid());
                            $amount = floatval($billEntity->getAmount());
    
                            $debt = $amount - $paid;
                        }
                    }
                    
                }
                $customer['debt'] = $debt;
                
                $customers[] = $customer;
            }
            

            return $customers;
        }

    /**
     * @Route("/api/{currentPage}/customers", name="app_customers_post", methods="POST")
     */
    public function findCustomers( CustomerRepository $customerRepository, BillRepository $billRepository, int $currentPage, Request $request): Response
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
        if (array_key_exists('debtPicker', $data))      
        {
            if ($data['debtPicker'] == true)
            {
                $query['debt'] = false;
            }
            
        }


        $customersFound = $customerRepository->findByQuery($query, $currentPage, $limit);
        $result = $customersFound['paginator'];

        $maxPages = ceil($customersFound['paginator']->count() / $limit);

        $customers = $this->maker($result, $billRepository);
        $allCustomers = $this->maker($customersFound['all'], $billRepository);

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
    public function getCustomers(CustomerRepository $customerRepository, BillRepository $billRepository, int $currentPage ): Response
    {   
        $limit = 10;
        $customersFound = $customerRepository->findAll($currentPage, $limit);
        $result = $customersFound['paginator'];

        $maxPages = ceil($customersFound['paginator']->count() / $limit);

        $customers = $this->maker($result, $billRepository);
        $allCustomers = $this->maker($customersFound['all']);

        return $this->json([
            'data' => $customers,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allCustomers
        ]);
    }

    /**
     * @Route("/api/customers/get_current", name="app_customers_get_current", methods="POST")
     */
    public function getCurUser(CustomerRepository $customerRepository, Request $request): Response
    {   
        $data = $request->toArray();
        $customers = [];
        $customerEntity = $customerRepository->findOneBy(array('email' => $data['email']));

        $customer = [];
        $customer['id'] = $customerEntity->getId();
        $customer['name'] = $customerEntity->getName();
        $customer['roles'] = $customerEntity->getRoles();
        $customer['email'] = $customerEntity->getEmail();
       

        return $this->json($customer);
    }

   /**
     * @Route("/api/customers/{id}", name="app_one_customer", methods="GET")
     */
    public function singleCustomer( CustomerRepository $customerRepository, BillRepository $billRepository, int $id ): Response
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

        $debt = 0;

        $billEntities = $billRepository->findBy(array('customer' => $customer['id']));
        foreach ($billEntities as $billEntity) {
            if (!$billEntity->getPaymentCompleted())
            {
                $paid = floatval($billEntity->getPaid());
                $amount = floatval($billEntity->getAmount());

                $debt = $amount - $paid;
            }
        }
            
        $customer['debt'] = $debt;

        return $this->json($customer);
    }

    /**
     * @Route("/api/customer/update", name="app_customer_update", methods="POST" )
     */
    public function update(CustomerRepository $customerRepository, PostalCodeRepository $postalCodeRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $customer = $customerRepository->find($data['id']);

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
    public function add( PostalCodeRepository $postalCodeRepository, Request $request, EntityManagerInterface $entityManager): Response
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

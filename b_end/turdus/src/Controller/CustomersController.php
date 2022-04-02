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
use App\Repository\FamilyRepository;
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

    /**
     * @Route("/api/customers", name="app_customers", methods="POST")
     */
    public function index(CustomerRepository $customerRepository, PatientRepository $patientRepository, Request $request): Response
    {   
        $customers = [];
        $data = $request->toArray();
        
        function maker($customerEntity, $patientRepository)
        {
            $customer = [];
            $customer['id'] = $customerEntity->getId();
            $customer['name'] = $customerEntity->getName();
            $customer['city'] = $customerEntity->getPostalCode()->getCity();
            $customer['info'] = $customerEntity->getInfo();
            $customer['phone'] = $customerEntity->getPhone();
            $customer['email'] = $customerEntity->getEmail();
            $customer['family'] = $customerEntity->getFamily()->getId();
            $customer['address'] = $customerEntity->getAddress();
            $customer['lastname'] = $customerEntity->getLastName();
            $customer['province'] = $customerEntity->getPostalCode()->getProvince();
            $customer['postalcode'] = $customerEntity->getPostalCode()->getId();

            $patients = [];
            $id = $customerEntity->getId();
            $patientEntities = $patientRepository->findBy(array('responsible' => $id));

            foreach ($patientEntities as $patientEntity) 
            {
                $patient = [];
                $patients[] = $patient;
                $patient['id'] = $patientEntity->getId();
                $patient['name'] = $patientEntity->getName();
            }

            $customer['patients'] = $patients;

            return $customer;
        }

        if ($data['customer'] != '')
        {
            $customerEntity = $customerRepository->find($data['customer']);
            $customers[] = maker($customerEntity, $patientRepository);
        }
        else
        {
            $query = array();

            if ($data['userid'] != '')      { $query['vet'] = $data['userid']; }
            if ($data['patient'] != '')     { $query['id'] = $data['patient']; }
            if ($data['species'] != '')     { $query['species'] = $data['species']; }
            if ($data['sterilised'] != '')  { $query['sterilised'] = $data['sterilised']; }
            
            if (!empty($query)) 
            {
                $arrCustomerEntities = [];
                $patientEntities = $patientRepository->findBy($query);

                foreach ($patientEntities as $patientEntity) 
                {
                    $customer = $patientEntity->getResponsible();
                    $arrCustomerEntities[] = $customerRepository->findBy(array('id' => $customer));
                }

                $entry = array_unique($arrCustomerEntities, $sort_flags = SORT_REGULAR);

                foreach ($entry as $customerEntities) 
                {
                    foreach ($customerEntities as $customerEntity) 
                    {
                        $customers[] = maker($customerEntity, $patientRepository);
                    }
                }
            } 
            else 
            {
                $customerEntities = $customerRepository->findAll();

                foreach ($customerEntities as $customerEntity) 
                {
                    $customers[] = maker($customerEntity, $patientRepository);
                }
            }
        }
        return $this->json($customers);
    }

   /**
     * @Route("/api/customer", name="app_one_customer", methods="POST")
     */
    public function singleCustomer(PatientRepository $patientRepository, CustomerRepository $customerRepository, Request $request): Response
    {
        $data = $request->toArray();

        $customerEntity = $customerRepository->findOneBy(array('id' => $data['id']));
    
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
    
        return $this->json(['response' => 'Actualizado']);
        
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
        $customer->setPassword($data['name']);
        $customer->setFamily($family);

        $entityManager->persist($family);
        $entityManager->persist($customer);
        $entityManager->flush();

        $data['id'] = $customer->getId();


        // "id" => $customerRepository->findBy(array('phone' => $customer->getPhone()
        return $this->json($data);
        
    }
}

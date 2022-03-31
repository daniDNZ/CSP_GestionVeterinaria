<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CustomerRepository;
use App\Repository\PatientRepository;

class CustomersController extends AbstractController
{

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
        
        
        

        return $this->json($customers);
    }
}

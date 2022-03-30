<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
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
        
        function maker($customerEntity, $patientRepository){
            $customer = [];
            $customer['id'] = $customerEntity->getId();
            $customer['name'] = $customerEntity->getName();
            $customer['lastname'] = $customerEntity->getLastName();
            $customer['phone'] = $customerEntity->getPhone();
            $customer['email'] = $customerEntity->getEmail();
            $customer['address'] = $customerEntity->getAddress();
            $customer['postalcode'] = $customerEntity->getPostalCode()->getId();
            $customer['city'] = $customerEntity->getPostalCode()->getCity();
            $customer['province'] = $customerEntity->getPostalCode()->getProvince();
            $customer['family'] = $customerEntity->getFamily()->getId();
            $customer['info'] = $customerEntity->getInfo();

            $patients = [];
            $id = $customerEntity->getId();
            $patientEntities = $patientRepository->findBy(array('responsible' => $id));
            foreach ($patientEntities as $patientEntity) {
                $patient = [];
                $patient['id'] = $patientEntity->getId();
                $patient['name'] = $patientEntity->getName();
                $patients[] = $patient;
            }

            $customer['patients'] = $patients;

            return $customer;
        }
        
        
        if ($data['userid'] === '' || $data['patient'] != '') {
            if ($data['patient'] != '') {
                $patient = $patientRepository->findBy(array('id' => $data['patient']))[0];
                $customerEntities = $customerRepository->findBy(array('id' => $patient->getResponsible()));
            } else {
                $customerEntities = $customerRepository->findAll();
    
            }

            foreach ($customerEntities as $customerEntity) {
                $customers[] = maker($customerEntity, $patientRepository);
            }

        } else {

            $patientEntities = $patientRepository->findBy(array('vet' => $data['userid']));
            foreach ($patientEntities as $patientEntity) {
                $customer = $patientEntity->getResponsible();
                $arrCustomerEntities[] = $customerRepository->findBy(array('id' => $customer));
            }
            foreach ($arrCustomerEntities as $customerEntities) {
                foreach ($customerEntities as $customerEntity) {
                    $customers[] = maker($customerEntity, $patientRepository);
                }
            }

        }
        
        

        return $this->json($customers);
    }
}

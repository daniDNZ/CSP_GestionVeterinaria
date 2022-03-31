<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request; 
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PatientRepository;
use App\Repository\UserRepository;
use App\Repository\CustomerRepository;

class PatientsController extends AbstractController
{
    /**
     * @Route("/api/patients", name="app_patients", methods="POST")
     */
    public function index(PatientRepository $patientRepository, UserRepository $userRepository, CustomerRepository $customerRepository, Request $request): Response
    {
        $patients = [];
        $query = array();
        $data = $request->toArray();

        if ($data['userid'] !== '')     { $query['vet'] = $data['userid']; }
        if ($data['patient'] !== '')    { $query['id'] = $data['patient']; }
        if ($data['species'] !== '')    { $query['species'] = $data['species']; }
        if ($data['customer'] !== '')   { $query['responsible'] = $data['customer']; }
        if ($data['sterilised'] !== '') { $query['sterilised'] = $data['sterilised']; }

        if (!empty($query)){
            $patientEntities = $patientRepository->findBy($query);

        } else {
            $patientEntities = $patientRepository->findAll();
        }

        foreach ($patientEntities as $patientEntity) {
            $patient = [];
            $patient['id'] = $patientEntity->getId();
            $patient['vet'] = $patientEntity->getVet()->getName();
            $patient['name'] = $patientEntity->getName();
            $patient['race'] = $patientEntity->getRace();
            $patient['gender'] = $patientEntity->getGender();
            $patient['species'] = $patientEntity->getSpecies();
            $patient['birthday'] = $patientEntity->getBirthday();
            $patient['sterilised'] = $patientEntity->getSterilised();
            $patient['responsible'] = $patientEntity->getResponsible()->getName();
            $patient['responsibleId'] = $patientEntity->getResponsible()->getId();

            $patients[] = $patient;
            
        }
        return $this->json($patients);
    }

      /**
     * @Route("/api/patient", name="app_one_patient", methods="POST")
     */
    public function singlePatient(PatientRepository $patientRepository, UserRepository $userRepository, CustomerRepository $customerRepository, Request $request): Response
    {
        $data = $request->toArray();

        $patientEntity = $patientRepository->findOneBy(array('id' => $data['id']));
    
        $patient = [];
        $patient['id'] = $patientEntity->getId();
        $patient['vet'] = $patientEntity->getVet()->getId();
        $patient['name'] = $patientEntity->getName();
        $patient['race'] = $patientEntity->getRace();
        $patient['weight'] = $patientEntity->getWeight();
        $patient['gender'] = $patientEntity->getGender();
        $patient['species'] = $patientEntity->getSpecies();
        $patient['birthday'] = $patientEntity->getBirthday();
        $patient['sterilised'] = $patientEntity->getSterilised();
        $patient['responsible'] = $patientEntity->getResponsible()->getName();
        $patient['responsibleId'] = $patientEntity->getResponsible()->getId();

        return $this->json($patient);
    }
}

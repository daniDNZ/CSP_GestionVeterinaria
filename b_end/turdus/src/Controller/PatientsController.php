<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PatientRepository;
use App\Repository\UserRepository;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\Request; 

class PatientsController extends AbstractController
{
    /**
     * @Route("/api/patients", name="app_patients", methods="POST")
     */
    public function index(PatientRepository $patientRepository, UserRepository $userRepository, CustomerRepository $customerRepository, Request $request): Response
    {
        $patients = [];
        $data = $request->toArray();
        
        if ($data['patient'] != '') {
            $patientEntities[] = $patientRepository->find($data['patient']);
        } else if ($data['species'] != '') {
            $patientEntities = $patientRepository->findBy(array('species' => $data['species']));
        } else if ($data['userid'] != '' && $data['customer'] != '') {
            $patientEntities = $patientRepository->findBy(array('vet' => $data['userid'], 'responsible' => $data['customer']));
        } else if ($data['userid'] != '') {
            $patientEntities = $patientRepository->findBy(array('vet' => $data['userid']));
        } else if ($data['customer'] != '') {
            $patientEntities = $patientRepository->findBy(array('responsible' => $data['customer']));
        } else {
            $patientEntities = $patientRepository->findAll();
        }
        foreach ($patientEntities as $patientEntity) {
            $patient = [];
            $patient['id'] = $patientEntity->getId();
            $patient['name'] = $patientEntity->getName();
            $patient['species'] = $patientEntity->getSpecies();
            $patient['race'] = $patientEntity->getRace();
            $patient['birthday'] = $patientEntity->getBirthday();
            $patient['gender'] = $patientEntity->getGender();
            $patient['sterilised'] = $patientEntity->getSterilised();
            $patient['vet'] = $patientEntity->getVet()->getName();
            $patient['responsible'] = $patientEntity->getResponsible()->getName();
            $patient['responsibleId'] = $patientEntity->getResponsible()->getId();

            if ($patient['sterilised'] == $data['sterilised'] || $data['sterilised'] === '') {
                $patients[] = $patient;
            }
            
        }
        return $this->json($patients);
    }
}

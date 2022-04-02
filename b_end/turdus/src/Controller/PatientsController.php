<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request; 
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CustomerRepository;
use App\Repository\PatientRepository;
use App\Repository\SpeciesRepository;
use App\Repository\RaceRepository;
use App\Repository\UserRepository;
use App\Entity\Patient;

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

        if ($data['id'] !== '')         { $query['id'] = $data['id']; }
        if ($data['userid'] !== '')     { $query['vet'] = $data['userid']; }
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
            $patient['name'] = $patientEntity->getName();
            $patient['gender'] = $patientEntity->getGender();
            $patient['birthday'] = $patientEntity->getBirthday();
            $patient['sterilised'] = $patientEntity->getSterilised();

            $patient['vet'] = $patientEntity->getVet()->getName();
            $patient['species'] = $patientEntity->getSpecies()->getName();
            $patient['responsible'] = $patientEntity->getResponsible()->getName();
            $patient['responsibleId'] = $patientEntity->getResponsible()->getId();

            if ( $patientEntity->getRace() != null) 
            {
                $patient['race'] = $patientEntity->getRace()->getName();
            }
            else
            {
                $patient['race'] = '';
            }

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
        $patient['name'] = $patientEntity->getName();
        $patient['info'] = $patientEntity->getInfo();
        $patient['chip'] = $patientEntity->getChip();
        $patient['eyes'] = $patientEntity->getEyes();
        $patient['color'] = $patientEntity->getColor();
        $patient['weight'] = $patientEntity->getWeight();
        $patient['gender'] = $patientEntity->getGender();
        $patient['birthday'] = $patientEntity->getBirthday();
        $patient['sterilised'] = $patientEntity->getSterilised();

        $patient['vet'] = $patientEntity->getVet()->getId();
        $patient['species'] = $patientEntity->getSpecies()->getId();
        $patient['responsible'] = $patientEntity->getResponsible()->getName();
        $patient['responsibleId'] = $patientEntity->getResponsible()->getId();

        if ( $patientEntity->getRace() != null) 
        {
            $patient['race'] = $patientEntity->getRace()->getId();
        }

        return $this->json($patient);
    }

    /**
     * @Route("/api/patient/update", name="app_patient_update", methods="POST" )
     */
    public function update(CustomerRepository $customerRepository, RaceRepository $raceRepository, SpeciesRepository $speciesRepository, UserRepository $userRepository, PatientRepository $patientRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $patient = $patientRepository->find($data['id']);

        $patient->setName($data['name']);
        $patient->setInfo($data['info']);
        $patient->setChip($data['chip']);
        $patient->setEyes($data['eyes']);
        $patient->setColor($data['color']);
        $patient->setWeight($data['weight']);
        $patient->setGender($data['gender']);
        $patient->setSterilised($data['sterilised']);

        $patient->setVet($userRepository->find($data['vet']));
        $patient->setRace($raceRepository->find($data['race']));
        $patient->setSpecies($speciesRepository->find($data['species']));
        $patient->setResponsible($customerRepository->find($data['customer']));

        $dateString = $data['birthday'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d', $dateString);
        $patient->setBirthday($dateReconverted);

        $entityManager->persist($patient);
        $entityManager->flush();
    
        return $this->json(['response' => 'Actualizado']);
        
    }

    /**
     * @Route("/api/patient/add", name="app_patient_add", methods="POST" )
     */
    public function add(CustomerRepository $customerRepository, RaceRepository $raceRepository, SpeciesRepository $speciesRepository, UserRepository $userRepository, PatientRepository $patientRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $patient = New Patient;

        $patient->setName($data['name']);
        $patient->setInfo($data['info']);
        $patient->setChip($data['chip']);
        $patient->setEyes($data['eyes']);
        $patient->setColor($data['color']);
        $patient->setWeight($data['weight']);
        $patient->setGender($data['gender']);
        $patient->setSterilised($data['sterilised']);

        $patient->setVet($userRepository->find($data['vet']));
        $patient->setRace($raceRepository->find($data['race']));
        $patient->setSpecies($speciesRepository->find($data['species']));
        $patient->setResponsible($customerRepository->find($data['customer']));
        $patient->setFamily($customerRepository->find($data['customer'])->getFamily());

        $dateString = $data['birthday'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d', $dateString);
        $patient->setBirthday($dateReconverted);

        $entityManager->persist($patient);
        $entityManager->flush();
    
        return $this->json(['response' => 'Actualizado']);
        
    }
}

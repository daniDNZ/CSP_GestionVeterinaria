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

    function maker($patientEntities)
    {
        $patients = [];

        foreach ($patientEntities as $patientEntity)
        {
        
            $patient = [];
            $patient['id'] = $patientEntity->getId();
            $patient['name'] = $patientEntity->getName();
            $patient['species'] = $patientEntity->getSpecies()->getName();

            if ( $patientEntity->getRace() != null) 
            {
                $patient['race'] = $patientEntity->getRace()->getName();
            }
            else
            {
                $patient['race'] = '';
            }

            $patient['birthday'] = $patientEntity->getBirthday()->format('d/m/Y');
            $patient['gender'] = $patientEntity->getGender();
            $patient['sterilised'] = $patientEntity->getSterilised();

            $patient['vet'] = $patientEntity->getVet()->getName();
            $patient['customer'] = $patientEntity->getResponsible()->getName();
            $patient['customerEmail'] = $patientEntity->getResponsible()->getEmail();

            $patients[] = $patient;
        }
        return $patients;
    }

    /**
     * @Route("/api/{currentPage}/patients", name="app_patients_post", methods="POST")
     */
    public function findPatients( PatientRepository $patientRepository, int $currentPage, Request $request ): Response
    {
        $limit = 10;
        $patients = [];
        $patientEntities = array();
        $data = $request->toArray();

        $query = array();

        if (array_key_exists('namePicker', $data))          {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if (array_key_exists('speciesPicker', $data))       {$query['species'] = $data['speciesPicker'];} else {$query['species'] = '%';}
        if (array_key_exists('racePicker', $data))          {$query['race'] = $data['racePicker'];} else {$query['race'] = '%';}
        if (array_key_exists('birthdayPicker', $data))      {$query['birthday'] = $data['birthdayPicker'];} else {$query['birthday'] = '%';}
        if (array_key_exists('genderPicker', $data))        {$query['gender'] = $data['genderPicker'];} else {$query['gender'] = '%';}
        if (array_key_exists('sterilisedPicker', $data))    {$query['sterilised'] = $data['sterilisedPicker'];} else {$query['sterilised'] = '%';}
        if (array_key_exists('vetPicker', $data))           {$query['vet'] = $data['vetPicker'];} else {$query['vet'] = '%';}
        if (array_key_exists('customerPicker', $data))      {$query['responsible'] = $data['customerPicker'];} else {$query['responsible'] = '%';}

        
        $patientsFound = $patientRepository->findByQuery($query, $currentPage, $limit);
        $result = $patientsFound['paginator'];

        $maxPages = ceil($patientsFound['paginator']->count() / $limit);

        $patients = $this->maker($result);
        $allPatients = $this->maker($patientsFound['all']);

        return $this->json([
            'data' => $patients,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allPatients
        ]);
    }

    /**
     * @Route("/api/{currentPage}/patients", name="app_patients_get", methods="GET")
     */
    public function getPatients(PatientRepository $patientRepository, int $currentPage ): Response
    {
        $limit = 10;
        $patientsFound = $patientRepository->findAll($currentPage, $limit);
        $result = $patientsFound['paginator'];

        $maxPages = ceil($patientsFound['paginator']->count() / $limit);

        $patients = $this->maker($result);
        $allPatients = $this->maker($patientsFound['all']);

        return $this->json([
            'data' => $patients,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allPatients
        ]);
    }

      /**
     * @Route("/api/patients/{id}", name="app_one_patient", methods="GET")
     */
    public function singlePatient( PatientRepository $patientRepository, int $id ): Response
    {
        $patientEntity = $patientRepository->findOneBy(array('id' => $id));
    
        $patient = [];
        $patient['id'] = $patientEntity->getId();
        $patient['name'] = $patientEntity->getName();
        $patient['info'] = $patientEntity->getInfo();
        $patient['chip'] = $patientEntity->getChip();
        $patient['eyes'] = $patientEntity->getEyes();
        $patient['color'] = $patientEntity->getColor();
        $patient['weight'] = $patientEntity->getWeight();
        $patient['gender'] = $patientEntity->getGender();
        $patient['birthday'] = $patientEntity->getBirthday()->format('Y-m-d');
        $patient['sterilised'] = $patientEntity->getSterilised();

        $patient['vetName'] = $patientEntity->getVet()->getName();
        $patient['vetUsername'] = $patientEntity->getVet()->getUsername();
        $patient['species'] = $patientEntity->getSpecies()->getName();
        $patient['responsible'] = $patientEntity->getResponsible()->getName();
        $patient['responsibleId'] = $patientEntity->getResponsible()->getId();
        $patient['responsibleEmail'] = $patientEntity->getResponsible()->getEmail();

        if ( $patientEntity->getRace() != null) 
        {
            $patient['race'] = $patientEntity->getRace()->getName();
        }

        return $this->json($patient);
    }

    /**
     * @Route("/api/customers/{id}/patients", name="app_customer_patients", methods="GET" )
     */
    public function customerPatients(
        PatientRepository $patientRepository, 
        int $id
    ): Response
    {
        $entities = $patientRepository->findBy(array('responsible' => $id));

        $patients = $this->maker($entities);

        return $this->json($patients);
        
    }

    /**
     * @Route("/api/patient/update", name="app_patient_update", methods="POST" )
     */
    public function update(
        CustomerRepository $customerRepository, 
        RaceRepository $raceRepository, 
        SpeciesRepository $speciesRepository, 
        UserRepository $userRepository, 
        PatientRepository $patientRepository, 
        Request $request, 
        EntityManagerInterface $entityManager
    ): Response
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

        $patient->setVet($userRepository->findOneBy(array('username' => $data['vet'])));
        $patient->setRace($raceRepository->findOneBy(array('name' => $data['race'])));
        $patient->setSpecies($speciesRepository->findOneBy(array('name' => $data['species'])));
        $patient->setResponsible($customerRepository->findOneBy(array('email' => $data['customer'])));

        $dateString = $data['birthday'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d', $dateString);
        $patient->setBirthday($dateReconverted);

        $entityManager->persist($patient);
        $entityManager->flush();
    

        return $this->json($data);
        
    }

    /**
     * @Route("/api/patient/add", name="app_patient_add", methods="POST" )
     */
    public function add(
        CustomerRepository $customerRepository, 
        RaceRepository $raceRepository, 
        SpeciesRepository $speciesRepository, 
        UserRepository $userRepository, 
        Request $request, 
        EntityManagerInterface $entityManager
    ): Response
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

        $patient->setVet($userRepository->findOneBy(array('username' => $data['vet'])));
        $patient->setRace($raceRepository->findOneBy(array('name' => $data['race'])));
        $patient->setSpecies($speciesRepository->findOneBy(array('name' => $data['species'])));
        $patient->setResponsible($customerRepository->findOneBy(array('email' => $data['customer'])));
        $patient->setFamily($customerRepository->findOneBy(array('email' => $data['customer']))->getFamily());

        if ($data['birthday'] != '')
        {
            $dateString = $data['birthday'];
            $dateReconverted = \DateTime::createFromFormat('Y-m-d', $dateString);
            $patient->setBirthday($dateReconverted);
        }

        $entityManager->persist($patient);
        $entityManager->flush();
    
        $data['id'] = $patient->getId();

        return $this->json($data);
        
    }


}

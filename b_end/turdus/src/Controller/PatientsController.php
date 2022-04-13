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

        if ($data['namePicker'] != '')          {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if ($data['speciesPicker'] != '')       {$query['species'] = $data['speciesPicker'];} else {$query['species'] = '%';}
        if ($data['racePicker'] != '')          {$query['race'] = $data['racePicker'];} else {$query['race'] = '%';}
        if ($data['birthdayPicker'] != '')      {$query['birthday'] = $data['birthdayPicker'];} else {$query['birthday'] = '%';}
        if ($data['genderPicker'] != '')        {$query['gender'] = $data['genderPicker'];} else {$query['gender'] = '%';}
        if ($data['sterilisedPicker'] != '')    {$query['sterilised'] = $data['sterilisedPicker'];} else {$query['sterilised'] = '%';}
        if ($data['vetPicker'] != '')           {$query['vet'] = $data['vetPicker'];} else {$query['vet'] = '%';}
        if ($data['customerPicker'] != '')      {$query['responsible'] = $data['customerPicker'];} else {$query['responsible'] = '%';}

        
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
    public function getPatients(PatientRepository $patientRepository, int $currentPage, Request $request): Response
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
    
        return $this->json(['response' => 'Actualizado']);
        
    }

    /**
     * @Route("/api/patient/add", name="app_patient_add", methods="POST" )
     */
    public function add(
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

        $dateString = $data['birthday'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d', $dateString);
        $patient->setBirthday($dateReconverted);

        $entityManager->persist($patient);
        $entityManager->flush();
    
        return $this->json(['response' => 'Actualizado']);
        
    }
}

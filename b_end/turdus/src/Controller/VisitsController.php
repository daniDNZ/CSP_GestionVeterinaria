<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\VisitRepository;
use App\Repository\UserRepository;
use App\Repository\PatientRepository;
use App\Repository\CustomerRepository;
use App\Repository\SpeciesRepository;

class VisitsController extends AbstractController
{
    /**
     * @Route("/api/visits", name="app_visits_get", methods="GET" )
     */
    public function getVisits(VisitRepository $visitRepository): Response
    {
        $visitEntities = $visitRepository->findAll();

        $visits = [];

        foreach ($visitEntities as $visitEntity) 
        {
            $visit = [];
            $visit['id'] = $visitEntity->getId();
            $visit['date_time'] = $visitEntity->getDateTime()->format('d/m/Y');
            $visit['category'] = $visitEntity->getCategory();
            $visit['patient'] = $visitEntity->getPatient()->getName();
            $visit['vet'] = $visitEntity->getUser()->getName();
            $visit['customer'] = $visitEntity->getPatient()->getResponsible()->getName();

            $visits[] = $visit;
        }

        return $this->json($visits);
    }

    /**
     * @Route("/api/visits", name="app_visits_post", methods="POST")
     */
    public function findVisits(
        VisitRepository $visitRepository,
        PatientRepository $patientRepository, 
        UserRepository $userRepository, 
        CustomerRepository $customerRepository,
        SpeciesRepository $speciesRepository, 
        Request $request
    ): Response
    {
        $visits = [];
        $query = array();
        $patientQuery = array();
        $userQuery = array();
        $customerQuery = array();
        $patientEntities = array();
        
        $data = $request->toArray();

        if ($data['patient'] != '')    { $patientQuery['name'] = $data['patient']; }
        if ($data['user'] !== '')       { $userQuery['name'] = $data['user']; }
        if ($data['customer'] !== '')   { $customerQuery['name'] = $data['customer']; }
        if ($data['completed'] !== '')  { $query['done'] = $data['completed']; }

        if (!empty($patientQuery))
        {
            if (!empty($customerQuery))
            {
                $customerEntities = $customerRepository->findBy($customerQuery);
                $arrCustomers = array();

                foreach ($customerEntities as $customerEntity) {
                    $arrCustomers[] = $customerEntity->getId();
                }
                $patientEntities = $patientRepository->findByNameAndCustomers($patientQuery, $arrCustomers);
            }
            else
            {
                $patientEntities = $patientRepository->findBy($patientQuery);
            }
            
            $visitEntities = [];
            $arrPatients = array();

            foreach ($patientEntities as $patientEntity) 
            {
                $arrPatients[] = $patientEntity->getId();
                // $query['patient'] = $patientEntity->getId();
                // $arrVisitEntities[] = $visitRepository->findBy($query);
            }
            $visitEntities = $visitRepository->findByPatients($arrPatients);
            // foreach ($arrVisitEntities as $visitEntities)
            // {
                foreach ($visitEntities as $visitEntity) 
                {
                    $visit = [];
                    $visit['id'] = $visitEntity->getId();
                    $visit['date_time'] = $visitEntity->getDateTime()->format('d/m/Y');
                    $visit['category'] = $visitEntity->getCategory();
                    $visit['patient'] = $visitEntity->getPatient()->getName();
                    $visit['vet'] = $visitEntity->getUser()->getName();
                    $visit['customer'] = $visitEntity->getPatient()->getResponsible()->getName();

                    $visits[] = $visit;
                }
            // }
        }
       
        
        return $this->json($visits);
    }

    /**
     * @Route("/api/visit", name="app_visit", methods="POST" )
     */
    public function index(VisitRepository $visitRepository, Request $request): Response
    {
        $data = $request->toArray();
        $visitEntity = $visitRepository->findOneBy(array('id' => $data['id']));

        $visit = [];
        $visit['id'] = $visitEntity->getId();
        $visit['vet'] = $visitEntity->getUser()->getId();
        $visit['done'] = $visitEntity->getDone();
        $visit['race'] = $visitEntity->getPatient()->getRace();
        $visit['weight'] = $visitEntity->getWeight();
        $visit['patient'] = $visitEntity->getPatient()->getName();
        $visit['species'] = $visitEntity->getPatient()->getSpecies()->getName();
        $visit['customer'] = $visitEntity->getPatient()->getResponsible()->getName();
        $visit['category'] = $visitEntity->getCategory();
        $visit['duration'] = $visitEntity->getDuration();
        $visit['date_time'] = $visitEntity->getDateTime();
        $visit['treatment'] = $visitEntity->getTreatment();
        $visit['description'] = $visitEntity->getDescription();
            
        return $this->json($visit);
    }

    /**
     * @Route("/api/visit/update", name="app_visit_update", methods="POST" )
     */
    public function update(VisitRepository $visitRepository, UserRepository $userRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $visit = $visitRepository->find($data['id']);

        $visit->setDone($data['done']);
        $visit->setCategory($data['category']);
        $visit->setTreatment($data['treatment']);
        $visit->setWeight($data['patientWeight']);
        $visit->setDescription($data['description']);
        $visit->getPatient()->setRace($data['patientRace']);
        $visit->setUser($userRepository->find($data['vet']));
        $visit->getPatient()->setSpecies($data['patientSpecies']);

        $dateString = $data['date_time'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d H:i:s', $dateString);
        $visit->setDateTime($dateReconverted);

        $entityManager->persist($visit);
        $entityManager->flush();
    
        return $this->json(['response' => 'Actualizada']);
        
    }

    /**
     * @Route("/api/week_schedule", name="app_schedule", methods="POST" )
     */
    public function week(VisitRepository $visitRepository, Request $request, UserRepository $userRepository): Response
    {
        $visits = [];
        $data = $request->toArray();
        // Recogermos el usuario
        $userEntities = $userRepository->findBy(array('username' => $data['username']));

        // Pasamos el String de días de la semana a un Array
        $days = explode (',', $data['week']);

        $dayEntities = [];

        // Buscamos las visitas por día y las añadimos a un Array
        foreach ($days as $day) 
        {
            $dayEntities[] = $visitRepository->findByDateAndUser($day.'%', $userEntities[0]->getId());
        }

        // Recorremos el array de días y recorremos cada día para sacar cada visita
        foreach ($dayEntities as $dayEntity) 
        { 
            foreach ($dayEntity as $singleVisit)
            {
                $visit = [];

                $visit['id'] = $singleVisit->getId();
                $visit['done'] = $singleVisit->getDone();
                $visit['patient'] = $singleVisit->getPatient()->getName();
                $visit['species'] = $singleVisit->getPatient()->getSpecies();
                $visit['category'] = $singleVisit->getCategory();
                $visit['duration'] = $singleVisit->getDuration();
                $visit['date_time'] = $singleVisit->getDateTime();

                $visits[] = $visit;
            }
            
        }

        return $this->json($visits);
    }

    /**
     * @Route("/api/list_visits", name="app_day_schedule", methods="POST" )
     */
    public function day(VisitRepository $visitRepository, UserRepository $userRepository, PatientRepository $patientRepository, Request $request): Response
    {
        $visits = [];
        $data = $request->toArray();

        $day = $data['day'];
        $vet = $data['userid'];
        $patient = $data['patient'];
        $customer = $data['customer'];
        $completed = $data['completed'];

        function maker($singleVisit)
        {
            $visit = [];
            $visit['id'] = $singleVisit->getId();
            $visit['vet'] = $singleVisit->getUser()->getName();
            $visit['patient'] = $singleVisit->getPatient()->getName();
            $visit['species'] = $singleVisit->getPatient()->getSpecies()->getName();
            $visit['customer'] = $singleVisit->getPatient()->getResponsible()->getName();
            $visit['category'] = $singleVisit->getCategory();
            $visit['duration'] = $singleVisit->getDuration();
            $visit['date_time'] = $singleVisit->getDateTime();
            $visit['completed'] = $singleVisit->getDone();

            return $visit;
        }
        
        if ($customer == '' || $patient != '') 
        {
            if ($day != '') 
            {
                if ( $patient != '' )   { $visitEntities = $visitRepository->findByDateAndPatient($day.'%', $patient); }
                else if ( $vet != '' )  { $visitEntities = $visitRepository->findByDateAndVet($day.'%', $vet); }
                else                    { $visitEntities = $visitRepository->findByDate($day.'%'); }
            } 
            else
            {
                $query = array();

                if ( $vet != '')        { $query['user'] = $vet; }
                if ( $patient != '')    { $query['patient'] = $patient; }

                if (!empty($query))
                {
                    $visitEntities = $visitRepository->findBy($query);
                }
                else 
                {
                    $visitEntities = $visitRepository->findAll();
                }
            }

            foreach ($visitEntities as $singleVisit)
            {
                if ($singleVisit->getDone() == $completed) 
                {
                    $visits[] = maker($singleVisit);
                }
            }
        }
        else
        {
            $patientEntities = $patientRepository->findBy(array('responsible' => $customer));

            foreach ($patientEntities as $patientEntity) 
            {
                $patientIds[] = $patientEntity->getId();
            }

            foreach ($patientIds as $patient) 
            {
                if ($day != '') { $patientVisitEntities[] = $visitRepository->findByDateAndPatient($day.'%', $patient); }
                else            { $patientVisitEntities[] = $visitRepository->findBy(array('patient' => $patient)); }
            }
            
            foreach ($patientVisitEntities as $visitEntities)
            { 
                foreach ($visitEntities as $singleVisit)
                {
                    if ($singleVisit->getDone() == $completed) 
                    {
                        $visits[] = maker($singleVisit);
                    } 
                }
            }
        }

        return $this->json($visits);
    }
}

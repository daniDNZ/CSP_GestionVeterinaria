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
use App\Repository\RaceRepository;
use App\Entity\Visit;

class VisitsController extends AbstractController
{
    function maker($visitEntities) {
        $visits = [];
        foreach ($visitEntities as $visitEntity) 
        {
            $visit = [];
            $visit['id'] = $visitEntity->getId();
            $visit['date_time'] = $visitEntity->getDateTime()->format('d/m/Y H:i');
            $visit['category'] = $visitEntity->getCategory();
            $visit['vet'] = $visitEntity->getUser()->getName();
            $visit['customer'] = $visitEntity->getPatient()->getResponsible()->getName();
            $visit['patient'] = $visitEntity->getPatient()->getName();
            $visit['completed'] = $visitEntity->getDone();

            $visits[] = $visit;
        }

        return $visits;
    }

    /**
     * @Route("/api/{currentPage}/visits", name="app_visits_get", methods="GET" )
     */
    public function getVisits(VisitRepository $visitRepository, int $currentPage): Response
    {
        $limit = 10;
        $visitsFound = $visitRepository->findAll($currentPage, $limit);
        $result = $visitsFound['paginator'];

        $maxPages = ceil($visitsFound['paginator']->count() / $limit);

        $visits = $this->maker($result);
        $allVisits = $this->maker($visitsFound['all']);

        return $this->json([
            'data' => $visits,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allVisits
        ]);
    }
    

    /**
     * @Route("/api/{currentPage}/visits", name="app_visits_post", methods="POST")
     */
    public function findVisits( VisitRepository $visitRepository, int $currentPage, Request $request ): Response
    {
        $limit = 10;
        $visits = [];
        $data = $request->toArray();

        $query = array();

        if (array_key_exists('datePicker', $data))          {$query['date'] = $data['datePicker'];} else {$query['date'] = '%';}
        if (array_key_exists('vetPicker', $data))           {$query['vet'] = $data['vetPicker'];} else {$query['vet'] = '%';}
        if (array_key_exists('customerPicker', $data))      {$query['customer'] = $data['customerPicker'];} else {$query['customer'] = '%';}
        if (array_key_exists('patientPicker', $data))       {$query['patient'] = $data['patientPicker'];} else {$query['patient'] = '%';}
        if (array_key_exists('categoryPicker', $data))      {$query['category'] = $data['categoryPicker'];} else {$query['category'] = '%';}
        if (array_key_exists('completedPicker', $data))     {$query['completed'] = $data['completedPicker'];} else {$query['completed'] = '%';}

        $visitsFound = $visitRepository->findByQuery($query, $currentPage, $limit);
        $result = $visitsFound['paginator'];

        $maxPages = ceil($visitsFound['paginator']->count() / $limit);

        $visits = $this->maker($result);
        $allVisits = $this->maker($visitsFound['all']);

        return $this->json([
            'data' => $visits,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allVisits
        ]);
    }

    /**
     * @Route("/api/visits/{id}", name="app_visit", methods="GET" )
     */
    public function index(VisitRepository $visitRepository, int $id): Response
    {

        $visitEntity = $visitRepository->find($id);

        $visit = [];
        $visit['id'] = $visitEntity->getId();
        $visit['vetName'] = $visitEntity->getUser()->getName();
        $visit['vetUsername'] = $visitEntity->getUser()->getUsername();
        $visit['done'] = $visitEntity->getDone();
        $visit['race'] = $visitEntity->getPatient()->getRace();
        $visit['weight'] = $visitEntity->getWeight();
        $visit['patient'] = $visitEntity->getPatient()->getName();
        $visit['patientId'] = $visitEntity->getPatient()->getId();
        $visit['species'] = $visitEntity->getPatient()->getSpecies()->getName();
        $visit['customer'] = $visitEntity->getPatient()->getResponsible()->getName();
        $visit['customerEmail'] = $visitEntity->getPatient()->getResponsible()->getEmail();
        $visit['category'] = $visitEntity->getCategory();
        $visit['duration'] = $visitEntity->getDuration();
        $visit['date'] = $visitEntity->getDateTime()->format('Y-m-d');
        $visit['time'] = $visitEntity->getDateTime()->format('H:i');
        $visit['treatment'] = $visitEntity->getTreatment();
        $visit['description'] = $visitEntity->getDescription();
            
        return $this->json($visit);
    }

     /**
     * @Route("/api/patients/{id}/visits", name="app_patient_visits", methods="GET" )
     */
    public function patientVisits(VisitRepository $visitRepository, int $id): Response
    {
        $entities = $visitRepository->findBy(array('patient' => $id), array('date_time' => 'DESC'));

        $visits = $this->maker($entities);
            
        return $this->json($visits);
    }

    /**
     * @Route("/api/visit/add", name="app_visit_add", methods="POST" )
     */
    public function add(VisitRepository $visitRepository, UserRepository $userRepository, PatientRepository $patientRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $visit = New Visit;

        $done = false;
        if($data['done'] == 'true') $done = true;

        $visit->setDone($done);
        $visit->setCategory($data['category']);
        $visit->setTreatment($data['treatment']);
        $visit->setWeight($data['patientWeight']);
        $visit->setDescription($data['description']);
        $visit->setPatient($patientRepository->find($data['patient']));
        $visit->setUser($userRepository->findOneBy(array('username' => $data['vet'])));
        $visit->setDuration($data['duration']);

        $dateString = $data['date_time'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d H:i', $dateString);
        $visit->setDateTime($dateReconverted);

        $entityManager->persist($visit);
        $entityManager->flush();

        $data['id'] = $visit->getId();

        return $this->json($data);
        
    }

    /**
     * @Route("/api/visit/update", name="app_visit_update", methods="POST" )
     */
    public function update(VisitRepository $visitRepository, UserRepository $userRepository, SpeciesRepository $speciesRepository, RaceRepository $raceRepository, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = $request->toArray();
        $visit = $visitRepository->find($data['id']);

        $done = false;
        if($data['done'] == 'true') $done = true;

        $visit->setDone($done);
        $visit->setCategory($data['category']);
        $visit->setTreatment($data['treatment']);
        $visit->setWeight($data['patientWeight']);
        $visit->getPatient()->setWeight($data['patientWeight']);
        $visit->setDescription($data['description']);
        $visit->setUser($userRepository->findOneBy(array('username' => $data['vet'])));

        $dateString = $data['date_time'];
        $dateReconverted = \DateTime::createFromFormat('Y-m-d H:i', $dateString);
        $visit->setDateTime($dateReconverted);

        $entityManager->persist($visit);
        $entityManager->flush();
    

        return $this->json($data);
        
    }

    /**
     * @Route("/api/visit/{id}/open", name="app_visit_open", methods="GET" )
     */
    public function open(VisitRepository $visitRepository, int $id, EntityManagerInterface $entityManager): Response
    {
        $visit = $visitRepository->find($id);

        $visit->setDone(false);

        $entityManager->persist($visit);
        $entityManager->flush();
    

        return $this->json($visit);
    }

    /**
     * @Route("/api/visit/{id}/close", name="app_visit_close", methods="GET" )
     */
    public function close(VisitRepository $visitRepository, int $id, EntityManagerInterface $entityManager): Response
    {
        $visit = $visitRepository->find($id);

        $visit->setDone(true);

        $entityManager->persist($visit);
        $entityManager->flush();
    

        return $this->json($visit);
    }

     /**
     * @Route("/api/visits/time", name="app_visits_time", methods="POST")
     */
    public function findTime( VisitRepository $visitRepository, Request $request ): Response
    {
        $visits = [];
        $data = $request->toArray();

        $query = array();

        if (array_key_exists('date', $data) && $data['date'] != '')          {$query['date'] = $data['date'];} else {$query['date'] = '%';}
        if (array_key_exists('user', $data) && $data['user'] != '')          {$query['user'] = $data['user'];} else {$query['user'] = '%';}

        $entities = $visitRepository->findByDateAndUser($query);
        $visits = [];

        foreach ($entities as $entity) {
            $visit = [];

            $dateTime = $entity->getDateTime();
            $time = $dateTime->format('H:i');
            $visit['time'] = $time;
            $visit['duration'] = $entity->getDuration();

            $visits[] = $visit;
        }

        return $this->json($visits);
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
        $query['user'] = $userEntities[0]->getUsername();

        // Pasamos el String de días de la semana a un Array
        $days = explode (',', $data['week']);

        $dayEntities = [];

        // Buscamos las visitas por día y las añadimos a un Array
        foreach ($days as $day) 
        {
            $query['date'] = $day;
            $dayEntities[] = $visitRepository->findByDateAndUser($query);
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

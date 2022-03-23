<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\VisitRepository;
use App\Repository\UserRepository;

class SchedulesController extends AbstractController
{
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
        foreach ($days as $day) {
            $dayEntities[] = $visitRepository->findByDateTime($day.'%', $userEntities[0]->getId());
        }

        // Recorremos el array de días y recorremos cada día para sacar cada visita
        foreach ($dayEntities as $dayEntity) { 
            foreach ($dayEntity as $singleVisit){
                $visit = [];
                $visit['id'] = $singleVisit->getId();
                $visit['patient'] = $singleVisit->getPatient()->getName();
                $visit['category'] = $singleVisit->getCategory();
                $visit['date_time'] = $singleVisit->getDateTime();
                $visit['done'] = $singleVisit->getDone();
                $visit['duration'] = $singleVisit->getDuration();
                $visits[] = $visit;
            }
            
        }

        return $this->json($visits);
    }
}

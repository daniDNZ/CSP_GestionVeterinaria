<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\VisitRepository;

class SchedulesController extends AbstractController
{
    /**
     * @Route("/api/week_schedule", name="app_schedule", methods="POST" )
     */
    public function week(VisitRepository $visitRepository, Request $request): Response
    {
        $visits = [];
        $data = $request->toArray();
        $visitEntities = $visitRepository->findBy($data);
        foreach ($visitEntities as $visitEntity) {
            $visit = [];
            $visit['id'] = $visitEntity->getId();
            $visit['patient'] = $visitEntity->getPatient()->getName();
            $visit['category'] = $visitEntity->getCategory();
            $visit['date_time'] = $visitEntity->getDateTime();
            $visit['done'] = $visitEntity->getDone();
            $visit['duration'] = $visitEntity->getDuration();
            $visits[] = $visit;
        }

        return $this->json($visits);
    }
}

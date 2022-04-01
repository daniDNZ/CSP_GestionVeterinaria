<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\RaceRepository;

class RaceController extends AbstractController
{
    /**
     * @Route("/api/races", name="app_races")
     */
    public function index(RaceRepository $raceRepository): Response
    {
        $raceEntities = $raceRepository->findAll();

        foreach ($raceEntities as $raceEntity) 
        {
            $oneRace = [];
            $oneRace['name'] = $raceEntity->getName();
            $oneRace['id'] = $raceEntity->getId();
            $race[] = $oneRace;
        }

        return $this->json($race);
    }
}

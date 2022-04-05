<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\RaceRepository;
use App\Repository\SpeciesRepository;


class RaceController extends AbstractController
{
    /**
     * @Route("/api/races", name="app_races_get", methods="GET")
     */
    public function getRaces(RaceRepository $raceRepository): Response
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

    /**
     * @Route("/api/races", name="app_races_post", methods="POST")
     */
    public function findRaces(RaceRepository $raceRepository, SpeciesRepository $speciesRepository, Request $request): Response
    {
        $races = [];
        $raceEntities = [];
        $data = $request->toArray();
        
        $species = $speciesRepository->findOneBy(array('name' => $data['species']));

        if ($species) 
        {
            $raceEntities = $raceRepository->findBy(array('species' => $species->getId()));
        }

        foreach ($raceEntities as $raceEntity) 
        {
            $oneRace = [];
            $oneRace['name'] = $raceEntity->getName();
            $oneRace['id'] = $raceEntity->getId();
            $races[] = $oneRace;
        }

        return $this->json($races);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Race;
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

    /**
     * @Route("/api/race/add", name="app_race_add", methods="POST")
     */
    public function add( SpeciesRepository $speciesRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $name           = $request->request->get('name');
        $speciesName    = $request->request->get('species');

        $species        = $speciesRepository->findOneBy(array('name' => $speciesName));

        $race = New Race();
        
        $race->setName($name);
        $race->setSpecies($species);

        $em->persist($race);
        $em->flush();

        $data['id'] = $race->getId();
        $data['name'] = $race->getName();

        return $this->json($data);
    }
}

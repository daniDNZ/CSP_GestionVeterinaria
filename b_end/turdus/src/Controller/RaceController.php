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
     * @Route("/api/races/{id}", name="app_races_get_one", methods="GET")
     */
    public function getOneRace(RaceRepository $raceRepository, int $id): Response
    {
        $entity = $raceRepository->find($id);

        $race = [];
        $race['id'] = $entity->getId();
        $race['name'] = $entity->getName();
        $race['species'] = $entity->getSpecies()->getName();
        

        return $this->json($race);
    }

    /**
     * @Route("/api/races/paginate/{currentPage}", name="app_races_get_paginate", methods="GET")
     */
    public function getRacePaginate(RaceRepository $raceRepository, int $currentPage): Response
    {
        $limit = 10;
        $raceFound = $raceRepository->findAllPaginate($currentPage);
        $raceEntities = $raceFound['paginator'];

        $maxPages = ceil($raceFound['paginator']->count() / $limit);

        foreach ($raceEntities as $raceEntity) 
        {
            $oneRace = [];
            $oneRace['id'] = $raceEntity->getId();
            $oneRace['name'] = $raceEntity->getName();
            $oneRace['species'] = $raceEntity->getSpecies()->getName();
            $race[] = $oneRace;
        }

        return $this->json([
            'data' => $race,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage
        ]);
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

    /**
     * @Route("/api/race/update", name="app_race_update", methods="POST")
     */
    public function update( SpeciesRepository $speciesRepository, RaceRepository $raceRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id           = $request->request->get('id');
        $name           = $request->request->get('name');
        $speciesName    = $request->request->get('species');
        $species        = $speciesRepository->findOneBy(array('name' => $speciesName));

        $race = $raceRepository->find($id);
        
        $race->setName($name);
        $race->setSpecies($species);

        $em->persist($race);
        $em->flush();

        $data['id'] = $race->getId();
        $data['name'] = $race->getName();
        $data['species'] = $race->getSpecies()->getName();

        return $this->json($data);
    }

    /**
     * @Route("/api/races/{id}/remove", name="app_races_remove", methods="GET")
     */
    public function removeRace(int $id, RaceRepository $raceRepository, EntityManagerInterface $em): Response
    {
        $race = $raceRepository->find($id);

        $em->remove($race);
        $em->flush();

        return $this->json($race);
    }
}

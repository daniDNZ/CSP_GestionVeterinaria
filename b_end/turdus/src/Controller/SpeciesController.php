<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\SpeciesRepository;

class SpeciesController extends AbstractController
{
    /**
     * @Route("/api/species", name="app_species")
     */
    public function index(SpeciesRepository $speciesRepository): Response
    {
        $speciesEntities = $speciesRepository->findAll();

        foreach ($speciesEntities as $speciesEntity) 
        {
            $oneSpecies = [];
            $oneSpecies['name'] = $speciesEntity->getName();
            $oneSpecies['id'] = $speciesEntity->getId();
            $species[] = $oneSpecies;
        }

        return $this->json($species);
    }
}

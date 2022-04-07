<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\SpeciesRepository;
use App\Repository\PatientRepository;
use App\Repository\UserRepository;
use App\Repository\CustomerRepository;

class SpeciesController extends AbstractController
{
    /**
     * @Route("/api/species", name="app_species_get", methods="GET")
     */
    public function getSpecies(SpeciesRepository $speciesRepository): Response
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

    /**
     * @Route("/api/species", name="app_species_post", methods="POST")
     */
    public function findSpecies(
        PatientRepository $patientRepository, 
        UserRepository $userRepository, 
        CustomerRepository $customerRepository,
        SpeciesRepository $speciesRepository, 
        Request $request
    ): Response
    {
        $species = [];
        $query = array();
        
        $data = $request->toArray();

        if ($data['patient'] !== '')    { $query['name'] = $data['patient']; }
        if ($data['user'] !== '')       { $query['vet'] = $userRepository->findOneBy(array('username' => $data['user']))->getId(); }
        if ($data['species'] !== '')    { $query['species'] = $speciesRepository->findOneBy(array('name' => $data['species']))->getId(); }
        if ($data['customer'] !== '')   { $query['responsible'] = $customerRepository->findOneBy(array('email' => $data['customer']))->getId(); }
        if ($data['sterilised'] !== '') { $query['sterilised'] = $data['sterilised']; }

        if (!empty($query))
        {
            $arrSpeciesEntities = [];
            $patientEntities = $patientRepository->findBy($query);

            foreach ($patientEntities as $patientEntity) 
            {
                $singleSpecies = $patientEntity->getSpecies();
                $arrSpeciesEntities[] = $speciesRepository->findBy(array('id' => $singleSpecies));
            }

            $entry = array_unique($arrSpeciesEntities, $sort_flags = SORT_REGULAR);

            foreach ($entry as $speciesEntities) 
            {
                foreach ($speciesEntities as $speciesEntity) 
                {
                    $oneSpecies = [];
                    $oneSpecies['name'] = $speciesEntity->getName();
                    $species[] = $oneSpecies;
                }
            }
        } 
        else 
        {
            $speciesEntities = $speciesRepository->findAll();

            foreach ($speciesEntities as $speciesEntity) 
            {
                $oneSpecies = [];
                $oneSpecies['name'] = $speciesEntity->getName();
                $species[] = $oneSpecies;
            }
        }

        
        return $this->json($species);
    }
}

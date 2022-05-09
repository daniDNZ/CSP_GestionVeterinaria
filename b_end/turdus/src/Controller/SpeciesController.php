<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Species;
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
            $oneSpecies['sciName'] = $speciesEntity->getScientificName();
            $oneSpecies['id'] = $speciesEntity->getId();
            $species[] = $oneSpecies;
        }

        return $this->json($species);
    }

    /**
     * @Route("/api/species/{id}", name="app_species_get_one", methods="GET")
     */
    public function getOneSpecies(SpeciesRepository $speciesRepository, int $id): Response
    {
        $entity = $speciesRepository->find($id);

        $species = [];
        $species['id'] = $entity->getId();
        $species['name'] = $entity->getName();
        $species['sciName'] = $entity->getScientificName();
        

        return $this->json($species);
    }

    /**
     * @Route("/api/species/paginate/{currentPage}", name="app_species_get_paginate", methods="GET")
     */
    public function getSpeciesPaginate(SpeciesRepository $speciesRepository, int $currentPage): Response
    {
        $limit = 10;
        $speciesFound = $speciesRepository->findAllPaginate($currentPage);
        $speciesEntities = $speciesFound['paginator'];

        $maxPages = ceil($speciesFound['paginator']->count() / $limit);

        foreach ($speciesEntities as $speciesEntity) 
        {
            $oneSpecies = [];
            $oneSpecies['id'] = $speciesEntity->getId();
            $oneSpecies['name'] = $speciesEntity->getName();
            $oneSpecies['sciName'] = $speciesEntity->getScientificName();
            $species[] = $oneSpecies;
        }

        return $this->json([
            'data' => $species,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage
        ]);
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

    /**
     * @Route("/api/species/add", name="app_species_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em ): Response
    {   
        $name           = $request->request->get('name');
        $sciName        = $request->request->get('sciName');

        $species = New Species();
        
        $species->setName($name);
        $species->setScientificName($sciName);

        $em->persist($species);
        $em->flush();

        $data['id'] = $species->getId();
        $data['name'] = $species->getName();

        return $this->json($data);
    }

    /**
     * @Route("/api/species/update", name="app_species_update", methods="POST")
     */
    public function update( SpeciesRepository $speciesRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id           = $request->request->get('id');
        $name           = $request->request->get('name');
        $sciName        = $request->request->get('sciName');

        $species = $speciesRepository->find($id);
        
        $species->setName($name);
        $species->setScientificName($sciName);

        $em->persist($species);
        $em->flush();

        $data['id'] = $species->getId();
        $data['name'] = $species->getName();
        $data['sciName'] = $species->getScientificName();
        
        return $this->json($data);
    }

    /**
     * @Route("/api/species/{id}/remove", name="app_species_remove", methods="GET")
     */
    public function removeSpecies(int $id, SpeciesRepository $speciesRepository, EntityManagerInterface $em): Response
    {
        $species = $speciesRepository->find($id);

        $em->remove($species);
        $em->flush();

        return $this->json($species);
    }
}

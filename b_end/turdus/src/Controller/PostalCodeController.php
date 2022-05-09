<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PostalCodeRepository;
use App\Entity\PostalCode;



class PostalCodeController extends AbstractController
{
    /**
     * @Route("/api/postal_code", name="app_postal_code")
     */
    public function index(PostalCodeRepository $postalCodeRepository): Response
    {
        $entities = $postalCodeRepository->findAll();

        $postalCodes = [];
        foreach ($entities as $entity) {
            $pc['id'] = $entity->getId();
            $postalCodes[] = $pc;
        }
        return $this->json($postalCodes);
    }

    /**
     * @Route("/api/postal_code/{id}", name="app_postal_code_get_one", methods="GET")
     */
    public function getOnePostalCode(PostalCodeRepository $postalCodeRepository, int $id): Response
    {
        $entity = $postalCodeRepository->find($id);

        $postalCode = [];
        $postalCode['id'] = $entity->getId();
        $postalCode['province'] = $entity->getProvince();
        $postalCode['city'] = $entity->getCity();
        $postalCode['country'] = $entity->getCountry();

        return $this->json($postalCode);
    }

    /**
     * @Route("/api/postal_codes/paginate/{currentPage}", name="app_postal_codes_get_paginate", methods="GET")
     */
    public function getPostalCodesPaginate(PostalCodeRepository $postalCodeRepository, int $currentPage): Response
    {
        $limit = 10;
        $postalCodeFound = $postalCodeRepository->findAllPaginate($currentPage);
        $postalCodeEntities = $postalCodeFound['paginator'];

        $maxPages = ceil($postalCodeFound['paginator']->count() / $limit);

        foreach ($postalCodeEntities as $postalCodeEntity) 
        {
            $onePostalCode = [];
            $onePostalCode['id'] = $postalCodeEntity->getId();
            $onePostalCode['pc'] = $postalCodeEntity->getId();
            $onePostalCode['city'] = $postalCodeEntity->getCity();
            $onePostalCode['province'] = $postalCodeEntity->getProvince();
            $postalCode[] = $onePostalCode;
        }

        return $this->json([
            'data' => $postalCode,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage
        ]);
    }

    /**
     * @Route("/api/postal_code/add", name="app_postal_code_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em ): Response
    {   
        $id             = $request->request->get('pc');
        $province       = $request->request->get('province');
        $city           = $request->request->get('city');
        $country        = $request->request->get('country');

        $postalCode = New PostalCode();
        
        $postalCode->setId($id);
        $postalCode->setProvince($province);
        $postalCode->setCity($city);
        $postalCode->setCountry($country);

        $em->persist($postalCode);
        $em->flush();

        $data['id'] = $postalCode->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/postal_code/update", name="app_postal_code_update", methods="POST")
     */
    public function update( PostalCodeRepository $postalCodeRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id             = $request->request->get('pc');
        $province       = $request->request->get('province');
        $city           = $request->request->get('city');
        $country        = $request->request->get('country');

        $postalCode = $postalCodeRepository->find($id);
        
        $postalCode->setProvince($province);
        $postalCode->setCity($city);
        $postalCode->setCountry($country);

        $em->persist($postalCode);
        $em->flush();

        $data['id'] = $postalCode->getId();
        $data['province'] = $postalCode->getProvince();
        $data['city'] = $postalCode->getCity();
        $data['country'] = $postalCode->getCountry();

        return $this->json($data);
    }

    /**
     * @Route("/api/postal_code/{id}/remove", name="app_postal_code_remove", methods="GET")
     */
    public function removePostalCode(int $id, PostalCodeRepository $postalCodeRepository, EntityManagerInterface $em): Response
    {
        $postalCode = $postalCodeRepository->find($id);

        $em->remove($postalCode);
        $em->flush();

        return $this->json($postalCode);
    }
}

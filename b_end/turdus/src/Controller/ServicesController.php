<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ServiceRepository;
use App\Entity\Service;

class ServicesController extends AbstractController
{
    /**
     * @Route("/api/services/{id}", name="app_services_one", methods="GET")
     */
    public function index(int $id, ServiceRepository $serviceRepository): Response
    {
        $entity = $serviceRepository->find($id);

        $service = [];
                $service['id'] = $entity->getId();
                $service['name'] = $entity->getName();
                $service['category'] = $entity->getCategory();
                $service['price'] = $entity->getPrice();

        return $this->json($service);
    }


    /**
     * @Route("/api/services/{currentPage}/filter", name="app_services_filter", methods="POST")
     */
    public function filter(ServiceRepository $serviceRepository, int $currentPage, Request $request): Response
    {
        $limit = 10;

        $data = $request->toArray();
        $query = [];

        if(array_key_exists('namePicker', $data))           {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if(array_key_exists('categoryPicker', $data))       {$query['category'] = $data['categoryPicker'];} else {$query['category'] = '%';}

        
        $entitiesFound = $serviceRepository->findByQuery($query);
        $result = $entitiesFound['paginator'];

        $maxPages = ceil($entitiesFound['paginator']->count() / $limit);
        

        function maker($entities){
            $services = [];
            foreach ($entities as $entity) {
                $service = [];
                $service['id'] = $entity->getId();
                $service['name'] = $entity->getName();
                $service['category'] = $entity->getCategory();
                $service['price'] = $entity->getPrice();
    
                $services[] = $service;
            }
            return $services;
        }

        $services = maker($result);
        $allServices = maker($entitiesFound['all']);
    
        return $this->json([
            'data' => $services,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allServices
        ]);
    }

    /**
     * @Route("/api/services/add", name="app_services_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em ): Response
    {   
        $name           = $request->request->get('name');
        $category       = $request->request->get('category');
        $price          = $request->request->get('price');
       
        $service = New Service();
        
        $service->setName($name);
        $service->setCategory($category);
        $service->setPrice($price);
        
        $em->persist($service);
        $em->flush();

        $data['id'] = $service->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/services/update", name="app_services_update", methods="POST")
     */
    public function update( Request $request, ServiceRepository $serviceRepository, EntityManagerInterface $em ): Response
    {   
        $id             = $request->request->get('id');
        $name           = $request->request->get('name');
        $category       = $request->request->get('category');
        $price          = $request->request->get('price');
       
        $service = $serviceRepository->find($id);
        
        $service->setName($name);
        $service->setCategory($category);
        $service->setPrice($price);
        
        $em->persist($service);
        $em->flush();

        $data['id'] = $service->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/services/{id}/remove", name="app_services_remove", methods="GET")
     */
    public function removeProduct(int $id, ServiceRepository $serviceRepository, EntityManagerInterface $em): Response
    {
        $service = $serviceRepository->find($id);

        $em->remove($service);
        $em->flush();

        return $this->json($service);
    }
}

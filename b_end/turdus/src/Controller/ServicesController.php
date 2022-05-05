<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ServiceRepository;

class ServicesController extends AbstractController
{
    /**
     * @Route("/services", name="app_services")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ServicesController.php',
        ]);
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
}

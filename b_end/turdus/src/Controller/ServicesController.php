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
     * @Route("/api/services", name="app_services_find", methods="POST")
     */
    public function find(ServiceRepository $serviceRepository, Request $request): Response
    {
        $data = $request->toArray();
        $query = [];

        if(array_key_exists('category', $data)) {$query['category'] = $data['category'];} else {$query['category'] = '%';}
        if(array_key_exists('name', $data))     {$query['name'] = $data['name'];} else {$query['name'] = '%';}

        
        $entities = $serviceRepository->findByQuery($query);

        $services = [];

        foreach ($entities as $entity) {
            $service = [];
            $service['id'] = $entity->getId();
            $service['name'] = $entity->getName();
            $service['category'] = $entity->getCategory();
            $service['price'] = $entity->getPrice();

            $services[] = $service;
        }

        return $this->json($services);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProductRepository;

class ProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="app_products_all", methods="GET")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ProductsControlllerController.php',
        ]);
    }

    /**
     * @Route("/api/products", name="app_products_find", methods="POST")
     */
    public function find(ProductRepository $productRepository, Request $request): Response
    {
        $data = $request->toArray();
        $query = [];

        if(array_key_exists('category', $data)) {$query['category'] = $data['category'];} else {$query['category'] = '%';}
        if(array_key_exists('name', $data))     {$query['name'] = $data['name'];} else {$query['name'] = '%';}
        if(array_key_exists('species', $data))     {$query['species'] = $data['species'];} else {$query['species'] = '%';}

        
        $entities = $productRepository->findByQuery($query);

        $products = [];
        foreach ($entities as $entity) {
            $product = [];
            $product['id'] = $entity->getId();
            $product['code'] = $entity->getCode();
            $product['name'] = $entity->getName();
            $product['category'] = $entity->getCategory();
            $product['subcategory'] = $entity->getSubcategory();
            $product['price'] = $entity->getPrice();
            $product['stock'] = $entity->getStock();
            $product['lot'] = $entity->getLot();

            $species = $entity->getSpecies();
            $arrSpecies = [];
            foreach ($species as $singleSpecies) {
                $arrSpecies[] = $singleSpecies->getName();
            }
            $product['species'] = $arrSpecies;

            $products[] = $product;
        }

        return $this->json($products);
    }
}

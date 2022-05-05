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
        $limit = 10;
        $data = $request->toArray();
        $query = [];

        if(array_key_exists('category', $data)) {$query['category'] = $data['category'];} else {$query['category'] = '%';}
        if(array_key_exists('name', $data))     {$query['name'] = $data['name'];} else {$query['name'] = '%';}
        if(array_key_exists('species', $data))     {$query['species'] = $data['species'];} else {$query['species'] = '%';}

        
        $entitiesFound = $productRepository->findByQuery($query);
        $result = $entitiesFound['paginator'];

        $maxPages = ceil($entitiesFound['paginator']->count() / $limit);
        
        function maker($entities){
            $products = [];
            foreach ($entities as $entity) {
                $product = [];
                $product['id'] = $entity->getId();
                $product['code'] = $entity->getCode();
                $product['name'] = $entity->getName();
                $product['category'] = $entity->getCategory();
                $product['subcategory'] = $entity->getSubcategory();

                $species = $entity->getSpecies();
                $arrSpecies = [];
                foreach ($species as $singleSpecies) {
                    $arrSpecies[] = $singleSpecies->getName();
                }
                $product['species'] = $arrSpecies;
                $product['dose'] = $entity->getDose();
                $product['lot'] = $entity->getLot();
                $product['expiration'] = $entity->getExpiration()->format('d/m/Y');
                $product['supplier'] = $entity->getSupplier()->getName();
                $product['stock'] = $entity->getStock();
                $product['price'] = $entity->getPrice();
    
                $products[] = $product;
            }
            return $products;
        }

        $products = maker($result);
        $allProducts = maker($entitiesFound['all']);
    
        return $this->json([
            'data' => $products,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allProducts
        ]);
    }

    /**
     * @Route("/api/products/{currentPage}/filter", name="app_products_filter", methods="POST")
     */
    public function filter(ProductRepository $productRepository, int $currentPage, Request $request): Response
    {
        $limit = 10;

        $data = $request->toArray();
        $query = [];

        if(array_key_exists('codePicker', $data))           {$query['code'] = $data['codePicker'];} else {$query['code'] = '%';}
        if(array_key_exists('namePicker', $data))           {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if(array_key_exists('speciesPicker', $data))        {$query['species'] = $data['speciesPicker'];} else {$query['species'] = '%';}
        if(array_key_exists('categoryPicker', $data))       {$query['category'] = $data['categoryPicker'];} else {$query['category'] = '%';}
        if(array_key_exists('subcategoryPicker', $data))    {$query['subcategory'] = $data['subcategoryPicker'];} else {$query['subcategory'] = '%';}
        if(array_key_exists('supplierPicker', $data))       {$query['supplier'] = $data['supplierPicker'];} else {$query['supplier'] = '%';}

        
        $entitiesFound = $productRepository->findByQuery($query);
        $result = $entitiesFound['paginator'];

        $maxPages = ceil($entitiesFound['paginator']->count() / $limit);
        

        function maker($entities){
            $products = [];
            foreach ($entities as $entity) {
                $product = [];
                $product['id'] = $entity->getId();
                $product['code'] = $entity->getCode();
                $product['name'] = $entity->getName();
                $product['category'] = $entity->getCategory();
                $product['subcategory'] = $entity->getSubcategory();

                $species = $entity->getSpecies();
                $arrSpecies = [];
                foreach ($species as $singleSpecies) {
                    $arrSpecies[] = $singleSpecies->getName();
                }
                $product['species'] = $arrSpecies;
                $product['dose'] = $entity->getDose();
                $product['lot'] = $entity->getLot();
                $product['expiration'] = $entity->getExpiration()->format('d/m/Y');
                $product['supplier'] = $entity->getSupplier()->getName();
                $product['stock'] = $entity->getStock();
                $product['price'] = $entity->getPrice();
    
                $products[] = $product;
            }
            return $products;
        }

        $products = maker($result);
        $allProducts = maker($entitiesFound['all']);
    
        return $this->json([
            'data' => $products,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allProducts
        ]);
    }
}

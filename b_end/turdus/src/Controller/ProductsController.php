<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ProductRepository;
use App\Repository\SpeciesRepository;
use App\Repository\SupplierRepository;
use App\Entity\Product;

class ProductsController extends AbstractController
{
    /**
     * @Route("/api/products/{id}", name="app_products_one", methods="GET")
     */
    public function index(int $id, ProductRepository $productRepository): Response
    {
        $entity = $productRepository->find($id);

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
        $product['expiration'] = $entity->getExpiration();
        $product['supplier'] = $entity->getSupplier()->getCode();
        $product['stock'] = $entity->getStock();
        $product['price'] = $entity->getPrice();

        return $this->json($product);
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

        
        $entitiesFound = $productRepository->findByQuery($query, $currentPage);
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
                $product['expiration'] = $entity->getExpiration();
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
     * @Route("/api/products/add", name="app_products_add", methods="POST")
     */
    public function add( Request $request, SupplierRepository $supplierRepository, SpeciesRepository $speciesRepository, EntityManagerInterface $em ): Response
    {   
        $code           = $request->request->get('code');
        $name           = $request->request->get('name');
        $category       = $request->request->get('category');
        $subcategory    = $request->request->get('subcategory');
        $species        = explode(',', $request->request->get('species'));
        $dose           = $request->request->get('dose');
        $lot            = $request->request->get('lot');
        $expiration     = $request->request->get('expiration');
        $supplier       = $request->request->get('supplier');
        $stock          = $request->request->get('stock');
        $price          = $request->request->get('price');
        $ean            = $request->request->get('ean');

        $product = New Product();
        
        $product->setCode($code);
        $product->setName($name);
        $product->setCategory($category);
        $product->setSubcategory($subcategory);
        $product->setDose($dose);
        $product->setLot($lot);
        $product->setStock($stock);
        $product->setPrice($price);
        $product->setEan($ean);

        // Especies
        foreach ($species as $sp) {
            $spEntity = $speciesRepository->findOneBy(array('name' => $sp));
            $product->addSpecies($spEntity);
        }

        // Fecha de caducidad
        $product->setExpiration($expiration);

        // Proveedor
        $supplierEntity = $supplierRepository->findOneBy(array('code' => $supplier));
        $product->setSupplier($supplierEntity);
        
        $em->persist($product);
        $em->flush();

        $data['id'] = $product->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/products/update", name="app_products_update", methods="POST")
     */
    public function update( Request $request, ProductRepository $productRepository, SupplierRepository $supplierRepository, SpeciesRepository $speciesRepository, EntityManagerInterface $em ): Response
    {   
        $code           = $request->request->get('code');
        $name           = $request->request->get('name');
        $category       = $request->request->get('category');
        $subcategory    = $request->request->get('subcategory');
        $species        = explode(',', $request->request->get('species'));
        $dose           = $request->request->get('dose');
        $lot            = $request->request->get('lot');
        $expiration     = $request->request->get('expiration');
        $supplier       = $request->request->get('supplier');
        $stock          = $request->request->get('stock');
        $price          = $request->request->get('price');
        $ean            = $request->request->get('ean');

        $product = $productRepository->findOneBy(array('code' => $code));
        
        $product->setCode($code);
        $product->setName($name);
        $product->setCategory($category);
        $product->setSubcategory($subcategory);
        $product->setDose($dose);
        $product->setLot($lot);
        $product->setStock($stock);
        $product->setPrice($price);
        $product->setEan($ean);

        // Especies
        foreach ($species as $sp) {
            $spEntity = $speciesRepository->findOneBy(array('name' => $sp));
            $product->addSpecies($spEntity);
        }

        // Fecha de caducidad
        $product->setExpiration($expiration);

        // Proveedor
        $supplierEntity = $supplierRepository->findOneBy(array('code' => $supplier));
        $product->setSupplier($supplierEntity);
        
        $em->persist($product);
        $em->flush();

        $data['id'] = $product->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/products/{id}/remove", name="app_products_remove", methods="GET")
     */
    public function removeProduct(int $id, ProductRepository $productRepository, EntityManagerInterface $em): Response
    {
        $product = $productRepository->find($id);

        $em->remove($product);
        $em->flush();

        return $this->json($product);
    }
}

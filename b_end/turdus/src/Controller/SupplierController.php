<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Supplier;
use App\Repository\SupplierRepository;
use App\Repository\PostalCodeRepository;



class SupplierController extends AbstractController
{
    /**
     * @Route("/api/suppliers", name="app_supplier")
     */
    public function index(SupplierRepository $supplierRepository): Response
    {
        $entities = $supplierRepository->findAll();
        $suppliers = [];

        foreach ($entities as $entity) {
            $supplier['code'] = $entity->getCode();
            $supplier['name'] = $entity->getName();
            $suppliers[] = $supplier;
        }

        return $this->json($suppliers);
    }

    /**
     * @Route("/api/suppliers/{id}", name="app_supplier_one", methods="GET")
     */
    public function find(int $id, SupplierRepository $supplierRepository): Response
    {
        $entity = $supplierRepository->find($id);

        $supplier = [];
        $supplier['id'] = $entity->getId();
        $supplier['code'] = $entity->getCode();
        $supplier['name'] = $entity->getName();
        $supplier['category'] = $entity->getCategory();
        $supplier['email'] = $entity->getEmail();
        $supplier['phone'] = $entity->getPhone();
        $supplier['postalCode'] = $entity->getPostalCode()->getId();
        $supplier['address'] = $entity->getAddress();
        $supplier['info'] = $entity->getInfo();

        return $this->json($supplier);
    }

    /**
     * @Route("/api/suppliers/paginate/{currentPage}", name="app_suppliers_get_paginate", methods="GET")
     */
    public function getSupplierPaginate(SupplierRepository $supplierRepository, int $currentPage): Response
    {
        $limit = 10;
        $supplierFound = $supplierRepository->findAllPaginate($currentPage);
        $supplierEntities = $supplierFound['paginator'];

        $maxPages = ceil($supplierFound['paginator']->count() / $limit);

        foreach ($supplierEntities as $supplierEntity) 
        {
            $oneSupplier = [];
            $oneSupplier['id'] = $supplierEntity->getId();
            $oneSupplier['code'] = $supplierEntity->getCode();
            $oneSupplier['name'] = $supplierEntity->getName();
            $oneSupplier['phone'] = $supplierEntity->getPhone();
            $supplier[] = $oneSupplier;
        }

        return $this->json([
            'data' => $supplier,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage
        ]);
    }

    /**
     * @Route("/api/supplier/add", name="app_supplier_add", methods="POST")
     */
    public function add( PostalCodeRepository $postalCodeRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $name           = $request->request->get('name');
        $ref            = $request->request->get('code');
        $category       = $request->request->get('category');
        $email          = $request->request->get('email');
        $phone          = $request->request->get('phone');
        $pc             = $request->request->get('postalCode');
        $postalCode     = $postalCodeRepository->find($pc);
        $address        = $request->request->get('address');
        $info           = $request->request->get('info');

        $supplier = New Supplier();
        
        $supplier->setName($name);
        $supplier->setCode($ref);
        $supplier->setCategory($category);
        $supplier->setEmail($email);
        $supplier->setPhone($phone);
        $supplier->setPostalCode($postalCode);
        $supplier->setAddress($address);
        $supplier->setInfo($info);

        $em->persist($supplier);
        $em->flush();

        $data['id'] = $supplier->getId();
        $data['name'] = $supplier->getName();

        return $this->json($data);
    }

    /**
     * @Route("/api/supplier/update", name="app_supplier_update", methods="POST")
     */
    public function update( PostalCodeRepository $postalCodeRepository, SupplierRepository $supplierRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id             = $request->request->get('id');
        $name           = $request->request->get('name');
        $ref            = $request->request->get('code');
        $category       = $request->request->get('category');
        $email          = $request->request->get('email');
        $phone          = $request->request->get('phone');
        $pc             = $request->request->get('postalCode');
        $postalCode     = $postalCodeRepository->find($pc);
        $address        = $request->request->get('address');
        $info           = $request->request->get('info');

        $supplier = $supplierRepository->find($id);
        
        $supplier->setName($name);
        $supplier->setCode($ref);
        $supplier->setCategory($category);
        $supplier->setEmail($email);
        $supplier->setPhone($phone);
        $supplier->setPostalCode($postalCode);
        $supplier->setAddress($address);
        $supplier->setInfo($info);

        $em->persist($supplier);
        $em->flush();

        $data['id'] = $supplier->getId();
        $data['code'] = $supplier->getCode();
        $data['name'] = $supplier->getName();
        $data['category'] = $supplier->getCategory();
        $data['email'] = $supplier->getEmail();
        $data['phone'] = $supplier->getPhone();
        $data['postalCode'] = $supplier->getPostalCode();
        $data['address'] = $supplier->getAddress();
        $data['info'] = $supplier->getInfo();

        return $this->json($data);
    }

    /**
     * @Route("/api/suppliers/{id}/remove", name="app_suppliers_remove", methods="GET")
     */
    public function removeSupplier(int $id, SupplierRepository $supplierRepository, EntityManagerInterface $em): Response
    {
        $supplier = $supplierRepository->find($id);

        $em->remove($supplier);
        $em->flush();

        return $this->json($supplier);
    }
}

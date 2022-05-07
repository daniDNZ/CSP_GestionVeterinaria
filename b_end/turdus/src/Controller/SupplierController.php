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
}

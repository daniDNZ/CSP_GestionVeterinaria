<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\SupplierRepository;


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
}

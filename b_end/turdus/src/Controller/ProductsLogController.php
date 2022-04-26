<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\BillRepository;
use App\Repository\ProductRepository;
use App\Entity\ProductsLog;

class ProductsLogController extends AbstractController
{
    /**
     * @Route("/api/products/log/add", name="app_products_log_add", methods="POST")
     */
    public function add(BillRepository $billRepository, ProductRepository $productRepository, Request $request, EntityManagerInterface $em): Response
    {
        $d = $request->toArray();
        $bill = $billRepository->findOneBy(array('visit' => $d['visit']));
        $product = $productRepository->find($d['id']);
        $pLog = new ProductsLog;

        $pLog->setBill($bill);
        $pLog->setProduct($product);
        $pLog->setQuantity($d['quantity']);
        
        $em->persist($pLog);
        $em->flush();

        return $this->json($pLog);
    }
}

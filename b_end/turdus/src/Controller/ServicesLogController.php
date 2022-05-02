<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\BillRepository;
use App\Repository\ServiceRepository;
use App\Entity\ServicesLog;

class ServicesLogController extends AbstractController
{
    /**
     * @Route("/api/services_log/add", name="app_services_log_add", methods="POST")
     */
    public function add( BillRepository $billRepository, ServiceRepository $serviceRepository, Request $request, EntityManagerInterface $em): Response
    {
        $d = $request->toArray();
        $bill = $billRepository->findOneBy(array('visit' => $d['visit']));
        $service = $serviceRepository->find($d['id']);
        $sLog = new ServicesLog;

        $sLog->setBill($bill);
        $sLog->setService($service);
        $sLog->setQuantity($d['quantity']);
        
        $em->persist($sLog);
        $em->flush();

        return $this->json($sLog);
    }
}

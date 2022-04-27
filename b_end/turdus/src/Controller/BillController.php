<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\VisitRepository;
use App\Repository\BillRepository;
use App\Entity\Bill;

class BillController extends AbstractController
{
    /**
     * @Route("/api/bill", name="app_bill")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/BillController.php',
        ]);
    }

    /**
     * @Route("/api/bill/find", name="app_bill_find", methods="POST")
     */
    public function find( BillRepository $billRepository, Request $request): Response
    {
        $data = $request->toArray();
        $entity = $billRepository->findOneBy(array('visit' => $data['visit_id']));
        $bill = [];

        if ($entity) 
        {   
            $bill['id'] = $entity->getId();
            $bill['visit'] = $entity->getVisit()->getId();
            $bill['paid'] = $entity->getPaid();
            $bill['amount'] = $entity->getAmount();
        }

        return $this->json($bill);
    }

    /**
     * @Route("/api/customer/{id}/debt", name="app_customer_debt", methods="GET")
     */
    public function findDebt( BillRepository $billRepository, int $id): Response
    {
        $entities = $billRepository->findBy(array('customer' => $id, 'paymentCompleted' => false));

        $bills = [];
        foreach ($entities as $entity) {
            $bill = [];
            $bill['id'] = $entity->getId();
            $bill['visit'] = $entity->getVisit()->getId();
            $bill['paid'] = $entity->getPaid();
            $bill['amount'] = $entity->getAmount();
            $debt = floatval($bill['amount']) - floatval($bill['paid']);
            $bill['debt'] = number_format($debt, 2);
            $bills[] = $bill;
        }
        

        return $this->json($bills);
    }

    /**
     * @Route("/api/bill/update", name="app_bill_update", methods="POST")
     */
    public function update(BillRepository $billRepository, Request $request, EntityManagerInterface $em): Response
    {
        $data = $request->toArray();
        $bill = $billRepository->find($data['id']);
        
        $paid = $bill->getPaid();
        $totalPaid = floatval($paid) + floatval($data['paid']);
        $bill->setPaid($totalPaid);

        if ($bill->getAmount() <= $totalPaid) 
        {
            $bill->setPaymentCompleted(true);
        }

        $em->persist($bill);
        $em->flush();


        return $this->json($bill);
    }

    /**
     * @Route("/api/bill/add", name="app_bill_add", methods="POST")
     */
    public function add(VisitRepository $visitRepository, Request $request, EntityManagerInterface $em): Response
    {
        $data = $request->toArray();
        $visit = $visitRepository->find($data['visit_id']);
        $customer = $visit->getPatient()->getResponsible();
        $datetime = new \DateTime();

        $bill = new Bill;
        $bill->setDatetime($datetime);
        $bill->setCustomer($customer);
        $bill->setVisit($visit);
        $bill->setPaid($data['paid']);
        $bill->setAmount($data['amount']);
        $bill->setPaymentCompleted(false);

        $em->persist($bill);
        $em->flush();

        $returnBill = [];
        $returnBill['id'] = $bill->getId();
        $returnBill['visit'] = $bill->getVisit();
        $returnBill['paid'] = $bill->getPaid();
        $returnBill['amount'] = $bill->getAmount();

        return $this->json($returnBill);
    }
}

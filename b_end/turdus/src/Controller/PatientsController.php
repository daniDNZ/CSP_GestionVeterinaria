<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PatientRepository;
use App\Repository\VisitRepository;
use Symfony\Component\HttpFoundation\Request; 

class PatientsController extends AbstractController
{
    /**
     * @Route("/api/patients", name="app_patients", methods="POST")
     */
    public function index(PatientRepository $patientRepository, VisitRepository $visitrepository, Request $request): Response
    {
        $patients = [];
        $data = $request->toArray();
        
        if ($data['userid'] != '' && $data['customer'] != '') {
            $patientEntities = $patientRepository->findBy(array('vet' => $data['userid'], 'responsible' => $data['customer']));
        } else if ($data['userid'] != '') {
            $patientEntities = $patientRepository->findBy(array('vet' => $data['userid']));
        } else if ($data['customer'] != '') {
            $patientEntities = $patientRepository->findBy(array('responsible' => $data['customer']));
        } else {
            $patientEntities = $patientRepository->findAll();
        }
        foreach ($patientEntities as $patientEntity) {
            $patient = [];
            $patient['id'] = $patientEntity->getId();
            $patient['name'] = $patientEntity->getName();
            $patients[] = $patient;
        }
        return $this->json($patients);
    }
}

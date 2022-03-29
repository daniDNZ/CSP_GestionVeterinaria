<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use App\Repository\PatientRepository;
use App\Repository\CustomerRepository;

class UsersController extends AbstractController
{
    /**
     * @Route("/api/users", name="app_users")
     */
    public function index(UserRepository $userRepository): Response
    {   
        $users = [];

        $userEntities = $userRepository->findAll();
        foreach ($userEntities as $userEntity) {
            $user = [];
            $user['id'] = $userEntity->getId();
            $user['name'] = $userEntity->getName();
            $user['area'] = $userEntity->getArea();
            $users[] = $user;
        }

        return $this->json($users);
    }

    /**
     * @Route("/api/vets", name="app_vets", methods={"GET", "POST"})
     */
    public function vets(UserRepository $userRepository, PatientRepository $patientRepository, CustomerRepository $customerRepository, Request $request): Response
    {   
        $users = [];

        if ($request->isMethod('GET')){
            $userEntities = $userRepository->findByRoles('[%"ROLE_VET"%]');
        } else {
            $data = $request->toArray();
        
            if ($data['patient'] != '') {
                $patientEntities = $patientRepository->findBy(array('id' => $data['patient']));
                $patient = $patientEntities[0];
                $vetId = $patient->getVet();
                
                $userEntities = $userRepository->findBy(array('id' => $vetId));
            } else if ($data['customer'] != '') {
                $customerEntities = $customerRepository->findBy(array('id' => $data['customer']));
                $customerId = $customerEntities[0]['id'];
    
                $patientEntities = $patientRepository->findBy(array('responsible' => $customerId));
                $vetIds = [];
                $userEntities = [];
                foreach ($patientEntities as $patientEntity) {
                    $vetIds[] = $patientEntity->getVet();
                }
                for ($i=0; $i < count($vetIds); $i++) { 
                    $userEntities[] = $userRepository->findBy(array('id' => $vetIds[$i])); 
                }           
            } else {
                $userEntities = $userRepository->findByRoles('[%"ROLE_VET"%]');
            }
        }

        
        foreach ($userEntities as $userEntity) {
            $user = [];
            $user['id'] = $userEntity->getId();
            $user['username'] = $userEntity->getUsername();
            $user['name'] = $userEntity->getName();
            $user['area'] = $userEntity->getArea();
            $users[] = $user;
        }

        return $this->json($users);
    }
}

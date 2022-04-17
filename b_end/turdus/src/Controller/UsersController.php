<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\CustomerRepository;
use App\Repository\PatientRepository;
use App\Repository\SpeciesRepository;
use App\Repository\UserRepository;

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
     * @Route("/api/vets", name="app_vets_get", methods="GET")
     */
    public function getVets(
        UserRepository $userRepository, 
        PatientRepository $patientRepository, 
        CustomerRepository $customerRepository, 
        SpeciesRepository $speciesRepository,
        Request $request
        ): Response
    {   
        $users = [];
        $vetIds = [];
        
        $userEntities = $userRepository->findByRoles('[%"ROLE_VET"%]');
        
        foreach ($userEntities as $userEntity) 
        {
            $user = [];
            $user['id'] = $userEntity->getId();
            $user['name'] = $userEntity->getName();
            $user['area'] = $userEntity->getArea();
            $user['username'] = $userEntity->getUsername();
            $users[] = $user;
        }

        return $this->json($users);
    }

    /**
     * @Route("/api/vets", name="app_vets_find", methods="POST")
     */
    public function findVets(
        UserRepository $userRepository, 
        PatientRepository $patientRepository, 
        CustomerRepository $customerRepository, 
        SpeciesRepository $speciesRepository,
        Request $request
        ): Response
    {   
        $users = [];
        $vetIds = [];
        
        $query = array();
        $data = $request->toArray();
          
        // Construimos la query
        if (array_key_exists('patient', $data))    { $query['name'] = $data['patient']; } else { $query['name'] = '%';}
        if (array_key_exists('species', $data))    { $query['species'] = $data['species']; } else { $query['species'] = '%';}
        if (array_key_exists('sterilised', $data)) { $query['sterilised'] = $data['sterilised']; } else { $query['sterilised'] = '%';}
        if (array_key_exists('customer', $data))   { $query['responsible'] = $data['customer'];} else { $query['responsible'] = '%';}
        
        $vetIds = [];
        $entradaIds = [];
        $userEntities = [];
        $patientEntities = $patientRepository->findByQuery($query);

        foreach ($patientEntities['all'] as $patientEntity) 
        {
            $entradaIds[] = $patientEntity->getVet();
        }

        // Eliminamos los ids repetidos
        $vetIds = array_unique($entradaIds, $sort_flags = SORT_REGULAR);

        foreach ($vetIds as $id) 
        {
            $userEntities[] = $userRepository->findOneBy(array('id' => $id));
        }          
        
        foreach ($userEntities as $userEntity) 
        {
            $user = [];
            $user['id'] = $userEntity->getId();
            $user['name'] = $userEntity->getName();
            $user['area'] = $userEntity->getArea();
            $user['username'] = $userEntity->getUsername();
            $users[] = $user;
        }

        return $this->json($users);
    }
}

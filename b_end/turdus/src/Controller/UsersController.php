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
     * @Route("/api/vets", name="app_vets", methods={"GET", "POST"})
     */
    public function vets(
        UserRepository $userRepository, 
        PatientRepository $patientRepository, 
        CustomerRepository $customerRepository, 
        SpeciesRepository $speciesRepository,
        Request $request
        ): Response
    {   
        $users = [];
        $vetIds = [];
        

        if ($request->isMethod('GET'))
        {
            $userEntities = $userRepository->findByRoles('[%"ROLE_VET"%]');
        } 
        else 
        {
            $query = array();
            $data = $request->toArray();

            // Construimos la query
            if ($data['patient'] !== '')    { $query['name'] = $data['patient']; }
            if ($data['species'] !== '')    { $query['species'] = $speciesRepository->findOneBy(array('name' => $data['species']))->getId(); }
            if ($data['sterilised'] !== '') { $query['sterilised'] = $data['sterilised']; }
            if ($data['customer'] !== '')   { $query['responsible'] = $customerRepository->findOneBy(array('email' => $data['customer']))->getId();} 
            
            // Hacemos la búsqueda por QUERY o por ROL
            if (!empty($query)) 
            {
                $vetIds = [];
                $entradaIds = [];
                $userEntities = [];
                $patientEntities = $patientRepository->findBy($query);

                foreach ($patientEntities as $patientEntity) 
                {
                    $entradaIds[] = $patientEntity->getVet();
                }

                // Eliminamos los ids repetidos
                $vetIds = array_unique($entradaIds, $sort_flags = SORT_REGULAR);

                foreach ($vetIds as $id) 
                {
                    $userEntities[] = $userRepository->findOneBy(array('id' => $id));
                }          
            } 
            else 
            {
                $userEntities = $userRepository->findByRoles('[%"ROLE_VET"%]');
            }
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

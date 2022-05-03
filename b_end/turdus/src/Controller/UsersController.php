<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\PatientRepository;
use App\Repository\UserRepository;

class UsersController extends AbstractController
{
    function maker($userEntities)
    {
        foreach ($userEntities as $userEntity) {
            $user = [];
            $user['id'] = $userEntity->getId();
            $user['name'] = $userEntity->getName();
            $user['lastName'] = $userEntity->getLastName();
            $user['area'] = $userEntity->getArea();
            $users[] = $user;
        }

        return $users;
    }
    /**
     * @Route("/api/{currentPage}/users", name="app_users", methods="POST")
     */
    public function index(UserRepository $userRepository, int $currentPage, Request $request): Response
    {   
        $data = $request->toArray();
        $limit = 10;
        $query = array();
        if (array_key_exists('namePicker', $data))      {$query['name'] = $data['namePicker'];} else {$query['name'] = '%';}
        if (array_key_exists('lastnamePicker', $data))  {$query['last_name'] = $data['lastnamePicker'];} else {$query['last_name'] = '%';}
        if (array_key_exists('areaPicker', $data))      {$query['area'] = $data['areaPicker'];} else {$query['area'] = '%';}
            
        
        $usersFound = $userRepository->findByQuery($query, $currentPage, $limit);
        $result = $usersFound['paginator'];

        $maxPages = ceil($usersFound['paginator']->count() / $limit);

        $users = $this->maker($result);
        $allUsers = $this->maker($usersFound['all']);

        return $this->json([
            'data' => $users,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage,
            'allData' => $allUsers
        ]);
    }

    /**
     * @Route("/api/users/get_current", name="app_users_get_current", methods="POST")
     */
    public function getCurUser(UserRepository $userRepository, Request $request): Response
    {   
        $data = $request->toArray();
        $users = [];
        $userEntity = $userRepository->findOneBy(array('username' => $data['username']));

        $user = [];
        $user['id'] = $userEntity->getId();
        $user['name'] = $userEntity->getName();
        $user['roles'] = $userEntity->getRoles();
        $user['pic'] = $userEntity->getPic();
        $user['username'] = $userEntity->getUsername();
       

        return $this->json($user);
    }

    /**
     * @Route("/api/user/{id}", name="app_one_user", methods="GET")
     */
    public function getOneUser( UserRepository $userRepository, int $id ): Response
    {   
        $entity = $userRepository->find($id);
        
        $user = [];
        $user['id'] = $userEntity->getId();
        $user['name'] = $userEntity->getName();
        $user['last_name'] = $userEntity->getLastName();
        $user['roles'] = $userEntity->getRoles();
        $user['area'] = $userEntity->getArea();
        $user['username'] = $userEntity->getUsername();
        $user['email'] = $userEntity->getEmail();
        $user['salary'] = $userEntity->getSalary();
        $user['phone'] = $userEntity->getPhone();
        $user['dni'] = $userEntity->getDni();
        $user['collegiate'] = $userEntity->getCollegiateN();
        

        return $this->json($user);
    }

    /**
     * @Route("/api/vets", name="app_vets_get", methods="GET")
     */
    public function getVets( UserRepository $userRepository, Request $request ): Response
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

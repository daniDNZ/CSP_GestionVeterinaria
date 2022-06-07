<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PatientRepository;
use App\Repository\UserRepository;
use App\Entity\User;

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
        $user['id'] = $entity->getId();
        $user['name'] = $entity->getName();
        $user['lastName'] = $entity->getLastName();
        $user['roles'] = $entity->getRoles();
        $user['area'] = $entity->getArea();
        $user['username'] = $entity->getUsername();
        $user['email'] = $entity->getEmail();
        $user['salary'] = $entity->getSalary();
        $user['phone'] = $entity->getPhone();
        $user['dni'] = $entity->getDni();
        $user['collegiate'] = $entity->getCollegiateN();
        

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

    /**
     * @Route("/api/user/add", name="app_user_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em ): Response
    {   
        $name       = $request->request->get('name');
        $lastName   = $request->request->get('last_name');
        $roles      = $request->request->get('roles');
        $area       = $request->request->get('area');
        $username   = $request->request->get('username');
        $email      = $request->request->get('email');
        $salary     = $request->request->get('salary');
        $phone      = $request->request->get('phone');
        $dni        = $request->request->get('dni');
        $collegiate = $request->request->get('collegiate');
        $password   = $request->request->get('password');
        $photo      = $request->files->get('pic');
        
        $user = New User();
        
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setRoles(explode(',', $roles));
        $user->setArea($area);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setSalary($salary);
        $user->setPhone($phone);
        $user->setDni($dni);
        $user->setCollegiateN($collegiate);
        $user->setPassword($password);
        
        $em->persist($user);
        $em->flush();

        if ($photo) {
            $id = $user->getId();

            $directory = $this->getParameter('pic_directory');
            $fileName = 'profile_' . $id . '.' . $photo->getClientOriginalExtension();
            $photo->move($directory, $fileName);
    
            $urlPhoto = '/img/users/'.$fileName;
            $user->setPic($urlPhoto);
    
            $em->persist($user);
            $em->flush();
        }

        $data['id'] = $user->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/user/update", name="app_user_update", methods="POST")
     */
    public function update( UserRepository $userRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id         = $request->request->get('id');
        $name       = $request->request->get('name');
        $lastName   = $request->request->get('last_name');
        $roles      = $request->request->get('roles');
        $area       = $request->request->get('area');
        $username   = $request->request->get('username');
        $email      = $request->request->get('email');
        $salary     = $request->request->get('salary');
        $phone      = $request->request->get('phone');
        $dni        = $request->request->get('dni');
        $collegiate = $request->request->get('collegiate');
        $photo      = $request->files->get('pic');
        
        $user = $userRepository->find($id);
        
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setRoles(explode(',', $roles));
        $user->setArea($area);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setSalary($salary);
        $user->setPhone($phone);
        $user->setDni($dni);
        $user->setCollegiateN($collegiate);
        
        $em->persist($user);
        $em->flush();

        if ($photo) {
            $id = $user->getId();

            $directory = $this->getParameter('pic_directory');
            $fileName = 'profile_' . $id . '.' . $photo->getClientOriginalExtension();
            $photo->move($directory, $fileName);
    
            $urlPhoto = '/img/users/'.$fileName;
            $user->setPic($urlPhoto);
    
            $em->persist($user);
            $em->flush();
        }
        

        $data['id'] = $user->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/user/{id}/update_profile", name="app_user_update_profile", methods="POST")
     */
    public function updateProfile( UserRepository $userRepository, int $id, Request $request, EntityManagerInterface $em ): Response
    {   
        $user = $userRepository->find($id);

        $name       = $request->request->get('name');
        $lastName   = $request->request->get('lastName');
        $username   = $request->request->get('username');
        $email      = $request->request->get('email');
        $phone      = $request->request->get('phone');
        $dni        = $request->request->get('dni');
        $collegiate = $request->request->get('collegiate');
        $photo      = $request->files->get('pic');
        
        
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setDni($dni);
        $user->setCollegiateN($collegiate);
        
        $em->persist($user);
        $em->flush();

        if ($photo) {
            $directory = $this->getParameter('pic_directory');

            $oldPicUrl = $user->getPic();   // ELIMINAR LA FOTO ANTERIOR PRIMERO
            $picName = explode('/', $oldPicUrl)[3];
            unlink($directory.'/'.$picName);

            $fileName = 'profile_' . $id . '.' . $photo->getClientOriginalExtension();
            $photo->move($directory, $fileName);
    
            $urlPhoto = '/img/users/'.$fileName;
            $user->setPic($urlPhoto);
    
            $em->persist($user);
            $em->flush();
        }
        

        $data['id'] = $user->getId();

        return $this->json($data);
    }

    /**
     * @Route("/api/users/{id}/remove", name="app_users_remove", methods="GET")
     */
    public function removeUser(int $id, UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        $user = $userRepository->find($id);

        $em->remove($user);
        $em->flush();

        return $this->json([
            'message' => 'Eliminado con éxito!'
        ]);
    }

    /**
     * @Route("/api/user/change_pswd", name="app_user_change_pswd", methods="POST")
     */
    public function changePswd( UserRepository $userRepository, Request $request, EntityManagerInterface $em ): Response
    {   
        $id         = $request->request->get('id');
        $pswd       = $request->request->get('pswd');
        
        $user = $userRepository->find($id);
        
        $user->setPassword($pswd);
        
        $em->persist($user);
        $em->flush();

        $data['id'] = $user->getId();

        return $this->json($data);
    }
}
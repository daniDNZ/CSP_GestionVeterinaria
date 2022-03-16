<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
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
            $user['name'] = $userEntity->getName();
            $user['area'] = $userEntity->getArea();
            $users[] = $user;
        }

        return $this->json($users);
    }
}

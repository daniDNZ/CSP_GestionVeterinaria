<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PostalCodeRepository;
use App\Entity\PostalCode;



class PostalCodeController extends AbstractController
{
    /**
     * @Route("/api/postal_code", name="app_postal_code")
     */
    public function index(PostalCodeRepository $postalCodeRepository): Response
    {
        $entities = $postalCodeRepository->findAll();

        $postalCodes = [];
        foreach ($entities as $entity) {
            $pc['id'] = $entity->getId();
            $postalCodes[] = $pc;
        }
        return $this->json($postalCodes);
    }

    /**
     * @Route("/api/postal_code/add", name="app_postal_code_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em ): Response
    {   
        $id             = $request->request->get('pc');
        $province       = $request->request->get('province');
        $city           = $request->request->get('city');
        $country        = $request->request->get('country');

        $postalCode = New PostalCode();
        
        $postalCode->setId($id);
        $postalCode->setProvince($province);
        $postalCode->setCity($city);
        $postalCode->setCountry($country);

        $em->persist($postalCode);
        $em->flush();

        $data['id'] = $postalCode->getId();

        return $this->json($data);
    }
}

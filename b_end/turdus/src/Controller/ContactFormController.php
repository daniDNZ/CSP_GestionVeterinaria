<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ContactFormRepository;
use App\Entity\ContactForm;

class ContactFormController extends AbstractController
{
    /**
     * @Route("api/contact_form/{currentPage}", name="app_contact_form", methods="GET")
     */
    public function getMessages(ContactFormRepository $contactFormRepository, int $currentPage): Response
    {
        $limit = 4;

        $entitiesFound = $contactFormRepository->findAll($currentPage, $limit);
        $result = $entitiesFound['paginator'];

        $maxPages = ceil($entitiesFound['paginator']->count() / $limit);

        foreach ($result as $entity) {
            $message['id']      = $entity->getId();
            $message['email']   = $entity->getEmail();
            $message['message'] = $entity->getMessage();
            $message['date']    = $entity->getDate();

            $messages[] = $message;
        }

        return $this->json([
            'data' => $messages,
            'maxPages' => $maxPages,
            'thisPage' => $currentPage
        ]);
    }

    /**
     * @Route("/api/contact_form/add", name="app_contact_form_add", methods="POST")
     */
    public function add( Request $request, EntityManagerInterface $em): Response
    {
        $email      = $request->request->get('email');
        $message    = $request->request->get('message');
        $date       = $request->request->get('date');

        $contactForm = new ContactForm();

        $contactForm->setEmail($email);
        $contactForm->setMessage($message);
        $contactForm->setDate($date);

        $em->persist($contactForm);
        $em->flush($contactForm);

        return $this->json([
            'message' => 'Enviado con éxito!',
        ]);
    }

    /**
     * @Route("/api/contact_form/remove/{id}", name="app_contact_form_remove", methods="GET")
     */
    public function remove( int $id, ContactFormRepository $contactFormRepository, EntityManagerInterface $em): Response
    {
        $contactForm = $contactFormRepository->find($id);

        $em->remove($contactForm);
        $em->flush();

        return $this->json([
            'message' => 'Eliminado con éxito!',
        ]);
    }
}

<?php

namespace App\Entity;

use App\Repository\AllergieRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AllergieRepository::class)
 */
class Allergie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $substance;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSubstance(): ?string
    {
        return $this->substance;
    }

    public function setSubstance(string $substance): self
    {
        $this->substance = $substance;

        return $this;
    }
}

<?php

namespace App\Entity;

use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PatientRepository::class)
 */
class Patient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="bigint", nullable=true)
     */
    private $chip;

    /**
     * @ORM\Column(type="date")
     */
    private $birthday;

    /**
     * @ORM\ManyToOne(targetEntity=Species::class, inversedBy="patients")
     */
    private $species;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $race;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $color;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $eyes;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="patients")
     */
    private $responsible;

    /**
     * @ORM\ManyToOne(targetEntity=Family::class, inversedBy="patients")
     */
    private $family;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $info;

    /**
     * @ORM\OneToMany(targetEntity=Visit::class, mappedBy="patient", orphanRemoval=true)
     */
    private $visits;

    /**
     * @ORM\OneToMany(targetEntity=Document::class, mappedBy="patient", orphanRemoval=true)
     */
    private $documents;

    /**
     * @ORM\OneToMany(targetEntity=Reminder::class, mappedBy="patient", orphanRemoval=true)
     */
    private $reminders;

    /**
     * @ORM\OneToMany(targetEntity=AllergiesLog::class, mappedBy="patient", orphanRemoval=true)
     */
    private $AllergiesLogs;

    /**
     * @ORM\OneToMany(targetEntity=ServicesLog::class, mappedBy="patient", orphanRemoval=true)
     */
    private $servicesLogs;

    /**
     * @ORM\OneToMany(targetEntity=ProductsLog::class, mappedBy="patient")
     */
    private $productsLogs;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $gender;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $sterilised;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="patients")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vet;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $weight;

    public function __construct()
    {
        $this->visits = new ArrayCollection();
        $this->documents = new ArrayCollection();
        $this->reminders = new ArrayCollection();
        $this->AllergiesLogs = new ArrayCollection();
        $this->servicesLogs = new ArrayCollection();
        $this->productsLogs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChip(): ?string
    {
        return $this->chip;
    }

    public function setChip(?string $chip): self
    {
        $this->chip = $chip;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getSpecies(): ?Species
    {
        return $this->species;
    }

    public function setSpecies(?Species $species): self
    {
        $this->species = $species;

        return $this;
    }

    public function getRace(): ?string
    {
        return $this->race;
    }

    public function setRace(?string $race): self
    {
        $this->race = $race;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getEyes(): ?string
    {
        return $this->eyes;
    }

    public function setEyes(?string $eyes): self
    {
        $this->eyes = $eyes;

        return $this;
    }

    public function getResponsible(): ?Customer
    {
        return $this->responsible;
    }

    public function setResponsible(?Customer $responsible): self
    {
        $this->responsible = $responsible;

        return $this;
    }

    public function getFamily(): ?Family
    {
        return $this->family;
    }

    public function setFamily(?Family $family): self
    {
        $this->family = $family;

        return $this;
    }

    public function getInfo(): ?string
    {
        return $this->info;
    }

    public function setInfo(?string $info): self
    {
        $this->info = $info;

        return $this;
    }

    /**
     * @return Collection<int, Visit>
     */
    public function getVisits(): Collection
    {
        return $this->visits;
    }

    public function addVisit(Visit $visit): self
    {
        if (!$this->visits->contains($visit)) {
            $this->visits[] = $visit;
            $visit->setPatient($this);
        }

        return $this;
    }

    public function removeVisit(Visit $visit): self
    {
        if ($this->visits->removeElement($visit)) {
            // set the owning side to null (unless already changed)
            if ($visit->getPatient() === $this) {
                $visit->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Document>
     */
    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(Document $document): self
    {
        if (!$this->documents->contains($document)) {
            $this->documents[] = $document;
            $document->setPatient($this);
        }

        return $this;
    }

    public function removeDocument(Document $document): self
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getPatient() === $this) {
                $document->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reminder>
     */
    public function getReminders(): Collection
    {
        return $this->reminders;
    }

    public function addReminder(Reminder $reminder): self
    {
        if (!$this->reminders->contains($reminder)) {
            $this->reminders[] = $reminder;
            $reminder->setPatient($this);
        }

        return $this;
    }

    public function removeReminder(Reminder $reminder): self
    {
        if ($this->reminders->removeElement($reminder)) {
            // set the owning side to null (unless already changed)
            if ($reminder->getPatient() === $this) {
                $reminder->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, AllergiesLog>
     */
    public function getAllergiesLogs(): Collection
    {
        return $this->AllergiesLogs;
    }

    public function addAllergiesLog(AllergiesLog $allergiesLog): self
    {
        if (!$this->AllergiesLogs->contains($allergiesLog)) {
            $this->AllergiesLogs[] = $allergiesLog;
            $allergiesLog->setPatient($this);
        }

        return $this;
    }

    public function removeAllergiesLog(AllergiesLog $allergiesLog): self
    {
        if ($this->AllergiesLog->removeElement($allergiesLog)) {
            // set the owning side to null (unless already changed)
            if ($allergiesLog->getPatient() === $this) {
                $allergiesLog->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ServicesLog>
     */
    public function getServicesLogs(): Collection
    {
        return $this->servicesLogs;
    }

    public function addServicesLog(ServicesLog $servicesLog): self
    {
        if (!$this->servicesLogs->contains($servicesLog)) {
            $this->servicesLogs[] = $servicesLog;
            $servicesLog->setPatient($this);
        }

        return $this;
    }

    public function removeServicesLog(ServicesLog $servicesLog): self
    {
        if ($this->servicesLogs->removeElement($servicesLog)) {
            // set the owning side to null (unless already changed)
            if ($servicesLog->getPatient() === $this) {
                $servicesLog->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProductsLog>
     */
    public function getProductsLogs(): Collection
    {
        return $this->productsLogs;
    }

    public function addProductsLog(ProductsLog $productsLog): self
    {
        if (!$this->productsLogs->contains($productsLog)) {
            $this->productsLogs[] = $productsLog;
            $productsLog->setPatient($this);
        }

        return $this;
    }

    public function removeProductsLog(ProductsLog $productsLog): self
    {
        if ($this->productsLogs->removeElement($productsLog)) {
            // set the owning side to null (unless already changed)
            if ($productsLog->getPatient() === $this) {
                $productsLog->setPatient(null);
            }
        }

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSterilised(): ?bool
    {
        return $this->sterilised;
    }

    public function setSterilised(bool $sterilised): self
    {
        $this->sterilised = $sterilised;

        return $this;
    }

    public function getVet(): ?User
    {
        return $this->vet;
    }

    public function setVet(?User $vet): self
    {
        $this->vet = $vet;

        return $this;
    }

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(?string $weight): self
    {
        $this->weight = $weight;

        return $this;
    }
}

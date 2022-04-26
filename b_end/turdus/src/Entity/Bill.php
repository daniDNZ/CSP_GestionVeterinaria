<?php

namespace App\Entity;

use App\Repository\BillRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BillRepository::class)
 */
class Bill
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="bills")
     * @ORM\JoinColumn(nullable=false)
     */
    private $customer;

    /**
     * @ORM\Column(type="datetime")
     */
    private $datetime;

    /**
     * @ORM\OneToMany(targetEntity=ServicesLog::class, mappedBy="bill", orphanRemoval=true)
     */
    private $servicesLogs;

    /**
     * @ORM\OneToMany(targetEntity=ProductsLog::class, mappedBy="bill", orphanRemoval=true)
     */
    private $productsLogs;

    /**
     * @ORM\ManyToOne(targetEntity=visit::class, inversedBy="bills")
     */
    private $visit;

    /**
     * @ORM\Column(type="float")
     */
    private $paid;

    /**
     * @ORM\Column(type="float")
     */
    private $amount;

    /**
     * @ORM\Column(type="boolean")
     */
    private $paymentCompleted;

    public function __construct()
    {
        $this->servicesLogs = new ArrayCollection();
        $this->productsLogs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getDatetime(): ?\DateTime
    {
        return $this->datetime;
    }

    public function setDatetime(\DateTime $datetime): self
    {
        $this->datetime = $datetime;

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
            $servicesLog->setBill($this);
        }

        return $this;
    }

    public function removeServicesLog(ServicesLog $servicesLog): self
    {
        if ($this->servicesLogs->removeElement($servicesLog)) {
            // set the owning side to null (unless already changed)
            if ($servicesLog->getBill() === $this) {
                $servicesLog->setBill(null);
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
            $productsLog->setBill($this);
        }

        return $this;
    }

    public function removeProductsLog(ProductsLog $productsLog): self
    {
        if ($this->productsLogs->removeElement($productsLog)) {
            // set the owning side to null (unless already changed)
            if ($productsLog->getBill() === $this) {
                $productsLog->setBill(null);
            }
        }

        return $this;
    }

    public function getVisit(): ?visit
    {
        return $this->visit;
    }

    public function setVisit(?visit $visit): self
    {
        $this->visit = $visit;

        return $this;
    }

    public function getPaid(): ?float
    {
        return $this->paid;
    }

    public function setPaid(float $paid): self
    {
        $this->paid = $paid;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getPaymentCompleted(): ?bool
    {
        return $this->paymentCompleted;
    }

    public function setPaymentCompleted(bool $paymentCompleted): self
    {
        $this->paymentCompleted = $paymentCompleted;

        return $this;
    }
}

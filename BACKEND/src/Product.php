<?php
// src/Product.php


use Doctrine\ORM\Mapping as ORM;

/**
 * Product
 *
 * @ORM\Table(name="products")
 * @ORM\Entity
 */
class Product
{
    /**
	 * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    public $idProduct;

    /**
     * @ORM\Column(type="string")
     */
    public $name;

    /**
     * @ORM\Column(type="string")
     */
    public $description;

    /**
     * @ORM\Column(type="float")
     */
    public $price;



    public function getIdProduct()
    {
        return $this->idProduct;
    }
	

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getName()
    {
        return $this->name;
    }


    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    public function getDescription()
    {
        return $this->description;
    }


    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }


    public function getPrice()
    {
        return $this->price;
    }


}

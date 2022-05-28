<?php
// src/Product.php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User
{
	
	/**
     * @ORM\Id
     * @ORM\Column(type="string")
     */
    protected $login;
	
    /**
     * @ORM\Column(type="string")
     */
    protected $name;
	
	
	/**
     * @ORM\Column(type="string")
     */
    protected $lastname;
	
	/**
     * @ORM\Column(type="string")
     */
    protected $phoneNumber;
	
	/**
     * @ORM\Column(type="string")
     */
    protected $address;
	
	
	/**
     * @ORM\Column(type="integer")
     */
    protected $codePostal;
	
	
	/**
     * @ORM\Column(type="string")
     */
    protected $city;
	
	
	/**
     * @ORM\Column(type="string")
     */
    protected $country;
	
	
	
	/**
     * @ORM\Column(type="string")
     */
    protected $civilite;
	
	
	/**
     * @ORM\Column(type="string")
     */
    protected $password;



    public function getLogin()
    {
        return $this->login;
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }
	
	public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
	
	public function getLastname()
    {
        return $this->lastname;
    }

    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }
	
	public function getPhonenumber()
    {
        return $this->phoneNumber;
    }

    public function setPhonenumber($phoneNumber)
    {
        $this->phoneNumber = $phoneNumber;
    }
	
	public function getAddress()
    {
        return $this->address;
    }

    public function setAddress($address)
    {
        $this->address = $address;
    }
	
	public function getCodepostal()
    {
        return $this->codePostal;
    }

    public function setCodepostal($codePostal)
    {
        $this->codePostal = $codePostal;
    }
	
	public function getCity()
    {
        return $this->city;
    }

    public function setCity($city)
    {
        $this->city = $city;
    }
	
	
	public function getCountry()
    {
        return $this->country;
    }

    public function setCountry($country)
    {
        $this->country = $country;
    }
	
	public function getCivilite()
    {
        return $this->civilite;
    }

    public function setCivilite($civilite)
    {
        $this->civilite = $civilite;
    }
	
	public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }
}
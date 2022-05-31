<?php

require_once "vendor/autoload.php";

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

/*
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}
*/

$isDevMode = true;
$proxyDir = null;
$cache = null;
$useSimpleAnnotationReader = false;
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src"), $isDevMode, $proxyDir, $cache, $useSimpleAnnotationReader);

//'driver' => 'pdo_mysql',
// database configuration parameters
$conn = array(
    'host' => 'ec2-52-30-67-143.eu-west-1.compute.amazonaws.com',
    'driver' => 'pdo_pgsql',
    'user' => 'anugahzpnpsbah',
    'password' => '86ea4e5232bc46015e123f47ce0fc262f4289a69f126e5afaec1f25d67e84576',
    'dbname' => 'deu1i49187f7ra',
    'port' => '5432'
);

// obtaining the entity manager
$entityManager = EntityManager::create($conn, $config);
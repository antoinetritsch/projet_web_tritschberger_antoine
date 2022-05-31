<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . './../vendor/autoload.php';

require_once __DIR__ . './../bootstrap.php';
require_once __DIR__ . './../src/User.php';
require_once __DIR__ . './../src/Product.php';

const JWT_SECRET = "iuegfilezgerrvkefnvkjnrejkgnkrenireng";

$app = AppFactory::create();

function createJWT(Response $response,$login) : Response{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
    'login' => $login,
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

function addHeaders($response) {
    $response = $response->withHeader("Content-Type", "application/json")
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Headers", "Authorization")
		->withHeader("Access-Control-Expose-Headers", "Authorization")
        ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    return $response;
}



$app->get('/api/whoami', function(Request $request, Response $response, $args){
	$authHeader = $request->getHeaderLine('authorization');
	$arr = explode(' ', $authHeader);

        if (count($arr) != 2)  return $response->withStatus(400);

        $jwt = $arr[1];

        $decodeJwt=(array)JWT::decode($jwt, JWT_SECRET, array('HS256'));
		$login = $decodeJwt['login'];
		global $entityManager;
		$userRepository = $entityManager->getRepository('User');
		$user = $userRepository->findOneBy(array(
        'login' => $login
    ));
	if($user){
		$res = [
            'lastname' => $user->getLastname(),
            'name' => $user->getName(),
            'civilite' => $user->getCivilite(),
            'address' => $user->getAddress(),
            'zipCode' => $user->getCodepostal(),
            'city' => $user->getCity(),
            'country' => $user->getCountry(),
            'phone' => $user->getPhonenumber(),
            'login' => $user->getLogin()
        ];
		$response->getBody()->write(json_encode($res));	
		$response->withStatus(200);
	}
	else{
		$response->withStatus(400);
	}
    $response=addHeaders($response);
    return $response;
});


$app->post('/api/signup', function(Request $request, Response $response, $args){
	$body = $request->getParsedBody();
	
	global $entityManager;
	$login = $body['login'] ?? "";
	$lastname = $body['lastname'] ?? "";
    $name = $body['name'] ?? "";
    $civilite = $body['civilite'] ?? "";
    $phoneNumber = $body['phoneNumber'] ?? "";
	$zipCode = $body['codePostal'] ?? 0;
	$city = $body['city'] ?? "";
	$country = $body['country'] ?? "";
	$password = $body['password'] ?? "";
	$address = $body['address'] ?? "";
		
		$passwordHash = password_hash($password, PASSWORD_DEFAULT);
        if (!$passwordHash) return $response->withStatus(400);

    $user = new User();
    $user->setName($name);
    $user->setLastname($lastname);
    $user->setLogin($login);
    $user->setPassword($passwordHash);
	$user->setAddress($address);
	$user->setCivilite($civilite);
	$user->setPhonenumber($phoneNumber);
	$user->setCodepostal($zipCode);
	$user->setCountry($country);
	$user->setCity($city);
	

    $entityManager->persist($user);
    $entityManager->flush();

    $response = addHeaders($response);
    $response->withStatus(200);
	$response->getBody()->write(json_encode(true));
    return $response;
});




$app->post('/api/signin', function (Request $request, Response $response, $args) {	
	$body = $request->getParsedBody();
	global $entityManager;
    $userRepository = $entityManager->getRepository('User');
    $user = $userRepository->findOneBy(array(
        'login' => $body['login']
    ));

    if($user && password_verify($body['password'], $user->getPassword())){
        $response = createJWT($response,$body['login']);
        $response->getBody()->write(json_encode(true));
		$response = $response->withStatus(200);
    }
    else{
        $response = $response->withStatus(401);
    }
	$response = addHeaders($response);
    return $response;
});


$app->get('/api/products', function (Request $request, Response $response, $args) {	
	global $entityManager;
    $productRepository = $entityManager->getRepository('Product');
    $all = $productRepository->findAll();
	$response = $response->withStatus(200);
    $response->getBody()->write(json_encode($all));
	$response = addHeaders($response);
    return $response;
});

$app->get('/api/products/{id}', function (Request $request, Response $response, $args) {
	global $entityManager;
    $productRepository = $entityManager->getRepository('Product');
    $prod = $productRepository->findOneBy(array(
        'idProduct' => $args['id']
    ));
	
	$response = $response->withStatus(200);
	$response = addHeaders($response);
    $response->getBody()->write(json_encode($prod));
    return $response;
});




$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET, 
    "path" => ["/api"], 
    "ignore" => ["/api/hello", "/api/signin", "/api/signup"],
    "error" => function($response, $args){
        $data = ["ERROR" => 'Connection', 'ERROR' => 'Invalid JWT'];
        $response = $response->withStatus(401);
        return $response->withHeader('Content-Type', "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->run();
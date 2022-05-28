<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;


require __DIR__ . '/../vendor/autoload.php';

const JWT_SECRET = "iuegfilezgerrvkefnvkjnrejkgnkrenireng";

$app = AppFactory::create();

function createJWT(Response $response) : Response{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
    'userid' => 'antoine',
    'email' => 'antoine.tritschberger@gmail.com',
    'pseudo' => 'Totomatcho',
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}

$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->get('/api/whoami', function(Request $request, Response $response, $args){
    $data = ['name' => "Tritschberger", "firstName" => "Antoine", "Address" => "1 rue Saint Aloise"];
    $response->getBody()->write(json_encode($data));
    return $response;
});


$app->post('/api/signup', function(Request $request, Response $response, $args){
    $data = ['name' => "Tritschberger", "firstName" => "Antoine", "Address" => "1 rue Saint Aloise"];
    $response->getBody()->write(json_encode($data));
    return $response;
});


$app->post('/api/signin', function (Request $request, Response $response, $args) {
    $err = false;

    if(!$err){
        $response = createJWT($response);
        $data = ['name' => 'Tritschberger', 'firstName' => 'Antoine'];
        $response->getBody()->write(json_encode($data));
    }
    else{
        $response = $response->withStatus(401);
    }
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
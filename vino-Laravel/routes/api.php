<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CellierController;
use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\CelliersHasBouteillesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route de test pour vérifier que l'utilisateur est authentifié
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});



// Route pour les cellier 
Route::group(['namespace' => 'App\Http\Controllers'], function () {
  Route::apiResource('cellier', CellierController::class);
});


// Route pour récupérer les celliers sans bouteilles
Route::get('cellier_sans_bouteilles', [CellierController::class, 'getCelliersSansBouteille']);


// Route pour les celliers_has_bouteilles va chercher la quantité de bouteilles par cellier
Route::get('celliers_has_bouteilles/quantite', [CelliersHasBouteillesController::class, 'getQuantiteParCellier']);


// Route pour les celliers_has_bouteilles
Route::group(['namespace' => 'App\Http\Controllers'], function () {
  Route::apiResource('celliers_has_bouteilles', CelliersHasBouteillesController::class);
  Route::put('celliers_has_bouteilles', [CelliersHasBouteillesController::class, 'updateBouteilleQuantite']);
  Route::delete('celliers_has_bouteilles', [CelliersHasBouteillesController::class, 'destroy']);
});

// Routes protégées Celliers
Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::post('/celliers', [CellierController::class, 'store']);
  Route::get('/celliers', [CellierController::class, 'getCelliersUser']);
});

// Routes protégées User
Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::get('/celliersQuantite', [UserController::class, 'UserCelliersQuantite']);
  Route::delete('/user/{user}', [UserController::class, 'destroy']);
  Route::put('/user/{user}', [UserController::class, 'update']);
  Route::get('/user/{user}', [UserController::class, 'index']);
  Route::get('/user/{user}/bouteilles', [UserController::class, 'getUserBouteilles']);
  Route::get('/user/{user}/archives', [UserController::class, 'getUserArchives']);
});

// Routes protégées Bouteilles
Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::apiResource('bouteille', BouteilleController::class);
});

// Routes publiques, pour enregistrer et connecter un utilisateur
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'authentification']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;

// Routes publiques, pour avoir pays, types et les bouteilles de la SAQ
Route::get('/bouteillessaq',[BouteilleController::class, 'bouteillesSAQ']);
Route::get('/types', [BouteilleController::class, 'afficherTypes']);
Route::get('bouteillescompletes', [BouteilleController::class, 'index']);
Route::get('cellierscompletes', [CellierController::class, 'index']);

//Route pour le scraping de la SAQ
Route::post('scraping',[BouteilleController::class,'ajouterBouteilleSAQ']);
Route::get('misajoursaq',[BouteilleController::class,'misAjourBD']);
Route::get('misajoursaqderniere',[BouteilleController::class,'misaJourSAQDerniere']);
Route::get('misajoursaqcomplete',[BouteilleController::class,'misaJourSAQComplete']);
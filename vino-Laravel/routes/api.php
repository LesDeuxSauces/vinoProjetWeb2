<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CellierController;
use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\CelliersHasBouteillesController;
use App\Models\CelliersHasBouteilles;

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

// Routes pour les bouteilles
Route::group([ 'namespace' => 'App\Http\Controllers'], function() {
    Route::apiResource('bouteille', BouteilleController::class);
});

// Route pour les cellier 
Route::group([ 'namespace' => 'App\Http\Controllers'], function() {
    Route::apiResource('cellier', CellierController::class);
  });
  
// Routes protégées par sanctum
Route::group([ 'middleware' => ['auth:sanctum']], function() {
    // Route::post('/celliers', [CellierController::class, 'store']); -- mis en commentaire pour pouvoir afficher la liste des celliers
    Route::post('/users/{user}/celliers/{cellier}/bouteilles', [[BouteilleController::class, 'store']]);
    Route::get('/celliers', [CellierController::class, 'getCelliersUser']);
});

Route::group([ 'middleware' => ['auth:sanctum']], function() {
    Route::delete('/user/{user}', [UserController::class, 'destroy']);
    Route::put('/user/{user}', [UserController::class, 'update']);
});

// Routes Publique, pour enregistrer et connecter un utilisateur
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'authentification']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;



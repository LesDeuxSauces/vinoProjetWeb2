<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([ 'namespace' => 'App\Http\Controllers'], function() {
    Route::apiResource('bouteille', BouteilleController::class);
});

//Route::post('/users-create', 'UserController@store');
Route::post('/users-create', [UserController::class, 'store']);



Route::group([ 'namespace' => 'App\Http\Controllers'], function() {
  Route::apiResource('cellier', CellierController::class);
});

// Route::group([ 'namespace' => 'App\Http\Controllers'], function() {
//   Route::apiResource('cellier/create', CellierController::class);
// });


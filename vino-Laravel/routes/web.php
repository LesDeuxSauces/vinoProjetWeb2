<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BouteilleController;
use App\Http\Controllers\CellierController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Rooutes pour la gestion des celliers
Route::get('cellier', [\App\Http\Controllers\CellierController::class, 'index'])->name('cellier.index');
Route::get('cellier/create', [\App\Http\Controllers\CellierController::class, 'create'])->name('cellier.create');
Route::post('cellier', [\App\Http\Controllers\CellierController::class, 'store'])->name('cellier.store');
Route::get('cellier/{cellier}', [\App\Http\Controllers\CellierController::class, 'show'])->name('cellier.show');
Route::get('cellier/{cellier}/edit', [\App\Http\Controllers\CellierController::class, 'edit'])->name('cellier.edit');
Route::delete('cellier/{cellier}', [\App\Http\Controllers\CellierController::class, 'destroy'])->name('cellier.destroy');
// Route::put('cellier/{cellier}', [\App\Http\Controllers\CellierController::class, 'update'])->name('cellier.update');

<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CellierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $celliers = Cellier::all();
    return view('cellier.index', ['celliers' => $celliers]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return view('cellier.create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
$dataValide = $request->validate([
  'nom' => 'required|string|max:50',
  'users_id' => 'required|integer|exists:users,id',

  ]);
  $newCellier = Cellier::create($dataValide);
  return redirect(route('cellier.index'));
  // return redirect(route('cellier.show', $newCellier->id)); // si on veut rediriger vers la page du cellier que l'on vient de créer.
  }

  /**
   * Display the specified resource.
   */
  public function show(Cellier $cellier)
  {
    return view('cellier.show', ['cellier' => $cellier]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Cellier $cellier)
  {
    return view('cellier.edit', ['cellier' => $cellier]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Cellier $cellier)
  {
    // $cellier->update([
    //   'nom' => $request->nom,
    // ]);

    // return redirect(route('cellier.show', $cellier->id));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Cellier $cellier)
  {
    $cellier->delete();
    return redirect(route('cellier.index'));
  }
}

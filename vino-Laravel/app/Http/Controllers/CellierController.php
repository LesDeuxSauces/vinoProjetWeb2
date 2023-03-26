<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\CelliersHasBouteilles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class CellierController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $celliers = Cellier::all();
    return response()->json($celliers);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return view('cellier.create');
  }

  public function getCelliersUser()
  {
    $user_id = auth()->user()->id;
    $celliers = Cellier::where('user_id', $user_id)->get();
    return response()->json($celliers);
  }


  public function store(Request $request)
  {

    $user = auth()->user();

    // $dataValide = $request->validate([
    //   'nom' => 'required|string|min:2|max:50',
    // ]);

    $dataValide = Validator::make($request->all(),[
      'nom' => 'required|string|min:2|max:50',
    ]);

    if($dataValide->fails()){

      return response()->json([
        'status'=>422,
        'errors'=>$dataValide->messages()
      ],422);
    } else {

      $cellier = new Cellier;
      $cellier->nom = $request->input('nom');
      $cellier->user_id = $user->id;
      // $cellier->user_id = 1; // pour le moment, j'ai forcé l'id de l'utilisateur à 1
      $cellier->save();
  
      return response()->json(['message' => 'Cellier ' . $cellier->nom . ' crée avec succès', 'cellier' => $cellier]);

    }


    // $dataValide = $request->validate([
    //   'nom' => 'required|string|max:50',
    //   'user_id' => 'required|integer|exists:users,id',
    // ]);

    // $newCellier = Cellier::create($dataValide);

    // return response()->json(['cellier' => $newCellier], 201);
  }



  /**
   * Display the specified resource.
   */
  /**
   * Display the specified resource.
   */
  public function show(Cellier $cellier)
  {
    $bouteilles = $cellier->cellierHasBouteille()->withPivot('quantite')->get()->toArray();

    return response()->json([
      'cellier' => $cellier,
      'bouteilles' => $bouteilles
    ]);
  }



  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Cellier $cellier)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Cellier $cellier)
  {
    $dataValide = $request->validate([
      'nom' => 'required|string|min:2|max:50',
    ]);

    $cellier->nom = $dataValide['nom'];
    $cellier->save();
    return response()->json(['message' => 'Cellier ' . $cellier->nom . ' mis à jour avec succès', 'cellier' => $cellier]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Cellier $cellier)
  {
    // Supprime les entrées associées dans la table celliers_has_bouteilles
    CelliersHasBouteilles::where('cellier_id', $cellier->id)->delete();
    // Supprime le cellier
    $cellier->delete();
    return response()->json(['message' => 'Cellier supprimé avec succès']);
  }


  public function getCelliersSansBouteille()
  {
    $celliers = Cellier::doesntHave('cellierHasBouteille')->get();
    return response()->json($celliers);
  }
}

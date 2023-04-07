<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use Illuminate\Http\Request;
use App\Models\CelliersHasBouteilles;
use Illuminate\Support\Facades\DB;

class CelliersHasBouteillesController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return response()->json(CelliersHasBouteilles::all());
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function updateBouteilleQuantite(Request $request)
  {
    // Récupérer les valeurs des paramètres dans la requête
    $cellier_id = $request->input('cellier_id');
    $bouteille_id = $request->input('bouteille_id');
    $quantite = $request->input('quantite');

    // Rechercher la ligne correspondant à la bouteille et au cellier
    $updatedRows = CelliersHasBouteilles::where('cellier_id', '=', $cellier_id)
        ->where('bouteille_id', '=', $bouteille_id)
        ->update([
            'quantite' => $quantite
        ]);

    // Vérifier si la mise à jour a réussi   
    if ($updatedRows > 0) {
        return response()->json([
            'status' => 200,
            'message' => 'La quantité de bouteilles a été mise à jour'
        ], 200);
    } else {
        return response()->json([
            'status' => 500,
            'message' => 'La mise à jour de la quantité de bouteilles n\'a pas fonctionné'
        ], 500);
    }
  }

  /**
   * Supprime une bouteille d'un cellier
   */
  public function destroy(Request $request)
  {
    // Récupère l'ID du cellier et de la bouteille à supprimer
    $cellier_id = $request->input('cellier_id');
    $bouteille_id = $request->input('bouteille_id');

    // Supprime la bouteille dans la table cellier_has_bouteilles
    $deletedRows = CelliersHasBouteilles::where('cellier_id', '=', $cellier_id)
        ->where('bouteille_id', '=', $bouteille_id)
        ->delete();

    // Vérifie si la suppression a été effectuée avec succès
    if ($deletedRows > 0) {
        return response()->json([
          'status'=> 200,
          'message'=>'la bouteille a été supprimée'
      ],200);
    } else {
        return response()->json([
            'status' => 500,
            'message' => 'La suppression n\'a pas fonctionné'
        ], 500);
    }
  }

  /**
  * Récupère la quantité de bouteilles pour chaque cellier
  */
  public function getQuantiteParCellier()
  {
    // Sélectionne chaque cellier et la somme de toutes les quantités de bouteilles dans ce cellier
    $celliers = Cellier::select('celliers.*', DB::raw('SUM(celliers_has_bouteilles.quantite) as total'))
        ->join('celliers_has_bouteilles', 'celliers.id', '=', 'celliers_has_bouteilles.cellier_id')
        ->groupBy('celliers.id')
        ->get();

    // Retourne les données en JSON
    return response()->json($celliers);
  }
  
}

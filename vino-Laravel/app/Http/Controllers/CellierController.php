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

  /**
   * Récupère tous les celliers de l'utilisateur connecté.
   * @return JsonResponse Retourne une réponse JSON contenant tous les celliers de l'utilisateur connecté.
  */
  public function getCelliersUser()
  {
    // Récupère l'ID de l'utilisateur connecté
    $user_id = auth()->user()->id;
    $celliers = Cellier::where('user_id', $user_id)->get(); // Récupère tous les celliers appartenant à l'utilisateur connecté
    return response()->json($celliers); // Retourne une réponse JSON contenant tous les celliers récupérés
  }


  /**
  * Enregistre un nouveau cellier pour l'utilisateur authentifié
  *
  * @param  Request  $request La requête contenant les données du cellier à créer
  * @return JsonResponse    Retourne une réponse JSON avec le statut, le message et les données du cellier créé, ou les erreurs de validation le cas échéant.
  */
  public function store(Request $request)
  {
    // Récupération de l'utilisateur authentifié
    $user = auth()->user();

    // Validation des données envoyées dans la requête
    $dataValide = Validator::make($request->all(),[
      'nom' => 'required|string|min:2|max:50',
    ]);

    // Si les données sont invalides, retourner les erreurs de validation
    if($dataValide->fails()){

      return response()->json([
        'status'=>422,
        'errors'=>$dataValide->messages()
      ],422);
    } else {

      // Création d'un nouveau cellier avec les données fournies
      $cellier = new Cellier;
      $cellier->nom = $request->input('nom');
      $cellier->user_id = $user->id;
      $cellier->save();
  
      // Retourner une réponse JSON avec les données du cellier créé
      return response()->json(['message' => 'Cellier ' . $cellier->nom . ' crée avec succès', 'cellier' => $cellier]);

    }
  }


  /**
 * Affiche la ressource spécifiée.
 * @param  Cellier  $cellier Le cellier à afficher.
 * @return JsonResponse Retourne une réponse JSON avec le cellier et les bouteilles associées.
 */
  public function show(Cellier $cellier)
  {
    // Récupérer toutes les bouteilles du cellier avec les quantités associées.
    $bouteilles = $cellier->cellierHasBouteille()->withPivot('quantite')->get()->toArray();

    // Retourne une réponse JSON avec les informations du cellier et les bouteilles associées.
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
   * Met à jour la ressource spécifiée dans le stockage.
   * @param  Request  $request La requête contenant les informations à mettre à jour.
   * @param  Cellier  $cellier Le cellier à mettre à jour.
   * @return JsonResponse Retourne une réponse JSON avec le cellier mis à jour.
   */
  public function update(Request $request, Cellier $cellier)
  {

    // Vérifier si les données fournies sont valides.
    $dataValide = Validator::make($request->all(),[
      'nom' => 'required|string|min:2|max:50',
    ]);

    if($dataValide->fails()){
      // Si les données ne sont pas valides, retourne une réponse JSON avec les erreurs.
      return response()->json([
        'status'=>422,
        'errors'=>$dataValide->messages()
      ],422);
    } else {

      // Si les données sont valides, mettre à jour le nom du cellier et retourner une réponse JSON avec le cellier mis à jour.
      $cellier->update([
        'nom'=> $request->nom
      ]);

      return response()->json(['message' => 'Cellier ' . $cellier->nom . ' mis à jour avec succès', 'cellier' => $cellier]);
    }
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


  /**
  * Récupère la liste des celliers qui ne contiennent pas de bouteilles.
  * @return JsonResponse Retourne une réponse JSON contenant la liste des celliers qui ne contiennent pas de bouteilles.
  */
  public function getCelliersSansBouteille()
  {
    // Récupère tous les celliers qui n'ont pas de relation avec la table cellier_has_bouteille.
    $celliers = Cellier::doesntHave('cellierHasBouteille')->get();
    // Retourne une réponse JSON avec la liste des celliers.
    return response()->json($celliers);
  }
}

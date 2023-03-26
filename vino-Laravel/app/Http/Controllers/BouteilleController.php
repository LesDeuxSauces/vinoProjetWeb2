<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use App\Http\Resources\BouteilleResource;
use App\Http\Resources\BouteilleCollection;
use App\Models\Cellier;
use App\Models\Pays;
use App\Models\Types;
use Illuminate\Support\Facades\DB;

use App\Models\CelliersHasBouteilles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class BouteilleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $bouteille = Bouteille::all();
    if ($bouteille->count() > 0) {

      return response()->json([
        'status' => 200,
        'bouteilles' => $bouteille
      ], 200);
    } else {
      return response()->json([
        'status' => 200,
        'bouteilles' => 'aucune bouteille n\'a été ajoutée'
      ], 200);
    }

    //return new BouteilleCollection(Bouteille::all());
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {


    $validation = Validator::make($request->all(), [

      'nom' => 'required',
      // 'format' => 'numeric',
      // 'prix' => 'numeric',
      // 'annee' => 'numeric',
      // 'code_saq' => '',
      // 'url_saq' => 'min:2',
      // 'url_img' => 'min:2',
      // 'pays' => 'required|numeric',
      'type_id' => 'required',
      'quantite' => 'required',
      'cellier_id' => 'required',

    ]);
    // 422, input error dans la validation 
    if ($validation->fails()) {

      return response()->json([
        'status' => 422,
        'errors' => $validation->messages()
      ], 422);
    } else {

      if ($request->code_saq != '') {

        $cellierHasBouteille = CelliersHasBouteilles::create([
          'quantite' => $request->quantite,
          'bouteille_id' => $request->id,
          'cellier_id' => $request->cellier_id
        ]);

        if ($cellierHasBouteille) {
          return response()->json([
            "status" => 200,
            'message' => 'la bouteille a été ajoutée'

          ], 200);
        } else {
          return response()->json([
            'status' => 500,
            'message' => 'l\'ajout n\'a pas fonctionné'
          ], 500);
        }
      } else {

        $bouteille = new Bouteille;
        $bouteille = Bouteille::create([
          'nom' => $request->nom,
          'format' => $request->format,
          'prix' => $request->prix,
          'annee' => $request->annee,
          'code_saq' => $request->code_saq,
          'url_saq' => $request->url_saq,
          'url_img' => $request->url_img,
          'pays' => $request->pays,
          'type_id' => $request->type_id,
        ]);

        $cellierHasBouteille = CelliersHasBouteilles::create([
          'quantite' => $request->quantite,
          'bouteille_id' => $bouteille->id,
          'cellier_id' => $request->cellier_id
        ]);

        if ($bouteille) {
          return response()->json([
            'status' => 200,
            'message' => 'la bouteille a été ajoutée'
          ], 200);
        } else {
          return response()->json([
            'status' => 500,
            'message' => 'l\'ajout n\'a pas fonctionné'
          ], 500);
        }
      }
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Bouteille $bouteille)
  {
    return new BouteilleResource($bouteille);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Bouteille $bouteille)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Bouteille $bouteille)
  {

    // ajout de condition afin de ne pas pouvoir forcer la moidification d'une bouteille de la SAQ
    if ($bouteille->code_saq) {
      return response()->json([
        'status' => 400,
        'message' => 'La modification de la bouteille avec un code_saq existant n\'est pas autorisée'
      ], 400);
    }

    $bouteille->update([
      'nom' => $request->nom,
      'format' => $request->format,
      'prix' => $request->prix,
      'annee' => $request->annee,
      'code_saq' => $request->code_saq,
      'url_saq' => $request->url_saq,
      'url_img' => $request->url_img,
      'pays' => $request->pays,
      'type_id' => $request->type_id,
    ]);

    $cellierHasBouteille = CelliersHasBouteilles::where('bouteille_id', $bouteille->id)
      ->where('cellier_id', $request->cellier_id)
      ->first();

    if ($cellierHasBouteille) {
      $cellierHasBouteille->update([
        'quantite' => $request->quantite,
      ]);
    }

    return response()->json([
      'status' => 200,
      'message' => 'La bouteille a été mise à jour avec succès'
    ], 200);
  }



  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Bouteille $bouteille)
  {
    //
  }

  /**
   * avoir les pays de la base de donnée
   */
  public function afficherPays()
  {
    $pays = Pays::all();
    return response()->json(['pays' => $pays]);
  }

  /**
   * avoir les types du vin de la base de donnée
   */
  public function afficherTypes()
  {
    $types = Types::all();
    return response()->json(['types' => $types]);
  }


  /**
   * avoir les donnes pour scraping
   */
  public function ajouterBouteilleSAQ(Request $request)
  {
    $type_id = '';
    switch ($request->type) {
      case 'rouge':
        $type_id = 1;
        break;
      case 'blanc':
        $type_id = 2;
        break;
      case 'rosé':
        $type_id = 3;
        break;

      default:
        $type_id = '';
        break;
    }

    $bouteilleSAQ = new Bouteille;
    $bouteilleSAQ = Bouteille::create([
      'nom' => $request->nom,
      'format' => $request->format,
      'prix' => $request->prix,
      'annee' => $request->annee,
      'code_saq' => $request->code_saq,
      'url_saq' => $request->url_saq,
      'url_img' => $request->url_img,
      'pays' => $request->pays,
      'type_id' => $type_id,
    ]);

    if ($bouteilleSAQ) {
      return response()->json([
        'status' => 200,
        'message' => 'la bouteille a été ajoutée',
        'bouteilleSAQ' => $bouteilleSAQ
      ], 200);
    } else {
      return response()->json([
        'status' => 500,
        'message' => 'l\'ajout n\'a pas fonctionné'
      ], 500);
    }
  }

  /**
   * avoir uniquement les bouteilles de la SAQ
   */
  public function bouteillesSAQ()
  {
    $bouteillesSAQ = Bouteille::whereNotNull('code_saq')->get();
    return response()->json(['bouteillessaq' => $bouteillesSAQ]);
  }
}


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

use Symfony\Component\Process\Exception\ProcessFailedException;
// use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Process;
use Symfony\Component\Console\Output\Output;

class BouteilleController extends Controller
{
  /**
   * Display a listing of the resource.
   * 
   * Récupère toutes les bouteilles présentes dans la base de données.
   * @return JsonResponse Retourne une réponse JSON avec le statut et les informations des bouteilles, ou un message indiquant qu'aucune bouteille n'a été ajoutée.
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
   * 
   * Ajoute une nouvelle bouteille à un cellier spécifique en fonction des données fournies dans la requête.
   * @param Request $request La requête contenant les informations sur la bouteille à ajouter et le cellier cible.
   * @return JsonResponse Retourne une réponse JSON avec le statut, le message et, si réussi, les informations de la bouteille ajoutée.
   */

  public function store(Request $request)
  {


    $validation = Validator::make($request->all(), [

      'nom' => 'required',
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
   * Met à jour les informations d'une bouteille dans la base de données en fonction des données fournies dans la requête.
   * La mise à jour des bouteilles ayant un code_saq existant n'est pas autorisée.
   *
   * @param Request $request La requête contenant les informations à mettre à jour pour la bouteille.
   * @param Bouteille $bouteille L'instance de la bouteille à mettre à jour.
   * @return JsonResponse Retourne une réponse JSON avec le statut et le message de la mise à jour.
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

    $validation = Validator::make($request->all(), [
      'nom' => 'required',
    ]);
    if ($validation->fails()) {
      return response()->json([

        'status' => 422,
        'errors' => $validation->messages(),
        'botella' => $bouteille,
        'request' => $request
      ], 422);
    } else {

      $bouteille->update([
        'nom' => $request->nom,
        'format' => $request->format,
        'prix' => $request->prix,
        'annee' => $request->annee,

        'pays' => $request->pays,
        'type_id' => $request->type_id,
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
   * Récupère toutes les types présentes dans la base de données.
   * @return JsonResponse Retourne une réponse JSON contenant la liste des types.
   */
  public function afficherTypes()
  {
    $types = Types::all();
    return response()->json(['types' => $types]);
  }


  /**
   * Ajoute une bouteille de la SAQ en fonction des informations fournies dans la requête (scraping).
   *
   * @param Request $request La requête contenant les informations sur la bouteille à ajouter.
   * @return JsonResponse Retourne une réponse JSON avec le statut, le message et, si réussi, les informations de la bouteille ajoutée.
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
   * Récupère toutes les bouteilles de la SAQ présentes dans la base de données.
   * @return JsonResponse Retourne une réponse JSON contenant la liste des bouteilles de la SAQ.
   */
  public function bouteillesSAQ()
  {
    $bouteillesSAQ = Bouteille::whereNotNull('code_saq')->get();
    return response()->json(['bouteillessaq' => $bouteillesSAQ]);
  }

  /**
   * Fait un appel pour exécuter un scraping qui permet d'obtenir les dernières bouteilles de la SAQ
   * @return JsonResponse Retourne une réponse JSON contenant le résultat du processus de scraping (dernieres bouteilles de la SAQ)
   */
  public function misaJourSAQDerniere()
  {

    $path = public_path('scraping');
    // exécuter le scrip trouvé dans le dossier public
    $process =  Process::path($path)->timeout(60)->run('node scrapingderniere.js')->output();
    $resultat = $process;
    return response()->json($resultat);
  }

  /**
   * Fait un appel pour exécuter un scraping qui permet d'obtenir toutes les bouteilles de la SAQ
   * @return JsonResponse Retourne une réponse JSON contenant le résultat du processus de scraping (toutes les bouteilles de la SAQ)
   */
  public function misaJourSAQComplete()
  {

    $path = public_path('scraping');
    // exécuter le scrip trouvé dans le dossier public
    $process =  Process::path($path)->timeout(1000)->run('node scrapingcomplete.js')->output();
    $resultat = $process;
    return response()->json($resultat);
  }
}

<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\CelliersHasBouteilles;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{

    /**
     * Afficher une liste de ressources.
     */
    public function index()
    {
        // Récupérer l'identifiant de l'utilisateur connecté
        $user_id = auth()->user()->id;
        // Récupérer les informations de l'utilisateur
        $user = User::where('id', $user_id)->get();
        // Retourner les informations de l'utilisateur en format JSON
        return response()->json($user);
    }

    /**
     * Afficher une liste de ressources.
     */
    public function getUserBouteilles()
    {
        // Récupérer l'identifiant de l'utilisateur connecté
        $user_id = auth()->user()->id;
        // Récupérer les identifiants des celliers de l'utilisateur connecté
        $celliers = Cellier::where('user_id', $user_id)->pluck('id')->toArray();
        // Initialiser une collection de bouteilles
        $bouteilles = collect();
        // Pour chaque cellier de l'utilisateur, récupérer les bouteilles qui ont une quantité supérieure à 0 et les ajouter à la collection de bouteilles
        foreach ($celliers as $cellier) {
            $bouteillesInCellier = CelliersHasBouteilles::join('bouteilles', 'celliers_has_bouteilles.bouteille_id', '=', 'bouteilles.id')
                ->where('celliers_has_bouteilles.cellier_id', $cellier)
                ->where('celliers_has_bouteilles.quantite', ">", 0)
                ->select('bouteilles.*')
                ->get();
            $bouteilles = $bouteilles->concat($bouteillesInCellier);
        }
        // Retourner la collection de bouteilles en format JSON
        return response()->json($bouteilles);
    }

    /**
     * Afficher une liste de ressources.
     */
    public function getUserArchives()
    {
        // Récupérer l'identifiant de l'utilisateur connecté
        $user_id = auth()->user()->id;
        // Récupérer les identifiants des celliers de l'utilisateur connecté
        $celliers = Cellier::where('user_id', $user_id)->pluck('id')->toArray();
        // Initialiser une collection de bouteilles
        $bouteilles = collect();
        // Pour chaque cellier de l'utilisateur, récupérer les bouteilles qui ont une quantité égale à 0 et les ajouter à la collection de bouteilles
        foreach ($celliers as $cellier) {
            $bouteillesInCellier = CelliersHasBouteilles::join('bouteilles', 'celliers_has_bouteilles.bouteille_id', '=', 'bouteilles.id')
                ->where('celliers_has_bouteilles.cellier_id', $cellier)
                ->where('celliers_has_bouteilles.quantite', 0)
                ->select('bouteilles.*')
                ->get();
            $bouteilles = $bouteilles->concat($bouteillesInCellier);
        }
        // Retourner la collection de bouteilles en format JSON
        return response()->json($bouteilles);
    }

    /**
    * Afficher une liste de ressources.
    */
    public function UserCelliersQuantite()
    {
        // Récupérer l'identifiant de l'utilisateur connecté
        $user_id = auth()->user()->id;
        // Récupérer les celliers de l'utilisateur connecté
        $celliers = Cellier::where('user_id', $user_id)->get();

        // Calculer le total de la quantité de bouteilles dans chaque cellier
        foreach ($celliers as $cellier) {
            $totalQuantite = CelliersHasBouteilles::where('cellier_id', $cellier->id)->sum('quantite');
            $cellier->totalQuantite = $totalQuantite;
        }

        // Retourner la liste des celliers de l'utilisateur connecté avec leur quantité totale de bouteilles
        return response()->json($celliers);
    }

    
    /**
     * Mettre à jour la ressource spécifiée dans le stockage.
     */
    public function update(Request $request)
    {
        // Valider les données de la requête
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'password' => 'required|string|min:6',
        ],[
            'name.required' => 'Le nom est obligatoire',
            'email.required' => 'Le courriel est obligatoire',
            'email.regex' => 'Le courriel doit être une adresse email valide',
            'password.required' => 'Le mot de passe est obligatoire',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
        ]);

        // Retourner les erreurs de validation s'il y en a
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            // Trouver l'utilisateur à mettre à jour dans la base de données
            $user = User::find($request->user_id);
            // Mettre à jour les informations de l'utilisateur
            $user->update([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
    
            // Retourner la réponse avec l'utilisateur mis à jour et un message de confirmation
            return response()->json([
                'user' => $user,
                'message' => 'Modification effectuée'
            ], 201);
        }
    }

    /**
     * Supprimer la ressource spécifiée du stockage.
     */
    public function destroy(User $user)
    {
        // Supprimer l'utilisateur spécifié de la base de données
        $user->delete();

        // Retourne une réponse avec un message de confirmation
        return response()->json(['message' => 'Utilisateur supprimé'], 200);
    }
}

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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of the resource.
     */
    public function getUserBouteilles()
    {
        $user_id = auth()->user()->id;
        $celliers = Cellier::where('user_id', $user_id)->pluck('id')->toArray();
        $bouteilles = collect();
        foreach ($celliers as $cellier) {
            $bouteillesInCellier = CelliersHasBouteilles::join('bouteilles', 'celliers_has_bouteilles.bouteille_id', '=', 'bouteilles.id')
                ->where('celliers_has_bouteilles.cellier_id', $cellier)
                ->select('bouteilles.*')
                ->get();
            $bouteilles = $bouteilles->concat($bouteillesInCellier);
        }
        return response()->json($bouteilles);
    }

    /**
     * Display a listing of the resource.
     */
    public function getUserArchives()
    {
        $user_id = auth()->user()->id;
        $celliers = Cellier::where('user_id', $user_id)->pluck('id')->toArray();
        $bouteilles = collect();
        foreach ($celliers as $cellier) {
            $bouteillesInCellier = CelliersHasBouteilles::join('bouteilles', 'celliers_has_bouteilles.bouteille_id', '=', 'bouteilles.id')
                ->where('celliers_has_bouteilles.cellier_id', $cellier)
                ->where('celliers_has_bouteilles.quantite', 0)
                ->select('bouteilles.*')
                ->get();
            $bouteilles = $bouteilles->concat($bouteillesInCellier);
        }
        return response()->json($bouteilles);
    }

    /**
     * Display a listing of the resource.
     */
    public function UserCelliersQuantite()
    {
        $user_id = auth()->user()->id;
        $celliers = Cellier::where('user_id', $user_id)->get();

        foreach ($celliers as $cellier) {
            $totalQuantite = CelliersHasBouteilles::where('cellier_id', $cellier->id)->sum('quantite');
            $cellier->totalQuantite = $totalQuantite;
        }

        return response()->json($celliers);
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
            'password' => 'required|string|min:6',
        ],[
            'name.required' => 'Le nom est obligatoire',
            'email.required' => 'Le courriel est obligatoire',
            'email.regex' => 'Le courriel doit être une adresse email valide',
            'email.unique' => 'Ce courriel est déjà utilisé',
            'password.required' => 'Le mot de passe est obligatoire',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::find($request->user_id);
        // $user->update($request->all());
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'Modification effectuée'
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé'], 200);
    }
}

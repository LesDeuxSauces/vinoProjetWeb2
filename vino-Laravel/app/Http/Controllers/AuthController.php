<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        // Valider les entrées de l'utilisateur
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);

        // Créer un nouvel utilisateur avec les entrées validées
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password'])
        ]);

        return response()->json([
            'user' => $user
        ], Response::HTTP_CREATED);

    }

    public function authentification(Request $request)
    {
        // Valider les entrées de l'utilisateur
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string'
        ]);

        // Trouver l'utilisateur correspondant à l'adresse email fournie
        $user = User::where('email', $validatedData['email'])->first();

        // Vérifier si l'utilisateur existe et si le mot de passe fourni correspond
        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            // Retourner une réponse d'erreur si l'authentification échoue
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        // Générer un token pour l'utilisateur
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retourner la réponse avec le token et les détails de l'utilisateur authentifié
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
}

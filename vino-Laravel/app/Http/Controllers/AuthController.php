<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;



use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|unique:users|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
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

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'Utilisateur créer'
        ], 201);
    }

    public function authentification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/|max:255',
            'password' => 'required|string|min:6',
        ],[
            'email.required' => 'Le courriel est obligatoire',
            'email.regex' => 'Le courriel doit être une adresse email valide',
            'password.required' => 'Le mot de passe est obligatoire',
            'password.password' => 'Mot de passe invalide',
            'password.min' => 'Le mot de passe doit faire au moins 6 caractères'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Trouver l'utilisateur correspondant à l'adresse email fournie
        $user = User::where('email', $request->input('email'))->first();

        // Vérifier si l'utilisateur existe et si le mot de passe fourni correspond
        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            // Retourner une réponse d'erreur si l'authentification échoue
            return response()->json(['errors'=>['message' => ["Les informations d'authentification fournies ne sont pas valides"]]], Response::HTTP_UNAUTHORIZED);
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

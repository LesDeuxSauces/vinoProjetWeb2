<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){

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
    
        // Générer un token pour l'utilisateur
        $token = $user->createToken('auth_token')->plainTextToken;
    
        // Retourner la réponse avec le token et les détails de l'utilisateur créé
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], Response::HTTP_CREATED);

        // $response = [
        //     'user'=>$user,
        //     'token'=> $token
        // ];
        // return response($response, 201);
    }
    
}

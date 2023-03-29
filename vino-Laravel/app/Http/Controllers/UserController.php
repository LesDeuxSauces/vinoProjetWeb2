<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
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
        $user= auth()->user();
        $user_id = auth()->user()->id;
        $celliers = Cellier::where('user_id', $user_id)->get();
        return response()->json([$user, $celliers]);

    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // $user = User::find($user->id);
        $user->update($request->all());

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

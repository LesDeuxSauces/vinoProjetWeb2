<?php

namespace App\Http\Controllers;

use App\Models\Bouteille;
use App\Http\Resources\BouteilleResource;
use App\Http\Resources\BouteilleCollection;
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
        if($bouteille->count()>0){

            return response()->json([
                'status'=> 200,
                'bouteilles' => $bouteille 
            ],200); 
        } else {
            return response()->json([
                'status'=> 200,
                'bouteilles' => 'aucune bouteille n\'a été ajoutée' 
            ],200); 
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
       $validation = Validator::make($request->all(),[
        
        'nom' => 'required',
        'format' => 'numeric' ,
        'prix' => 'numeric|between:0,99.99',
        'description' => 'min:2',
        'annee' => 'numeric' ,
        'codeSaq' => 'numeric',
        'url_saq' => 'min:2',
        'url_img' => 'min:2',
        'pays_id' => 'required|numeric',
        'type_id' => 'required|numeric',
       ]);
       // 422, input error
       if ($validation->fails()){

        return response()->json([
            'status'=> 422,
            'errors'=> $validation->messages()
        ],422);
       } else {
            $bouteille = Bouteille::create([
                'nom' => $request->nom,
                'format' => $request->format ,
                'prix' => $request->prix ,
                'description' => $request->description,
                'annee' => $request->annee,
                'code_saq' => $request->code_saq,
                'url_saq' => $request->url_saq,
                'url_img' => $request->url_img,
                'pays_id' => $request->pays_id,
                'type_id' => $request->type_id,
            ]);

            if($bouteille){
                return response()->json([
                    'status'=> 200,
                    'message'=>'la bouteille a été ajoutée'
                ],200);
            } else {
                return response()->json([
                    'status'=> 500,
                    'message'=>'l\'ajout n\'a pas fonctionné'
                ],500);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bouteille $bouteille)
    {
        //
    }
}

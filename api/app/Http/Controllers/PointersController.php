<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\PointService;

class PointersController extends Controller
{

    private $pointService;

    public function __construct(PointService $pointService)
    {
        $this->pointService = $pointService;
    }

    public function index(Request $request, Response $response, $id)
    {

        $pointers = $this->pointService->getPointers($id);
        
        return response()->json([
            'status'    => 1,
            'result'    => $pointers,
            'message'   => 'Lista dos pontos'
        ], 200);

    }



    public function store(Request $request, Response $response)
    {
        
        try{
            $point = $this->pointService->savePointers($request->all());

            if(!$point){
                return response()->json([
                    'status'    => '0',
                    'result'    => null,
                    'message'   => 'Erro ao cadastrar ponto'
                ]);
            }

            $images = $this->pointService->uploadImage($request, $point['id']);
            return response()->json([
                'status'    => '1',
                'result'    => $point,
                'message'   => 'cadastrado com sucesso!'
            ], 201);
            
        } catch(Excepetion $e){
            return response()->json([
                'status'    => '2',
                'result'    => '',
                'message'   => $e->getMessage()
            ]);
        }

    }

    public function show(Request $request, Response $response, $id)
    {
        $point = $this->pointService->getPoint($id);

        if(!$point){
            return response()->json([
                'status'    => 0,
                'result'    => '',
                'message'   => 'Ponto não encontrado'
            ]);
        }

        return response()->json([
            'status'    => 1,
            'result'    => $point,
            'message'   => 'Ponto encontrado com sucesso!'
        ], 200);
    }
    //
}

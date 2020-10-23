<?php

namespace App\Http\Controllers;

use App\Services\PointService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SegmentController extends Controller
{

    private $pointService;

    public function __construct(PointService $pointService)
    {
        $this->pointService = $pointService;
    }

    public function index(Request $request, Response $response)
    {
        $segments = $this->pointService->segmentForPointers();
        if(!$segments){
            return response()->json([
                'status'    => 0,
                'result'    => [],
                'message'   => 'Não existe segmentos cadastrados'
            ]);
        }

        return response()->json([
            'status'    => 1,
            'result'    => $segments,
            'message'   => 'Lista dos segmentos'
        ]);
    }
}

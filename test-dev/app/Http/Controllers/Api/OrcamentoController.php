<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrcamentoRequest;
use App\Http\Resources\OrcamentoResource;
use App\Models\Orcamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrcamentoController extends Controller
{
    public function index()
    {
        $orcamentos = Orcamento::paginate();
        return OrcamentoResource::collection($orcamentos);
    }

    public function show($id)
    {
        $orcamento = Orcamento::findOrFail($id);
        return new OrcamentoResource($orcamento);
    }

    public function store(StoreOrcamentoRequest $request)
    {
        $orcamento = Orcamento::create($request->validated());

        return response()->json($orcamento, 201);
    }

    public function destroy($id)
    {
        Orcamento::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

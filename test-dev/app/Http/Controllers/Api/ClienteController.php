<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::paginate();
        return ClienteResource::collection($clientes);
    }

    public function show($id)
    {
        $cliente = Cliente::findOrFail($id);
        return new ClienteResource($cliente);
    }

    public function store(StoreClienteRequest $request)
    {
        $cliente = Cliente::create($request->validated());

        return response()->json($cliente, 201);
    }

    public function destroy($id)
    {
        Cliente::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}

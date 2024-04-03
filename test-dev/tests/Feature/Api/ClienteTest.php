<?php

namespace Tests\Feature\Api;

use App\Models\Cliente;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ClienteTest extends TestCase
{
    /**
     * Verifica se o retorno da listagem de cliente é 200 OK.
     */
    public function test_list_cliente_200_ok(): void
    {
        $response = $this->get('http://nginx/api/cliente');

        $response->assertStatus(200);
    }

    /**
     * Verifica se o retorno para adicionar cliente é 201 CREATED.
     */
    public function test_create_cliente_201_created(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $responseCreateCliente->assertStatus(201);

        $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));
    }

    /**
     * Verifica se a listagem de clientes retorna um array.
     */
    public function test_get_clientes_returns_array(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $response = $this->getJson('http://nginx/api/cliente');

        $response->assertJsonIsObject()->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'nome',
                    'email',
                    'telefone',
                    'logradouro',
                    'numero',
                    'complemento',
                    'bairro',
                    'cidade',
                    'cep'
                ]
            ]
        ]);

        $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));
    }

    /**
     * Verifica se a listagem de clientes retorna um array.
     */
    public function test_delete_client_return_204_no_content(): void
    {
        $responseCreateCliente = $this->postJson('http://nginx/api/cliente', [
            "nome" => "João",
            "email" => "joao@gmail.com",
            "telefone" => "1112345678",
            "logradouro" => "Rua do João",
            "numero" => 123456,
            "complemento" => "Casa do João",
            "bairro" => "Bairro do João",
            "cidade" => "Cidade do João",
            "cep" => "12345-123"
        ]);

        $response = $this->delete('http://nginx/api/cliente/' . $responseCreateCliente->json('id'));

        $response->assertStatus(204);
    }
}

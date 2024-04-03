<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreClienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:cliente',
            'telefone' => 'required|string|min:8',
            'logradouro' => 'required|string|min:1',
            'numero' => 'nullable',
            'complemento' => 'nullable',
            'bairro' => 'required|string|min:1',
            'cidade' => 'required|string|min:1',
            'cep' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser uma string.',
            'nome.max' => 'O campo nome deve ter no máximo 255 caracteres.',
            'email.required' => 'O campo email é obrigatório.',
            'email.string' => 'O campo email deve ser uma string.',
            'email.email' => 'O campo email deve ser um email válido.',
            'email.max' => 'O campo email deve ter no máximo 255 caracteres.',
            'email.unique' => 'O email informado já está em uso.',
            'telefone.required' => 'O campo telefone é obrigatório.',
            'telefone.string' => 'O campo telefone deve ser uma string.',
            'telefone.min' => 'O campo telefone deve ter no mínimo 8 caracteres.',
            'logradouro.required' => 'O campo logradouro é obrigatório.',
            'logradouro.string' => 'O campo logradouro deve ser uma string.',
            'logradouro.min' => 'O campo logradouro deve ter no mínimo 1 caractere.',
            'bairro.required' => 'O campo bairro é obrigatório.',
            'bairro.string' => 'O campo bairro deve ser uma string.',
            'bairro.min' => 'O campo bairro deve ter no mínimo 1 caractere.',
            'cidade.required' => 'O campo cidade é obrigatório.',
            'cidade.string' => 'O campo cidade deve ser uma string.',
            'cidade.min' => 'O campo cidade deve ter no mínimo 1 caractere.',
            'cep.required' => 'O campo cep é obrigatório.',
            'cep.string' => 'O campo cep deve ser uma string.',
            'cep.min' => 'O campo cep deve ter no mínimo 8 caracteres.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors(); // Here is your array of errors
        throw new HttpResponseException(response()->json(['error' => $errors], 400));
    }
}

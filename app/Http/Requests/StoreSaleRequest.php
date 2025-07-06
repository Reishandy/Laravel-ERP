<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_number' => ['required', 'string', 'exists:customers,customer_number'],
            'product_number' => ['required', 'string', 'exists:products,product_number'],
            'quantity' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'string', 'in:pending,processing,completed'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_number.required' => 'The customer field is required.',
            'customer_number.string' => 'The customer must be a string.',
            'customer_number.exists' => 'The selected customer is invalid.',

            'product_number.required' => 'The product field is required.',
            'product_number.string' => 'The product must be a string.',
            'product_number.exists' => 'The selected product is invalid.',
        ];
    }
}

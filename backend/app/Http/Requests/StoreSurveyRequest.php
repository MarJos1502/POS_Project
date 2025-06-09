<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Set to true to allow any user to submit the survey
        // You might add authorization logic here if surveys are linked to authenticated users
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
            'transaction_id' => ['required', 'string', 'max:255', 'unique:surveys,transaction_id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comments' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'transaction_id.unique' => 'This transaction has already been surveyed.',
            'rating.required' => 'Please select a rating.',
            'rating.min' => 'Rating must be at least 1.',
            'rating.max' => 'Rating cannot be more than 5.',
        ];
    }
}
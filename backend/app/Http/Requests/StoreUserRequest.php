<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'name' => 'required|string|unique:users|max:255',
            'email' => 'required|email|unique:users|max:255',
            'full_name' => 'required|string|max:255',
            'role' => 'required|in:ADMIN,EMPLOYEE',
            'gender' => 'required|in:MALE,FEMALE,OTHER',
            'mobile' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'password' => [
                'required',
                Password::min(8)->letters()->symbols(),
            ]
        ];
    }
}

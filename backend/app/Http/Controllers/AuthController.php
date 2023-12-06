<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Firebase\JWT\JWT;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !password_verify($credentials['password'], $user->password)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        $token = JWT::encode(['id' => $user->id], 'Plant Website', 'HS256');

        return response()->json(['token' => $token], 200);
    }
}

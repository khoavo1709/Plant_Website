<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Throwable;

class Authen
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        try {
            $decoded = JWT::decode($token, new Key('Plant Website', 'HS256'));

            $userId = $decoded->id ?? null;
            $user = User::find($userId);

            if ($user === null) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            $request->merge(['user' => $user]);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRequired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user;
        if ($user->role !== "ADMIN") {
            return response()->json(['message' => 'Admin Required'], 401);
        }
        return $next($request);
    }
}

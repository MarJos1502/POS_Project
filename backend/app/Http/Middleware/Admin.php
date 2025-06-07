<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);

        if(Auth::user()->usertype != 'admin') {
            // If the user is not an admin, redirect them to the dashboard or another page
            return redirect('/')->with('error', 'You do not have admin access.');
        }
        if(Auth::user()->usertype != 'cashier') {
            // If the user is not an admin, redirect them to the dashboard or another page
            return redirect('/')->with('error', 'You do not have admin access.');
        }
    }
}

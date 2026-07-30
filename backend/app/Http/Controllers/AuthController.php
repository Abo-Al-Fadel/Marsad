<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register a new user, log them in, and return an API token
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully.',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    // Authenticate user with email/password and return an API token
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Only stateful (same-origin browser) requests carry a session. Token-only
        // clients reach this route without one, so guard before touching it.
        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    // Revoke the current API token and clear the session
    public function logout(Request $request)
    {
        // When the request is authenticated by session rather than by a Bearer
        // token, currentAccessToken() is a TransientToken, which has no delete().
        // Revoking every token also stops the client's stored token from
        // outliving the logout it can no longer be identified from.
        if ($user = $request->user()) {
            $user->tokens()->delete();
        }

        // Clearing the web session only applies to stateful requests (see login).
        if ($request->hasSession()) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    // Return the currently authenticated user's data
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}

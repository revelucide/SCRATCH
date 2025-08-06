<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        User::create($data);

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully.',

        ]);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials.',
            ]);
        }
        $user = Auth::user();

        $token = Auth::user()->createToken('myToken')->plainTextToken;


        return response()->json([
            'status' => true,
            'message' => 'Login successful.',
            'token' => $token,
        ]);
    }

    /**
     * Get the authenticated user's profile.
     */
    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            'status' => true,
            'message' => 'User profile retrieved successfully.',
            'user' => $user,
        ]);
    }

    /** 
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully.',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Password atau username tidak tepat'
            ], 422);
        }
        $user = $request->user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}

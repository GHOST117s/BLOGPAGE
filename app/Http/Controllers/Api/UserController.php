<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{

    public function register(Request $request){
       
        $validateData = $request->validate([
            'name' => 'required',
            'email' => ['required','email'],
            'password' => ['min:8','confirmed'],   
            'picture' =>['file','mimes:jpeg,png,gif','max:3072'],    

            ]);
            //store the picture
            $path =null;
            
            if($request->hasFile('picture')){
                $path = $request->file('picture')->storePublicly('pictures');
            }


        $validateData['password'] = bcrypt($request->password);    

        $user = User::create($validateData);      

        $token = $user->createToken('auth_token')->accessToken; 

        return response()->json(
            [
                'token' => $token,
                'user' => $user,
                'message' =>"User created successfully",
                'status' => 1
            ]
            );
          
           
    }

    public function login(Request $request)
    {
        $validateData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);
        
        $user = User::where('email', $validateData['email'])->first();
        
        if (!$user) {
            return response()->json(['message' => 'Email not found', 'status' => 0]);
        }
        
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password', 'status' => 0]);
        }
        
        $token = $user->createToken('auth_token')->accessToken;

        return response()->json([
            'token' => $token,
            'user' => $user,        
            'message' => "Login successful post sucessfully ",
            'status' => 1
        ]);
    }
    
    public function logout(Request $request)
    {
        $user = Auth::user();
        $accessToken = $user->token();
        $accessToken->delete();
        
        return response()->json([
            'message' => 'Successfully logged out',
            'status' => 1
        ]);
    }

    public function getUser($id){
        $user = User::find($id);
        if(is_null($user)){
            return response()->json(
                [
                  
                    'user' => null,
                    'message' =>"User Not found",
                    'status' => 0
                ]
                );
        }else{
            return response()->json(
                [
                  
                    'user' => $user,
                    'message' =>"User found",
                    'status' => 1
                ]
                );
        }
    }

    //
}

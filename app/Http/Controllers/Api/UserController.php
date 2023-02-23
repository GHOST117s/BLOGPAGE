<?php
namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Categories;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;

class UserController extends Controller
{
    public function register(Request $request){
       
        $validateData = $request->validate([
            'name' => 'required',
            'email' => ['required','email','unique:users'],
            'password' => ['min:8','confirmed'],   
            'picture' =>['file','mimes:jpeg,png,gif','max:3072'],    
        ], [
            'email.unique' => 'That email address is already taken.',
            'password.min' => 'Your password must be at least 8 characters long.',
            'password.confirmed' => 'Your passwords do not match.',
        ]);
        
            //store the picture
            $path =null;
            
            if($request->hasFile('picture')){
                $path = $request->file('picture')->storePublicly('pictures' );
            }
            
            
        $validateData['password'] = bcrypt($request->password);    
        // $user = User::create($validateData); 
            
        $user = User::create([
            'name' => $validateData['name'],
            'email' => $validateData['email'],
            'password' => $validateData['password'],
            'picture' => $path,
        ]);       
        $token = $user->createToken('auth_token')->accessToken; 


        // send email with details
        $mailData = [
            'name' => $user->name,
            'email' => $user->email,
            
        ];


        Mail::to($user->email)->send(new WelcomeMail($mailData));
        // $user->notify(new WelcomeEmail());
       
       
        
      

        // dd($path);
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
            'message' => "Login successful  ",
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
    public function getUser() {
        $user = auth()->user();
        $posts = Post::with('comments.user','user')->get();
        $categories = Categories::with('post','user')->get();
    
        if (is_null($user)) {
            return response()->json([
                'user' => null,
                'message' => "User not found",
                'status' => 0
            ]);
        } else {
            return response()->json([
                'user' => $user,
                'posts' => $posts,
                'categories' => $categories,
                'message' => "User found",
                'status' => 1
            ]);
        }
    }
    
    // for update user profile picture and password
    public function update(Request $request)
    {
        $user = auth()->user();
        
        // Validate request data
        $validateData = $request->validate([
            'old_password' => ['required'],
            'new_password' => ['min:8', 'confirmed'],
            'new_picture' => ['file', 'mimes:jpeg,png,gif', 'max:3072']
        ]);
        
        // Check if old password is correct
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect', 'status' => 0]);
        }
        
        // Update password and picture if provided
        if ($request->has('new_password')) {
            $user->password = bcrypt($request->new_password);
        }
        
        if ($request->hasFile('new_picture')) {
            $path = $request->file('new_picture')->storePublicly('pictures');
            $user->picture = $path;
        }
        
        $user->save();
        
        return response()->json([
            'user' => $user,
            'message' => "User updated successfully",
            'status' => 1
        ]);
    }

    public function updatePicture(Request $request)
    {
        $user = auth()->user();
    
        // Validate request data
        $validateData = $request->validate([
            'new_picture' => ['file', 'mimes:jpeg,png,gif', 'max:3072']
        ]);
    
        // Update picture if provided
        if ($request->hasFile('new_picture')) {
            $path = $request->file('new_picture')->storePublicly('pictures');
            $user->picture = $path;
            $user->save();
        }
    
        return response()->json([
            'user' => $user,
            'message' => "User picture updated successfully",
            'status' => 1
        ]);
    }
    



    
    
    //
}

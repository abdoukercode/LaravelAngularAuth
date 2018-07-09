<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        //return $request->all();
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }
        $this->send($request->email);
        return $this->successResponse();
    }

    public function send($email){
        $token= $this->createToken($email);
       Mail::to($email)->send(new ResetPasswordMail($token,$email));
    }

    public function createToken($email){
        $oldToken =DB::table('password_resets')->where('email', $email)->first();

        if($oldToken){
           return $oldToken->token;
        }
        $token = str_random(60);
        $this->saveToken($token, $email);
    }
public function saveToken($token, $email){
    DB::table('password_resets')->insert([
        'email'=> $email,
        'token'=> $token,
        'created_at'=> Carbon::now()
    ]);
}
    public function validateEmail($email){
        return !!User::where('email', $email)->first(); // !! true or false
    }

    public function failedResponse(){
        return response()->json([
            'error' => 'Email not found on Our database'
        ]);
    }

    public function successResponse(){
        return response()->json([
            'data' => 'Reset email succesfully sent, please check you mailbox'
        ]);
    }
}

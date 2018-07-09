<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;

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
       Mail::to($email)->send(new ResetPasswordMail());
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

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use App\User;

class ChangePasswordController extends Controller
{
    public function resetPassword(ChangePasswordRequest $request) {
      //  return $this->getPasswordResetTableRow($request)->get();
        return $this->getPasswordResetTableRow($request)->count() >0 ? $this->changePassword($request): $this->tokenNotFoundResponse();
    }
    private function getPasswordResetTableRow($request){
        return DB::table('password_resets')->where([
            'email' => $request->email,
             'token' => $request->resetToken]);
    }

    public function tokenNotFoundResponse()
    {
        return response()->json(['error'=>'Token or Email is incorrect'], Response::HTTP_UNPROCESSABLE_ENTITY);

    }

    private function changePassword($request) {

        $user = User::whereEmail($request->email)->first();
        //return $user;

        $this->getPasswordResetTableRow($request)->delete();
        $user->update(['password' => $request->password]);
        return response()->json(['data' => 'Password Succesfully changed'], Response::HTTP_CREATED);
    }
}

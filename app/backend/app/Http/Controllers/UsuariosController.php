<?php

namespace Admin\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Admin\User;
use Admin\Empresa;
use Illuminate\Support\Facades\Hash;
class UsuariosController extends Controller
{

    ///realiza el registro del usuario, valida que no este duplicada la cuenta
    public function register(Request $request){

        ///Campos obligatorios en el registro
        $validator = Validator::make($request->all(),[
            'email' => 'required',
            'password' => 'required',
            'empresa' => 'required',
        ]);
        if (!$validator->fails()) {

            //Busca si ya esta repetido el correo
            $emails = User::where('email','=',$request->email)->get();
            if($emails->count() == 0){
                ///Si no existe agrega el usuario
                ///Encripta la contraseña
                $password = Hash::make($request->password);
                ///Agrega el usaurio
                $user = User::create(array('email'=>$request->email,'password'=>$password));
                ///Agrega la empresa que se mando con el usuario
                Empresa::create(array('idUsuario' => $user->id, 'empresa' => $request->empresa));

            }//Si ya existe mandar error
            else return response()->json(['error'=>'unique_email_restrinccion'],500);

        }
        else{
            return response()->json(['error'=>'input_no_valid'],500);

        }
        //Realiza el login del usuario para regresar el token y generar el proceso de login en el registro
        return $this->login($request);
    }


    ///realiza el inicio de sesion para el usuario
    public function login(Request $request){
        ///Campos obligatorios
        $validator = Validator::make($request->all(),[
            'email' => 'required',
            'password' => 'required'
        ]);
        if (!$validator->fails()) {
            ///Si no fallo la validacion realiza el proceso de autentificacion
            $credentials = $request->only('email', 'password');
            try{
                //genera el token
                $token = JWTAuth::attempt($credentials);
                if(!$token)///Si no genero el token regresa el error de credenciales invalidas
                    return response()->json(['error'=>'invalid_Credentials'], 401);
            }
            catch(JWTException $e){
                return response()->json(['error'=>'could_not_create_token'],500);
            }
        
            ///Regresa el token y el objeto del usuario como resultado
            $response = compact('token');
            $response['user'] = Auth::user();
            return $response;
        }
        else{
            return response()->json(['error'=>'input_no_valid'],500);
        }

    }


    ///Actualiza la contraseña del usuario contenido en el token
    public function cambiarPassword(Request $request){
        ///se toma como campo requerido el password
        $validator = Validator::make($request->all(),[
            'password' => 'required'
        ]);
        if (!$validator->fails()) {
            ///Encuentra el usuario al que se le modificara la contraseña
            $user = User::find($this->getUserId());
            $user->password = Hash::make($request->password);
            $user->save();
            ///devuelve el mensaje de que se actualizo el password
            return response()->json(['response'=>'actualizado'],200);
        }
        else{
            return response()->json(['error'=>'input_no_valid'],500);
        }

    }
    
    ///Actualiza el nombre del usuario
    public function cambiarNombre(Request $request){
        ///Como requerido se toma el nombre, se dejo opcional los apellidos
        $validator = Validator::make($request->all(),[
            'nombre' => 'required'
        ]);
        if (!$validator->fails()) {
            ///Encuentra el suario al que se le modificara la contraseña (extraido del token)
            $user = User::find($this->getUserId());
            $user->nombre = $request->nombre;
            $user->apellidos = $request->apellidos;
            $user->save();

            return response()->json(['response'=>'actualizado'],200);
        }
        else{
            return response()->json(['error'=>'input_no_valid'],500);
        }

    }

    public function refreshToken(Request $request){
        
        $oldToken = JWTAuth::getToken();
        $token = JWTAuth::refresh($oldToken);

        return $token;
    }

    ///Obtiene el id del usuario contenido en el token
    public function getUserId(){
        
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $userId = $user->id;
            return $userId;
        }
    }

    

}

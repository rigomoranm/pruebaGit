<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Admin\Configuracion;

class ConfiguracionController extends Controller
{
    //carga la configuracion por usuario, si no la encuentra devuelve null
    public function get(){
        
        $conf = Configuracion::where('idUsuario','=',$this->getUserId())->get();
        if($conf->count()>0){
            return $conf[0];
        }
        return null;
    }

    ////Guarda la configuracion del usuario, primero la busca y si no la encuentra la agrega
    public function save(Request $request){
        ///Busca la configuracion del usuario
        $confSearch = Configuracion::where('idUsuario','=',$this->getUserId())->get();
        //Si hay algo lo modifica
        if($confSearch->count()>0){

            ///modifica la configuracion
            $conf= $confSearch[0];
            $conf->fill($request->all())->save();
        }
        else{

            $conf = new Configuracion($request->all());
            $conf->idUsuario=$this->getUserId();
            $conf->save();

        }
        return $conf;
    }


    ///Obtiene el id del usuario contenido en el token
    public function getUserId(){
        
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $userId = $user->id;
            return $userId;
        }
    }

}

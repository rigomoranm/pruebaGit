<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Admin\Retenciones;

class RetencionesController extends Controller
{
    ///Obtiene todas las retenciones dados de alta por el usuario
    public function getAll(){

        $ret = Retenciones::where('idUsuario','=',$this->getUserId())->with('TipoRetencion')->orderBy('id','desc')->get();
        return $ret;
    }

    ///Agrega una nueva retencion relacionada al usuario
    public function add(Request $request){

        $ret = new Retenciones($request->all());
        $ret->idUsuario =$this->getUserId();
        $ret->save();
        ///Llena el tipo de rentencion para devolerlo en la peticion
        $ret->tipoRetencion;
        return $ret;
    }

    ///Obtiene la retencion por id
    public function get($id){

        $ret = Retenciones::find($id);
        return $ret;
    }

    ///Edita el id enviado con el contenido del request
    public function edit($id, Request $request){

        $ret = $this->get($id);
        ///Llena el objeto con todo lo que tiene el request
        $ret->fill($request->all())->save();
        return $ret;
    }

    ///Elimina el elemento que corresponde con el id
    public function delete($id){

        $ret = $this->get($id);
        
        //si encontro la retencion la elimina
        if($ret != null) $ret->delete();
        else return response()->json(['error'=>'element_not_found'],500);

        return $ret;
    }

    ///Obtiene el id del usuario contenido en el token
    public function getUserId(){
        
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $userId = $user->id;
            return $userId;
        }
    }
}

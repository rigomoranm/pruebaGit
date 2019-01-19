<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

use Admin\Impuestos;
use Admin\TipoImpuesto;

class ImpuestosController extends Controller
{
    ///Obtiene todos los impuestos dados de alta por el usuario
    public function getAll(){
        ///Incluye la relacion ed TipoImpuesto para devolver ese objeto en la peticion
        $impuestos = Impuestos::where('idUsuario','=',$this->getUserId())->with('TipoImpuesto')->orderBy('id','desc')->get();
        
        return $impuestos;
    }
    ///Agrega un nuevo impuesto  relacionado al usuario
    public function add(Request $request){
        
        $imp = new Impuestos($request->all());
        $imp->idUsuario=$this->getUserId();
        $imp->save();
        ///Carga el tipo de impuesto para devolerlo en la peticion
        $imp->tipoImpuesto;
        return $imp;
    }

    ///Obtiene el impuesto por id
    public function get($id){

        $imp = Impuestos::find($id);
        return $imp;
    }

    ///Edita el id enviado con el contenido del request
    public function edit($id, Request $request){

        $imp = $this->get($id);
        $imp->fill($request->all())->save();
        return $imp;
    }

    ///Elimina el elemento que corresponde con el id
    public function delete($id){

        $imp = $this->get($id);

        ///Si encontro  el impuesto lo elimina
        if($imp != null) $imp->delete();
        else return response()->json(['error'=>'element_not_found'],500);

        return $imp;
    }

    ///Obtiene el id del usuario contenido en el token
    public function getUserId(){
        
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $userId = $user->id;
            return $userId;
        }
    }
}

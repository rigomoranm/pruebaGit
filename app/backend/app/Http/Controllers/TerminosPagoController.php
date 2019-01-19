<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Admin\TerminosPago;

class TerminosPagoController extends Controller
{
    ///Obtiene todos los terminos de pago relacionados al usuario
    public function getAll(){

        $terPago = TerminosPago::where('idUsuario','=',$this->getUserId())->orderBy('id','desc')->get();
        return $terPago;
    }

    ///Agrega un nuevo termino de pago  relacionado al usuario
    public function add(Request $request){

        $terPago = new TerminosPago($request->all());
        $terPago->idUsuario =$this->getUserId();
        $terPago->save();
        return $terPago;
    }

    ///Obtiene el termino de pago por id
    public function get($id){

        $terPago = TerminosPago::find($id);
        return $terPago;
    }

    ///Edita el id enviado con el contenido del request
    public function edit($id, Request $request){

        $terPago = $this->get($id);
            ///Llena el objeto con todo lo que tiene el request
        $terPago->fill($request->all())->save();

        return $terPago;
    }
    
    ///Actualiza el estatus del elemento enviado 
    public function updateStatus($id, Request $request){

        $terPago = $this->get($id);
        $terPago->estado= $request->estado;
        $terPago->save();

        return $terPago;
    }

    ///Elimina el elemento que corresponde con el id
    public function delete($id){

        $terPago = $this->get($id);

        if($terPago != null) $terPago->delete();
        else return response()->json(['error'=>'element_not_found'],500);

        return $terPago;
    }

    ///Obtiene el id del usuario contenido en el token
    public function getUserId(){
        
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $userId = $user->id;
            return $userId;
        }
    }

}

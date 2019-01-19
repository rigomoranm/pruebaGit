<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Admin\TipoImpuesto;

class TipoImpuestoController extends Controller
{
    ///Obtiene los tipos de impuesto del sistema
    public function getAll(){

        $ret = TipoImpuesto::all();
        return $ret;
    }

}

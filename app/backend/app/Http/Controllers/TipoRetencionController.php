<?php

namespace Admin\Http\Controllers;

use Illuminate\Http\Request;
use Admin\TipoRetencion;

class TipoRetencionController extends Controller
{
    ///Obtiene los tipos de retencion del sistema
    public function getAll(){

        $ret = TipoRetencion::all();
        return $ret;
    }
}

<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class TerminosPago extends Model
{
    protected $table = "terminos_pago";
    protected $fillable = array('idUsuario', 'nombre', 'dias', 'estado');

}

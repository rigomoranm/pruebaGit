<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    //
    protected $table = "configuracion";
    protected $fillable = array('idUsuario', 'formatoFecha', 'longMinima', 'numDecimales');

}

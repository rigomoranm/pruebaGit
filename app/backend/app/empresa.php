<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class empresa extends Model
{
     //
     protected $table = "empresas";
     protected $fillable = array('empresa', 'idUsuario');
 
}

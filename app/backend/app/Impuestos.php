<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class Impuestos extends Model
{
    protected $table = "impuestos";
    protected $fillable = array('idUsuario', 'tipoImpuesto_id', 'nombre', 'descripcion');

    public function tipoImpuesto()
    {
        return $this->hasOne('Admin\TipoImpuesto', 'id', 'tipoImpuesto_id');
        // return $this->hasOne('Admin\TipoImpuesto');
    }
}

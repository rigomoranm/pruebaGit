<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class Retenciones extends Model
{
    protected $table = "retenciones";
    protected $fillable = array('idUsuario', 'tipoRetencion_id', 'nombre', 'descripcion');

    public function tipoRetencion()
    {
        return $this->hasOne('Admin\TipoRetencion', 'id', 'tipoRetencion_id');
        // return $this->hasOne('Admin\TipoImpuesto');
    }
}

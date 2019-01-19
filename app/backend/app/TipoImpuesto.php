<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class TipoImpuesto extends Model
{
    protected $table = "tipo_impuesto";
    protected $fillable = array('nombre');


    public function impuestos()
    {
        return $this->hasMany('Admin\Impuestos');
    }
}

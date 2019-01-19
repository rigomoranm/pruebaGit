<?php

namespace Admin;

use Illuminate\Database\Eloquent\Model;

class TipoRetencion extends Model
{
    protected $table = "tipo_retencion";
    protected $fillable = array('nombre');
}

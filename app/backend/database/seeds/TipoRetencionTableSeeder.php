<?php

use Illuminate\Database\Seeder;
use Admin\TipoRetencion;

class TipoRetencionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoRetencion = array(
            ['nombre'=>'Retención' ]  
            ,['nombre'=>'Retención 2' ]  
          );
          foreach($tipoRetencion as $tRetencion){
                TipoRetencion::create($tRetencion);
          }

    }
}

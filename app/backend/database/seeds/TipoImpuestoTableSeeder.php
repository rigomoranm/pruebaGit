<?php

use Illuminate\Database\Seeder;
use Admin\TipoImpuesto;

class TipoImpuestoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoImpuesto = array(
            ['nombre'=>'Iva' ],
            ['nombre'=>'Iva 2']
          );
          foreach($tipoImpuesto as $tImpuesto){
              TipoImpuesto::create($tImpuesto);
          }
    }
}

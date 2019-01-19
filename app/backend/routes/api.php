<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

///Todas las rutas deben de pasar por el middleware jwt.auth, este se encuentra definido en
///App/Http/Middleware/Cors. Se agrego tambien esta configuracion en index.php
Route::middleware(['jwt.auth'])->group(function(){

    Route::get('configuracion', 'ConfiguracionController@get')->name('getConfiguracion');
    Route::post('configuracion', 'ConfiguracionController@save')->name('saveConfiguracion');


    Route::get('retenciones', 'RetencionesController@getAll')->name('getAllRetenciones');
    Route::get('retenciones/{id}', 'RetencionesController@get')->name('getRetenciones');
    Route::post('retenciones', 'RetencionesController@add')->name('addRetenciones');
    Route::put('retenciones/{id}', 'RetencionesController@edit')->name('editRetenciones');
    Route::delete('retenciones/delete/{id}', 'RetencionesController@delete')->name('deleteRetenciones');


    Route::get('impuestos', 'ImpuestosController@getAll')->name('getAllImpuestos');
    Route::get('impuestos/{id}', 'ImpuestosController@get')->name('getImpuestos');
    Route::post('impuestos', 'ImpuestosController@add')->name('addImpuestos');
    Route::put('impuestos/{id}', 'ImpuestosController@edit')->name('editImpuestos');
    Route::delete('impuestos/delete/{id}', 'ImpuestosController@delete')->name('deleteImpuestos');


    
    Route::get('terminosPago', 'TerminosPagoController@getAll')->name('getAllTerminosPago');
    Route::get('terminosPago/{id}', 'TerminosPagoController@get')->name('getTerminosPago');
    Route::post('terminosPago', 'TerminosPagoController@add')->name('addTerminosPago');
    Route::put('terminosPago/{id}', 'TerminosPagoController@edit')->name('editTerminosPago');
    Route::put('terminosPago/status/{id}', 'TerminosPagoController@updateStatus')->name('updateStatusTerminosPago');
    Route::delete('terminosPago/delete/{id}', 'TerminosPagoController@delete')->name('deleteTerminosPago');


    Route::get('tipoImpuesto', 'TipoImpuestoController@getAll')->name('getAllTipoImpuesto');
    Route::get('tipoRetencion', 'TipoRetencionController@getAll')->name('getAllTipoRetencion');

    Route::post('cambiarPass', 'usuariosController@cambiarPassword')->name('cambiarPass');
    Route::post('cambiarNombre', 'usuariosController@cambiarNombre')->name('cambiarNombre');
    Route::post('refreshToken', 'usuariosController@refreshToken')->name('refreshToken');
});


Route::post('usuarios', 'usuariosController@register')->name('register');
Route::post('login', 'usuariosController@login')->name('login');
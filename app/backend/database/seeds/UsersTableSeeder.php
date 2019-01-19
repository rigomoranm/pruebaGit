<?php

use Illuminate\Database\Seeder;
use Admin\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array(
            ['nombre'=>'Rigo', 'email'=>'rigo.moranm@gmail.com','password'=>Hash::make('123456') ]  
          );
          foreach($users as $user){
              User::create($user);
          }
    }
}

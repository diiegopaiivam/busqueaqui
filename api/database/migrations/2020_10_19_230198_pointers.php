<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pointers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pointers', function(Blueprint $table){
            $table->increments('id');
            $table->integer('segment_id')->unsigned();
            $table->string('name');
            $table->string('latitude');
            $table->string('longitude');
            $table->text('about');
            $table->string('contact');

            $table->foreign('segment_id')->references('id')->on('segment_pointers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pointers');
    }
}

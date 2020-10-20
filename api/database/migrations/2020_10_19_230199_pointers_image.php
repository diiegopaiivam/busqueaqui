<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PointersImage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pointers_images', function(Blueprint $table){
            $table->increments('id');
            $table->integer('point_id')->unsigned();
            $table->string('image');
            $table->string('path');

            $table->foreign('point_id')->references('id')->on('pointers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pointers_images');
    }
}

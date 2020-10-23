<?php 


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImagePoint extends Model
{
    protected $table = 'pointers_images';

    protected $fillable = [
        'point_id', 'image', 'path'
    ];

    public function point()
    {
        return $this->hasOne('App\Models\Point', 'point_id');
    }

    public $timestamps = false;
    
}
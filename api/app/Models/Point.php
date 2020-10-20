<?php 


namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Segment;

class Point extends Model
{
    protected $table = 'pointers';

    protected $fillable = [
        'segment_id', 'name', 'latitude', 'longitude', 'about', 'contact'
    ];

    public $timestamps = false;

    public function segment()
    {
        return $this->hasOne('App\Models\Segment');
    }

    public function images()
    {
        return $this->hasMany('App\Models\ImagePoint');
    }

}
<?php 


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Segment extends Model
{
    protected $table = 'segment_pointers';

    protected $fillable = [
        'segment',
    ];

    public function point()
    {
        return $this->hasMany('App/Models/Point');
    }

}
<?php 

namespace App\Services;

use App\Models\Point;
use App\Models\ImagePoint;
use App\Models\Segment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PointService 
{
    private $point;
    private $imagePoint;
    private $segment;

    public function __construct(Point $point, ImagePoint $imagePoint, Segment $segment)
    {
        $this->point = $point;
        $this->imagePoint = $imagePoint;
        $this->segment = $segment;

    }

    public function getPoint(int $id)
    {
        $pointers = DB::table('pointers')
        ->join('pointers_images', 'pointers.id', '=', 'pointers_images.point_id')
        ->select('pointers.*', 'pointers_images.path')
        ->where('pointers.id', '=', $id)
        ->get();
        
        
        return $pointers;
    }

    public function savePointers(array $data)
    {
        if(!$data){
            return;
        }

        $point = $this->point->create([
            'segment_id' => $data['segment_id'],
            'name'      =>  $data['name'],
            'latitude'  =>  $data['latitude'],
            'longitude' =>  $data['longitude'],
            'about'     =>  $data['about'],
            'contact'   =>  $data['contact']
        ]);


        return $point;

    }

    public function uploadImage(Request $request, int $pointID)
    {
        $response = null;
        $pointer = (object) ['image' => ""];

        
        if ($request->hasFile('image')) {
            $original_filename = $request->file('image')->getClientOriginalName();
            $original_filename_arr = explode('.', $original_filename);
            $file_ext = end($original_filename_arr);
            $destination_path = './../public/upload/pointers/';
            $image = 'U-' . time() . '.' . $file_ext;

            if ($request->file('image')->move($destination_path, $image)) {
                $pointer->image = '/upload/pointers/' . $image;
                $saveImage = $this->imagePoint->create([
                    'point_id'  => $pointID,
                    'image'     => $image,
                    'path'      => $pointer->image
                ]);
            } 
        } 

    }

    public function getPointers(int $id)
    {
        $pointers = DB::table('pointers')
        ->join('pointers_images', 'pointers.id', '=', 'pointers_images.point_id')
        ->select('pointers.*', 'pointers_images.path')
        ->where('pointers.segment_id', '=', $id)
        ->get();
        
        
        return $pointers;
    }

    public function segmentForPointers()
    {
        $segments = $this->segment->all();
     

        return $segments;
    }
}
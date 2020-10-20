<?php 

namespace App\Services;

use App\Models\Point;
use App\Models\ImagePoint;
use Illuminate\Http\Request;

class PointService 
{
    private $point;

    public function __construct(Point $point)
    {
        $this->point = $point;
        $this->imagePoint = ImagePoint::all();

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
            $destination_path = './../upload/pointers/';
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
        $array = [];
        $pointers = $this->point->find($id);
        $imagePointers = $this->imagePoint->find($pointers['id']);
        
        echo "<pre>";print_r($imagePointers);die;
        $array = array_push($pointers, $imagePointers);
        return $array;
    }
}
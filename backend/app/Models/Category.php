<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'image'];

    protected $appends = ['image_url'];

public function getImageUrlAttribute()
{
    return $this->image ? asset('storage/' . $this->image) : null;
}


}

<?php

namespace App\Controllers;

class IndexController extends Controller
{
    public function actionIndex()
    {
        return $this->getView([]);
    }
}
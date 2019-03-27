<?php

namespace App\Controllers;

class Index extends Controller
{
    protected const TEMPLATE_NAME = 'index.twig';

    public function __invoke()
    {
        echo $this->render([]);
    }
}
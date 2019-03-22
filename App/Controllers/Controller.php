<?php

namespace App\Controllers;

use App\Engine\Templater;

abstract class Controller
{
    protected const TEMPLATE_NAME = '';
    protected $twig;

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        $this->twig = Templater::getInstance()->twig;
    }

    /**
     * Return view from template
     * @param $data array parameters for template
     * @return mixed
     */
    protected function render($data)
    {
        $indexTemplate = $this->twig->load(static::TEMPLATE_NAME);
        return $indexTemplate->render($data);
    }


}
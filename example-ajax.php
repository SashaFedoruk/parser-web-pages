<?php
    $pages = [
        "https://vk.com/",
        "https://www.google.com/",
        "https://developer.chrome.com/extensions/tabs#method-sendRequest"
    ];
    $data = isset($_POST['data']) ? $_POST['data'] : null;
    $url = isset($_POST['url']) ? $_POST['url'] : null;

    
    $key = 0;
    if(!in_array($url, $pages) && count($pages) > 0){
        echo $pages[$key];
    } elseif(count($pages) > 0){
        $key = array_search($url, $pages);
        if($key + 1 < count($pages)){
            $key++;
            echo $pages[$key];
        } else {
            echo "done";
        }
    } else {
        echo "done";
    }
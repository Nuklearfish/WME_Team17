<!DOCTYPE html>

<html>


<head>
    <title>WME Course Exercise XML and PHP</title>
    <meta charset="UTF-8">
    <meta name="description" content="WME Aufgabe 2 WS 17/18">
    <meta name="keywords" content="PHP">
    <meta name="author" content="Robert Glöckner">
    <meta name="author" content="Sophia Urban">
    <meta name="keywords" content="WME, World Data, Assingment" />    
    
     <!--Fonts-->
    <link rel="stylesheet" href="ressourcen/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/Team17/ressourcen/fonts/Roboto/Roboto-Light.ttf">
    
    <!--CSS-Dateien-->
    <link rel="stylesheet" type="text/css" href="/Team17/ressourcen/style/css_reset.css">
    <link rel="stylesheet" type="text/css" href="/Team17/ressourcen/style/Aufgabe1.css">
    
    <title>Aufgabe 2 - Parse</title>
    
</head>
   
 <body>
    <header>
    <nav id="Menueleiste">
        <a id="logo" href="" title="Home"></a>
        <ul id="Menue">
            <a class="menuelink" href=""><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A1 - Table</li></a>
            <a class="menuelink" href="/Team17/php/parse.php"><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A2 - Parse</li></a>
            <a class="menuelink" href="/Team17/php/save.php"><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A2 - Save</li></a>
            <a class="menuelink" href="/Team17/php/print.php"><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A2 - Print</li></a>
            <a class="menuelink" href=""><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A3 - REST</li></a>
            <a class="menuelink" href=""><li class="menueelem"><i class="fa fa-list-ul" aria-hidden="true"></i> A4 - Vis</li></a>
        </ul>
    </nav>
    </header>
     
    <header>
        <h1 class="ueberschrift">World Data Overview...</h1>
    </header>
     
    <div class="table_container">
        <div class="tabnav">
            Show/Hide:
            <button title="Tabelle" class="button_nav" id="toggle_colum3">birth rate</button>    |
            <button title="Tabelle" class="button_nav" id="toggle_colum4">cellphones</button>    |
            <button title="Tabelle" class="button_nav" id="toggle_colum5">children / woman</button>   |
            <button title="Tabelle" class="button_nav" id="toggle_colum6">electric usage</button>     |
            <button title="Tabelle" class="button_nav" id="toggle_colum7">internet usage</button>

        </div>
        
     <?php
        $parser = new WorldDataParser();
        $parsedCSV = $parser->parseCSV("world_data_v1.csv");

        echo print_r($parsedCSV);
     ?>
        
   </div>

<!--Fußzeile-->
<footer id="footer">
    <div class="footer_left">
        Copyright .. 2015 world_data
        <br>
        Second course exercise XML and PHP of the lecture Web and Multimedia Engineering.
    </div>
    
    <div class="footer_right">
        This solution has been provided by:
        <br>
        Sophia Urban (s2445505) and Robert Glöckner (s8978124)- Team 17
    </div>
</footer>

</body>
</html>
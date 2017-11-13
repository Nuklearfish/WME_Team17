<!DOCTYPE html>
<?php
        include("world_data_parser.php");
?>

<html>
<head>
         <meta charset="UTF-8">
         <meta name="description" content="Aufgabe 2">
         <meta name="keywords" content="PHP">
         <meta name="author" content="Sophia Urban">
         <meta name="author" content="Robert Glöckner">

         <title>Aufgabe 2 - Parse</title>
</head>
<body>

        <pre>
<?php
        $parser = new WorldDataParser();
        $parsedCSV = $parser->parseCSV(WORLD_DATA_PATH);

        echo var_dump($parsedCSV);
?>
        </pre>

</body>
</html>       
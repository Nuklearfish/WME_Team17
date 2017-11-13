<?php

class WorldDataParser{
    
    //gibt Array mit geparster csv-Datei zurück
    function parseCSV("world_data_v1.csv"){
        
        $handle = fopen("world_data_v1.csv", "r");
        
        //array fgetcsv(resource $handle, integer $length, string $delimiter)
        
        
        $row = 1;
        if ($handle !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $num = count($data);
                echo "<p> $num Felder in Zeile $row: <br /></p>\n";
                $row++;
                for ($c=0; $c < $num; $c++) {
                    echo $data[$c] . "<br />\n";
                }
            }
            fclose($handle);
        }
    }
    
    
    //Speichert Datei als XML, gibt XML Datei aus
    function saveXML($data){
        
    }
    //Transformier XML zu HTML
    function printXML($xml_path, $xsl_path){
    
    
}
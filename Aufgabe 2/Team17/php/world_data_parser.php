<?php

class WorldDataParser{
    
    //gibt Array mit geparster csv-Datei zurück 
    function parseCSV($path){
         
        //array fgetcsv(resource $handle, integer $length, string $delimiter)
        $out = Array();
		$rowcount = 0;
		$handle = fopen($path, "r"); 
		$header = fgetcsv($handle);
		$header_colcount = count($rowcount);
		
		while (($row = fgetcsv($handle)) !== FALSE) {
			$row_colcount = count($row);
			$entry = array_combine($header, $row);
			$out[] = $entry;
			$rowcount++;
		}
			
		fclose($handle);	
		return $out;
    }
    
    //Spreichert CSV-Datei als XML
    function saveXML($data){
		$raw_xml = $this->createRawXML($data);
		$xml = $this->formatXML($raw_xml->asXML());		
		return file_put_contents("world_data_v1.csv", $xml) == FALSE ? FALSE : TRUE;
	}
    
}
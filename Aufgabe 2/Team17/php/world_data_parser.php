<?php

class WorldDataParser{
    
    //gibt Array mit geparster csv-Datei zurück 
    function parseCSV($path){
         
        $out = Array();
		$rowcount = 0;
		$handle = fopen($path, "r"); 
		$header = fgetcsv($handle);
		$header_colcount = count($header);
		
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
		return file_put_contents("world_data_v1.xml", $xml) == FALSE ? FALSE : TRUE;
	}
	
    function createRawXML($data){
        $root = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?><Countries></Countries>');
		
        foreach($data as $row){
            $tmp_country = $root->addChild("Country");
		
            foreach($row as $key => $value){
                $keyname = $this->getKeyName($key);
                $tmp_value = $this->trimAll($value);
                $tmp_country->addChild($keyname , $tmp_value);
            }		
        }		
		return $root;	
	}
	
    function formatXML($data){
		$dom = new DOMDocument('1.0');
		$dom->preserveWhiteSpace = false;
		$dom->formatOutput = true;
		$dom->loadXML($data);
		return $dom->saveXML();
	}
	
    function getKeyName($name){
		$tmp = $this->trimAll($name);
		
		//strtok should return a array but accessing the 
		//first value with $split[0] will return the first letter?
		$split = strtok($tmp, " ");
		return $split;
		}
		
    function trimAll($value){
		$tmp = ltrim($value, " ");
		$tmp = rtrim($tmp, " ");
		return $tmp;			
	}
    
}
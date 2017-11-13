
/*
Nutzt shakersort.
https://de.wikipedia.org/wiki/Shakersort

@param{table_id} ID der Tab. die sortiertwerden soll
@param{type} 0 für aufsteigend, 1 für absteigend
*/
function sort(table_id, col_nbr, type){
         var tbl = document.getElementById(table_id);
         var tbod = tbl.getElementsByTagName("tbody")[0];
         var rows = tbod.getElementsByTagName("tr");
         shakersort(rows, col_nbr, type);
}

/*
eine siple impementation von shakersort

@param{rows} Tabellenspalten die sortiert werden sollen
@param{col_nbr} Spalte an der sortiert wird
@param{type} 0 für aufsteigend, 1 für absteigend
*/
function shakersort(rows, col_nbr, type){
         var end = rows.length - 2;
         var swapped = true;

         while(swapped){
                 swapped = false;
                 for(var i = 0; i < end + 1; i++){
                         var cmp = compare_row(rows[i], rows[i + 1], col_nbr);
                         if(cmp < 0 && type === 0){
                                 swap(rows[i], rows[i + 1]);
                                 swapped = true;
                         }
                         if(cmp > 0 && type === 1){
                                 swap(rows[i], rows[i + 1]);
                                 swapped = true;
                         }
                 }
                 if(!swapped){
                         break;
                 }
                 swapped = false;
                 for(var i = end;  i > -1; i--){
                         var cmp = compare_row(rows[i], rows[i + 1], col_nbr);
                         if(cmp < 0 && type === 0){
                                swap(rows[i], rows[i + 1]);
                                swapped = true;
                         }
                         if(cmp > 0 && type === 1){
                                swap(rows[i], rows[i + 1]);
                                swapped = true;
                         }
                 }
         }
}

/*
Tauscht tabellenspalten 
*/
function swap(row1, row2){
         row2.parentNode.insertBefore(row1, row2.nextSibling);
}

/*
Vergleich von zwei spalten
-1 wenn zeile 1 vor zeile 2 gehört
@param{col_nbr} die Spalte die verglichen werden soll
*/
function compare_row(row1, row2, col_nbr){
         var val1 = row1.cells[col_nbr].firstChild.nodeValue;
         var val2 = row2.cells[col_nbr].firstChild.nodeValue;
         return val1.localeCompare(val2);
}